/*****************************************************************************/
/* RedeemCode: Event Handlers and Helpersss .js*/
/*****************************************************************************/
//timeDep = new Deps.Dependency();
//currentTime = new Date();

codeValidAfterClaimTimeMillis = 48*60*60*1000;

/*
function NewNotificationObject() {
  this.read = false;
  return this;
}
*/



function checkForCode(code) {
  
  var codeFound = CodeRedemption.findOne({"_id": code});
    
    if (codeFound && !(codeFound.claimedBy)) {
      
      var foundByArray = CodeRedemption.findOne({"_id": code}).foundBy;
      
      foundByArray = foundByArray ? foundByArray: [];
      
      if (foundByArray.indexOf(Meteor.userId()) === -1) {
        //var notificationObject = _.extend(NewNotificationObject, {
        var notificationObject = {
          read: false,
          type: "codeFound",
          actor: Meteor.userId(),
          effected: codeFound.createdBy,
          date: (new Date()).valueOf()
        };
        
        Meteor.call("addNotification", notificationObject);
        alert("You found a code!!!");
      } else {
        var errorObject = {message: "You already found this code!!!"};
        Errors.insert(errorObject);
        Session.set("redeemCodeErrors", errorObject);
        //alert("You already found this code!!!");
        return;
      }
      
      foundByArray.push(Meteor.userId());
      var setObject = { 
        "foundBy": foundByArray,
        "dateFound": (new Date()).valueOf()
      };
      
      Meteor.call("updateCodeRedemption", code, setObject);
      
    } else if (codeFound && codeFound.claimedBy){
      alert("Code already claimed by: " + codeFound.claimedBy);
    } else {
      var errorObject = {message: "Code not available!!!"};
      Errors.insert(errorObject);
      Session.set("redeemCodeErrors", errorObject);
      //alert("Code not available!!!");
    }  
}


Meteor.setInterval(function() {
  Session.set("current_date", new Date());
}, 1000);

Template.redeemCode.created = function() {
  Session.set("redeemCodeErrors", {});
};

Template.redeemCode.helpers({
  "errorClass": function() {
    return !!Session.get("redeemCodeErrors") ? "error": "";
  },
  "errorMessage": function() {
    
    if (Session.get("redeemCodeErrors")) {
      return Session.get("redeemCodeErrors").message;
    } else {
      return "";
    }
  },
  "checkingForCode": function() {return Session.get("checkingForCode");},
  /*
  "getFoundCodes": function() {
    var dateCutoff = Session.get("current_date") - (codeValidAfterClaimTimeMillis + 1*24*60*60*1000);
    return CodeRedemption.find({"dateFound": {$gt: dateCutoff}, "foundBy": Meteor.userId(), "claimedBy": undefined});
  },
  "getClaimedCodes": function() {
    //var dateCutoff = Session.get("current_date") - (codeValidAfterClaimTimeMillis + 1*24*60*60*1000);
    return CodeRedemption.find({"claimedBy": Meteor.userId(), "redeemedBy": undefined});
  }
  */
});

Template.redeemCode.events({
  /*
  "load": function(event) {

  },
  */
  "click #find-code-btn": function(event) {
    Session.set("checkingForCode", true);
    var code = $(event.target).closest("form").find("input").val();
    
    event.preventDefault();
    
    var subscriptionHandle = Meteor.subscribe("checkForAvailableCode", code, function() {
      checkForCode(code); 
      Session.set("checkingForCode", false);
    });
    
    
  }
});



/*****************************************************************************/
/* RedeemCode: Lifecycle Hooks */
/*****************************************************************************/
Template.redeemCode.created = function () {
};

Template.redeemCode.onRendered(function () {
      
  var codeType = location.href.split("/")[4];
  //alert(event.target.nodeName);

  $('.' + codeType + "-tab").first().closest('li').addClass("active");

  $('a[data-toggle="tab"]').on('show.bs.tab', function (e) {
    //$('a[data-toggle="tab"]').closest('li').removeClass("active");
    //$(e.target).closest('li').addClass("active");

    Router.go("redeem_codes", {"codeType": $(e.target).data("codetype"), "numFoundPosts": 10, "numClaimedPosts": 10, "numAvailablePosts": 10});

  });

});

Template.redeemCode.destroyed = function () {
};