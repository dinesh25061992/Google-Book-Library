({
    doInit: function(component, event, helper) {        
        component.find("newReadListCreator").getNewRecord(
            "Reading_List__c", 
            null,      
            false,    
            $A.getCallback(function() {
                var rec = component.get("v.newReadList");
                var error = component.get("v.listError");
                if(error || (rec === null)) {
                    console.log("Error initializing record template: " + error);
                }
                else {
                    console.log("Record template initialized: " + rec.sobjectType);
                }
            })
        );
    },
    handleSave : function(component, event, helper) {
        component.find("newReadListCreator").saveRecord(function(saveResult) {
            console.log(saveResult);
            if (saveResult.state === "SUCCESS" || saveResult.state === "DRAFT") {
                var readingLists = component.get("v.readingLists"),
                    newlyaddedList = component.get("v.simpleList");
                    
                readingLists.push({
                    Id : newlyaddedList.Id,
                    Name : newlyaddedList.Name,
                    User__c : newlyaddedList.User__c
                });
                component.set("v.readingLists", readingLists);
                component.set("v.selectedValue", newlyaddedList.Id);
                // record is saved successfully
                var resultsToast = $A.get("e.force:showToast");
                resultsToast.setParams({
                    "title": "Saved",
                    "message": "New Read List Created"
                });
                resultsToast.fire();
                helper.createBook(component, event, newlyaddedList.Id);
                helper.closeModel(component);
                
            } else if (saveResult.state === "INCOMPLETE") {
                // handle the incomplete state
                console.log("User is offline, device doesn't support drafts.");
            } else if (saveResult.state === "ERROR") {
                // handle the error state
                console.log('Problem saving contact, error: ' + 
                            JSON.stringify(saveResult.error));
            } else {
                console.log('Unknown problem, state: ' + saveResult.state +
                            ', error: ' + JSON.stringify(saveResult.error));
            }
        });        
    },
    closeModel : function(component, event, helper) {
        helper.closeModel(component);
        
    },
    
})