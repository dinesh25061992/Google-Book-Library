public class googleBookLibrary {
    @AuraEnabled
    public static Map<String, Object> getGoogleBooks(String searchKey, String searchRoot){
        
        String endPoint= 'https://www.googleapis.com/books/v1/volumes/?q=';
        if(searchRoot == 'Name')
            endPoint +='intitle:'+searchKey;
        if(searchRoot == 'Author')
            endPoint +='inauthor:'+searchKey;
        if(searchRoot == 'ISBN')
            endPoint +='isbn:'+searchKey;
        system.debug(endPoint);
        Map<String, Object> results = new Map<String, Object>();
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint(endPoint);
        request.setMethod('GET');
        HttpResponse response = http.send(request);        
        if (response.getStatusCode() == 200) { 
            system.debug(response.getBody());
            results = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());            
            system.debug(results);
            //system.debug(results.get('volumeInfo'));           
        }
        return results;
    }
    
    @AuraEnabled
    public static List<Reading_List__c> getReadingLists (){
        List<Reading_List__c> readingLists = new List<Reading_List__c>();
        
        for(Reading_List__c readList : [SELECT id, Name, User__c FROM Reading_List__c WHERE User__c = :userInfo.getUserId()]){
            readingLists.add(readList);
        }
        
        return readingLists;
    }
    
    @AuraEnabled
    public static void addBooksToReadingList(String selectedBooks, String readingList){
        system.debug(readingList);
        try{
            List<Book__c> booksToUpsert = new List<Book__c>();                      
            List<BookDetail> selectedBookdetails = (List<BookDetail>)JSON.deserialize(selectedBooks, List<BookDetail>.class);            
            for(BookDetail selbook : selectedBookdetails){
                Book__c book = new Book__c();
                book.Title__c = selbook.title;
                book.Name = selbook.title;
                book.ISBN__c = selbook.isbn;
                book.Author__c = selbook.author;
                book.Ratings__c = selbook.ratings != null ? double.valueOf(selbook.ratings) : 0;
                book.CoverImage__c = selbook.coverImage;
                book.Description__c = selbook.description;
                booksToUpsert.add(book);
            }
            if(!booksToUpsert.isEmpty()){
                Database.UpsertResult[] upsertResult = Database.upsert(booksToUpsert, false);
                List<Association__c> associations = new List<Association__c>();
                for(Database.UpsertResult ur : upsertResult){
                    if(ur.isSuccess()){
                        Association__c ass = new Association__c();
                        ass.Book__c = ur.getId();
                        ass.Reading_List__c = readingList;
                        associations.add(ass);
                    }
                }
                if(!associations.isEmpty())
                    Insert associations;
            }
            
        }
        catch(Exception ex){
            
        }
    }
    
    //Wrapper Class
    public class BookDetail {    
        Public String title;
        Public String isbn;
        Public String author;
        Public String coverImage;
        Public String description;   
        Public String ratings;  
    }
    
}