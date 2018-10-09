({
	closeModel : function(component) {
		component.set("v.isOpenNewListModel", false);
	},
    createBook : function (component, event, readListId) {
        var createEvent = component.getEvent("addBookandList");
        createEvent.setParams({"readListId":readListId});
        createEvent.fire();
    }
})