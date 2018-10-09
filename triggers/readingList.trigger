trigger readingList on Reading_List__c (before insert) {

   for(Reading_List__c readList : Trigger.New){
      if(readList.User__c == null)
         readList.User__c = userinfo.getuserid();
   }

}