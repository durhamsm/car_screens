/*****************************************************************************/
/* AdvertisingStatistics: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.advertisingStatistics.helpers({
  "numFinds": function() {
    if (typeof this.foundBy === "object") {
      return this.foundBy.length
    } else {
      return 1;
    }
  },
  "getCodeStatus": function() {
    var currentDate = Session.get("current_date");
    //alert((this.dateClaimed);
    
    if ((this.dateClaimed + codeValidAfterClaimTimeMillis) < currentDate && !this.redeemedBy) {
      return "code-status-expired";
    } else if (this.redeemedBy) {
      return "code-status-redeemed";
    } else if (this.dateClaimed) {
      return "code-status-claimed";
    } else {
      return "code-status-generated";
    }
  },
  /*
  "generatedCodes": function() {
    return CodeRedemption.find({'createdBy': Meteor.userId()});
  },
  */
  "getUserSelectedStates": function() {
    var selectedStates = SelectedStates.findOne().selectedStates;
    
    if (selectedStates) {
      return selectedStates;
    } else {
      return [];
    }
     
  },
  "getUserMessages": function() {
    var messages = AdvertisingMessages.findOne().messages;
    return messages;
  },
  "getFormattedDate": function(dateMillis)  {
    return (new Date(dateMillis)).toUTCString();
  }
  
});

Template.advertisingStatistics.events({
  "click #generate-code-button": function(event) {
    
    var state = $(event.target).closest("form").find(".state-dropdown").find(":selected").text();
    var messageSelect = $(event.target).closest("form").find(".message-dropdown");
    var textOption = messageSelect.find(":selected");
    
    var text = textOption.text();
    var code = makeid();
    
    event.preventDefault();
    var insertObject = {
                            'createdBy': Meteor.userId(),
                            '_id': code,
                            'messageId': textOption.data("id"),
                            'dateGenerated': (new Date()).valueOf(),
                            'state': state,
                            'text': text,
                            'dealType': textOption.data("dealtype"),
                            'percentDiscount': textOption.data("percentdiscount")
                       };
    
    //CodeRedemption._collection.insert(insertObject);
    Meteor.call("insertNewCode", insertObject);
    
  }
});
    


/*****************************************************************************/
/* AdvertisingStatistics: Lifecycle Hooks */
/*****************************************************************************/
Template.advertisingStatistics.created = function () {
};

Template.advertisingStatistics.rendered = function () {
};

Template.advertisingStatistics.destroyed = function () {
};