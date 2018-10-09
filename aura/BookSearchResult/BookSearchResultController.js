({
    doInit : function(component, event, helper) {
        component.set('v.columns', [
            {label: 'Title', fieldName: 'title', type: 'text'},
            {label: 'ISBN', fieldName: 'isbn', type: 'text'},
            {label: 'Author', fieldName: 'author', type: 'text'},
            {label: 'Description', fieldName: 'description', type: 'text'},
            {label: 'Ratings', fieldName: 'ratings', type: 'text'},
            {label: 'Cover Image', fieldName: 'coverImage', type: 'url'}           
        ]);
    },
     rowSelected: function (component, event) {
        var selectedRows = event.getParam('selectedRows');
         if(selectedRows.length>0)
             component.set("v.toggleButton", "false");
         else
             component.set("v.toggleButton", "true");
         
        component.set('v.selectedBooks', selectedRows);
    },
    onBookSearch:function(component, event, helper){
        console.log("event fired");
       /// var searchCmp = component.find("BoatSelect");        
        component.set("v.searchedBooks", event.getParam("books"));
		component.set("v.data", event.getParam("books"));
        console.log("event fired");
        console.log(component.get("v.searchedBooks"));
    }
    
})