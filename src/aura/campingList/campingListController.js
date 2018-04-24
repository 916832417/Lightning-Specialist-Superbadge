({
     // Load items from Salesforce
doInit: function(component, event, helper) 
{
    // Create the action
    var action = component.get("c.getItems");

    // Add callback behavior for when response is received
    action.setCallback(this, function(response) 
                       {
                           var state = response.getState();
                           if (component.isValid() && state === "SUCCESS") 
                           {
                               component.set("v.items", response.getReturnValue());
                           }
                           else
                           {
                               console.log("Failed with state: " + state);
                           }
                       });

    // Send action off to be executed

    $A.enqueueAction(action);

},

handleAddItem : function(component, event, helper) {
    console.log("entrou no create list");
    var itemToSave = event.getParam("item")
    var action = component.get("c.saveItem");

    console.log("erro no controller LIST");
    action.setParams({
        "newSaveItem": itemToSave
    });
    console.log("erro no controller LIST2");
    action.setCallback(this, function(response)
                       {
                           var state = response.getState();
                           console.log("entrou no callback list");

                           if (component.isValid() && state === "SUCCESS") {
                               console.log("ok list");
                               var items = component.get("v.items");
                               items.push(response.getReturnValue());
                               component.set("v.items", items);
                               console.log("ok list2");
                           } 
                       });
    console.log("antes da enqueue list");
    $A.enqueueAction(action);
    console.log("dps enqueue list");
}

})