({
    doInit : function(component, event, helper) {
        helper.fetchReadingList(component);
    },
	closeModel : function(component, event, helper) {
		component.set("v.isOpen", false);
	},
    createNewReadingList :  function(component, event, helper) {
		/* var createRecord = $A.get('e.force:createRecord');
        if(createRecord){           
            
            createRecord.setParams({
                'entityApiName': 'Reading_List__c',
                'defaultFieldValues': {
                    'Name' : ''                   
                }
            });
            createRecord.fire();
        }
        else{
            alert("Cannot create record for Standalone app.");           
        }*/
        component.set("v.isOpenNewListModel", true);
        
	},
    addToReadingList : function(component, event, helper) {	
        if(event && event.getParam("readListId")){
            component.set("v.selectedReadingList", event.getParam("readListId"));
        }
        console.log(component.get("v.selectedBooks"));
        helper.addBooksToReadingList(component, event);
	},
})