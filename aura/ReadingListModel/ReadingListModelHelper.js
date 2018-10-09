({
	fetchReadingList : function(component) {
		var action = component.get("c.getReadingLists");
        if(action) {
            action.setParams({
                
            });
            action.setCallback(this, function(response){
                 var state = response.getState();                
                if (state === "SUCCESS") {                   
                    component.set("v.readingLists", response.getReturnValue());                                       
                }
            });
            $A.enqueueAction(action);
        }
	},
    addBooksToReadingList : function(component) {
        var action = component.get("c.addBooksToReadingList");
        if(action) {
            action.setParams({
                selectedBooks : JSON.stringify(component.get("v.selectedBooks")),
                readingList : component.get("v.selectedReadingList")
            });
            action.setCallback(this, function(response){
                 var state = response.getState();                
                if (state === "SUCCESS") { 
                    component.set("v.isOpen", false);
                    console.log("book server hitted successfully");
                }
            });
            $A.enqueueAction(action);
        }        
    }
})