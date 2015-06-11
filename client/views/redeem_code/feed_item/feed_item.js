/*****************************************************************************/
/* FeedItem: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.feedItem.events({
  "click .claim-button": function(event) {
    var code = $(event.target).closest("div").prop("id");
    var setObject = {"claimedBy": Meteor.userId(),
                     "dateClaimed": (new Date()).valueOf()
                    };
    
    Meteor.call("updateCodeRedemption", code, setObject);
  },
  "click .redeem-button": function(event) {
    var code = $(event.target).closest("div").prop("id");
    var setObject = {"redeemedBy": Meteor.userId(),
                     "dateRedeemed": (new Date()).valueOf()
                    };
    
    Meteor.call("updateCodeRedemption", code, setObject);
  }
});

Template.feedItem.helpers({
  "isButtonDisabled": function() {
    return (Session.get("current_date") > (this.dateClaimed + codeValidAfterClaimTimeMillis)) ? "disabled": "";
  },
  "getAdvertImage": function() {
    
    var createdBy = this.createdBy;
    var messageId = this.messageId;
    var image;
    
    var mySubscribe = Meteor.subscribe("getOneAdvertisingMessage", createdBy);

      
    
    
    if (mySubscribe.ready()) {
      //alert("hey");
      
      var messages = AdvertisingMessages.findOne({"_id": createdBy}).messages;
      
      for (var index = 0; index < 10000/*messages.length*/; ++index) {
        
        //console.log(messages[index].id + " and " + parseInt(messageId));
        if (messages[index].id === parseInt(messageId)) {
          image = messages[index].advertImage;
          break;
        }
      }
      
      return image;
    } else {
      return "";
    }
    

  },
  "redeemTimeRemaining": function() {
    
    var currentDate = Session.get("current_date");
    var difference = (codeValidAfterClaimTimeMillis - (currentDate - this.dateClaimed));
    
    if (difference < 0) {
      var timeRemainingPara = $("#" + this._id).find(".time-remaining");
      timeRemainingPara.addClass("time-remaining-expired");
      
      return "EXPIRED AT " + (new Date(this.dateClaimed + 60*1000)).toUTCString();
      
    } else {
      var dateDifference = new Date(difference);
      return (dateDifference.getUTCHours() + "h : " + dateDifference.getUTCMinutes() + "m : " +  dateDifference.getUTCSeconds() + "s");
    }
  }
});

/*****************************************************************************/
/* FeedItem: Lifecycle Hooks */
/*****************************************************************************/
Template.feedItem.created = function () {
};

Template.feedItem.rendered = function () {
};

Template.feedItem.destroyed = function () {
};