/*****************************************************************************/
/* Map: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.map.events({
  /*
   * Example:
   *  'click .selector': function (e, tmpl) {
   *
   *  }
   */
});

Template.map.helpers({
  /*
   * Example:
   *  items: function () {
   *    return Items.find();
   *  }
   */
});

/*****************************************************************************/
/* Map: Lifecycle Hooks */
/*****************************************************************************/
Template.map.created = function () {
};

Template.map.rendered = function () {
  //renderMap();
};

Template.map.destroyed = function () {
};


renderMap = function() {
  //var currentUser = Meteor.userId();

      $('img').mapster({
        areas: getSelectedAreasObject(),//[{key: 'TX', selected: true}],
        mapKey: 'state',
        isSelectable: (Meteor.userId() ? true: false),
        onClick: function (data) {

          if (!Meteor.userId()) {
            alert("Login to Select States!!");
            return;
          }
          
          var selectedStates = getSelectedStates();
          var foundIndex = selectedStates.indexOf(data.key);

          if (foundIndex > -1) {
            selectedStates.splice(foundIndex, 1);
          } else {
            selectedStates.push(data.key);
          }
          
          Session.set("selected_states", selectedStates);
          
          //Meteor.call('updateUserStates', Meteor.userId(), selectedStates);

        }
      });
    }
    
getSelectedAreasObject = function() {
  var selectedStates = getSelectedStates();
   
  var myAreasArray = [];
  for (var i = 0; i !== selectedStates.length; ++i) {
    myAreasArray.push({
      key: selectedStates[i],
      selected: true
    });
  }
      
  return myAreasArray;
      
}
    
getSelectedStates = function() {
  var selectedStates;
  
  return Session.get("selected_states");
  
  /*
  if (SelectedStates.find({"_id": Meteor.userId()}).fetch().length) {
    selectedStates = SelectedStates.find({"_id": Meteor.userId()}).fetch()[0].selectedStates;
  } else {
    selectedStates = [];
  }
      
  return selectedStates;
  */
}
    
//window.addEventListener("load", function() {setTimeout(renderMap, 7000);}, false);

