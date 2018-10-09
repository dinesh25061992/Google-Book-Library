({
    onSearch : function(component, event, helper) {
        var action = component.get("c.getGoogleBooks");
        if(action){
            action.setParams({
                searchKey : component.find("searchinput").get("v.value"),
                searchRoot : component.get("v.searchRootvalue")
            })
            action.setCallback(this, function(response) {
                var state = response.getState();  
                // console.log(response.getReturnValue()); 
                if (state === "SUCCESS") {                                       
                    // console.log(response.getReturnValue());  
                    helper.getData(component, event, response.getReturnValue().items);
                    helper.passResult(component, event);
                }
                else if (state === "INCOMPLETE") {
                    
                }
                    else if (state === "ERROR") {
                        
                    }
            });
            $A.enqueueAction(action);
        }
        else{
            alert("No Such action Found");
        }
        
    },
    passResult:function(component, event) {
        //var searchevent = component.getEvent("searchBookEvent");
        var searchevent = $A.get("e.c:searchBookEvent");
        searchevent.setParams({
            books : component.get("v.books")
        });
        console.log("hitter");
        //console.log(component.get("v.books"));
        searchevent.fire();
    },
    getData:function(component, event, retrievedData) {
        var data = [];
        if(component.find("searchinput").get("v.value") && retrievedData)
        {            
            for(var i=0; i< retrievedData.length;i++){
                var volumeInfo = retrievedData[i].volumeInfo;
                if(volumeInfo){
                var isbn = volumeInfo.industryIdentifiers ? volumeInfo.industryIdentifiers[0].identifier : '';
                var author = volumeInfo.authors ? volumeInfo.authors[0] : '';
                var imageLink = volumeInfo.imageLinks ? volumeInfo.imageLinks.smallThumbnail : '';
                var item = {                    
                    title:volumeInfo.title,                   
                    description:volumeInfo.description,
                    ratings:volumeInfo.averageRating,
                    coverImage:volumeInfo.imageLinks.smallThumbnail,
                    isbn:isbn,
                    author:author
                }
                data.push(item);
                }
            }            
            console.log(data);             
        }
        component.set("v.books", data);  
    }
})