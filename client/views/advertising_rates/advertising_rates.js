/*****************************************************************************/
/* AdvertisingRatesTemplate: Event Handlers and Helpersss .js*/
/*****************************************************************************/
/*
SelectedStates = new Mongo.Collection('selectedStates');
AdvertisingMessages = new Mongo.Collection('advertisingMessages');
CodeRedemption = new Mongo.Collection('codeRedemption');
CodeReviews = new Mongo.Collection('codeReviews');
Errors = new Mongo.Collection(null);
Notifications = new Mongo.Collection("notifications");
*/

Template.advertisingRates.onRendered(function() {
  renderMap();
});

Template.advertisingRates.events({
  "beforeunload": function(event) {
    
  },
  "change .state-checkbox": function(event) {
    var selectedStates = Session.get("selected_states");
    
    if ($(event.target).is(":checked")) {
      selectedStates.push($(event.target).attr("id"));
    } else {
      var index = selectedStates.indexOf($(event.target).attr("id"));
      selectedStates = selectedStates.splice(index, 1);
    }
    
    Session.set("selected_states", selectedStates);
    renderMap();
    
  },
  "click #save-states": function(event) {
    
    Meteor.call('updateUserStates', Meteor.userId(), Session.get("selected_states"));
    
  },
  "change #toggle-select-all": function(event) {
    var selectedStates = [];
    
    if ($(event.target).is(":checked")) {
      for (var abrev in stateAbreviations) {
        selectedStates.push(abrev);
      }
    }
    
    Session.set("selected_states", selectedStates);
    renderMap();
    
  },
  "click .subscribePlanButton": function(event) {
    if (!$(event.target).hasClass('selected-button')) {
      $('.selected-button').removeClass('selected-button');
      $(event.target).addClass('selected-button');
    }
  },
  //"load": function() {setTimeout(renderMap, 2000);}
});

Template.advertisingRates.helpers({
  "isChecked": function(abrev) {
    return (Session.get("selected_states").indexOf(abrev) > -1) ? "checked": "";
  },
  "getItArray": function() {
    return [0, 1, 2, 3, 4];
  },
  "getStateArray": function(index) {
    return stateAbrevArray.slice(index*10, index*10 + 10);
  },
  "isDivider": function(state) {
    var dividers = ["GA", "ME", "NE", "OR"];
    
    //return dividers.indexOf(state) > -1;
    if (dividers.indexOf(state) > -1) {
      return "</div><div class='col-lg-2'>";
    } else {
      return "";
    }
    
  },
  "isEnd": function(state) {
    if (state === "WY") {
      return "</div>";
    } else {
      return "";
    }
  },
  "isEnd": function() {
    
  },
  "getListOfStates": function() {
    return stateAbrevArray;
  },
  "getButtonPriceText": function(numMonths) {
    var selectedStates = Session.get("selected_states");
    
    if (selectedStates.length) {
      return numMonths + (numMonths > 1 ? ' months': ' month') + "\n$" + pricingAlgorithm(selectedStates, numMonths).toFixed(2) + " / month";
    } else {
      return "select states...";
    }   
    
  }
});

/*****************************************************************************/
/* AdvertisingRatesTemplate: Lifecycle Hooks */
/*****************************************************************************/
Template.advertisingRates.created = function () {
};

Template.advertisingRates.rendered = function () {
};

Template.advertisingRates.onDestroyed = function () {
};