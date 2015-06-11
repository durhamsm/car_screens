/*****************************************************************************/
/* Client and Server Routes */
/*****************************************************************************/


Router.configure({
  layoutTemplate: 'masterLayout',
  loadingTemplate: 'Loading',
  notFoundTemplate: 'NotFound',
  
  waiton: function() {
    return [
      Meteor.subscribe("notifications", Meteor.userId()),
      Meteor.subscribe("errors")
      ];
  }
  
});

//Router.onBeforeAction(Iron.Router.bodyParser.json());

Router.route("/drivers_and_consumers", {
  template: "drivers_and_consumers",
  action: function() {
    Session.set("current_page", "drivers_and_consumers");
    this.layout("masterLayout", {data: getMenuFieldsData});
    this.render("driversAndConsumers");
  }
});

Router.route("/companies", {
  template: "companies",
  action: function() {
    Session.set("current_page", "companies");
    this.layout("masterLayout", {data: getMenuFieldsData});
    this.render("companies");
  },
  
});

Router.route("/getdata", {name: 'getdata', where: 'server'})
  .get(function() {
    var json=this.request.body;  
    this.response.end('You got: ' +  JSON.stringify(json));
})
  .post(function() {
    var json=this.request.body;  
    this.response.end('You got: ' +  JSON.stringify(json));
    //this.response.end('Post hellow world\n');
});

Router.onBeforeAction(function() {Router.go("home"); this.next();}, {only: "start.page"});


Router.route("/reviews/:_id", {
  name: "code_reviews",
  waitOn: function() {return Meteor.subscribe("codeReviews", this.params._id, {"sort": {"date": -1}});},
  data: function() { return {code: this.params._id, reviews: CodeReviews.find({}, {"sort": {"date": -1}})};},
  action: function() {this.layout("masterLayout", {data: getMenuFieldsData}); this.render("code_reviews", {data: this.data()});}
});


Router.route("/reviews/:_id/best", {
  name: "code_reviews_best",
  template: "code_reviews",
  waitOn: function() {return Meteor.subscribe("codeReviews", this.params._id, {"sort": {"upVotes": -1}});},
  data: function() { return {code: this.params._id, reviews: CodeReviews.find({}, {"sort": {"upVotes": -1}})};},
  action: function() {this.layout("masterLayout", {data: getMenuFieldsData}); this.render("code_reviews", {data: this.data()});}
});

Router.route("/advertising_rates", {
  template: "advertisingRates",
  waitOn: function() {
    return Meteor.subscribe("getSelectedStates", Meteor.userId());
  },
  //data: function() {return SelectedStates.findOne();},
  action: function() {
    if (SelectedStates.find({"_id": Meteor.userId()}).fetch().length) {
      Session.set("selected_states", SelectedStates.find({"_id": Meteor.userId()}).fetch()[0].selectedStates);
    } else {
      Session.set("selected_states", []);
    }
    
    this.layout("masterLayout", {data: getMenuFieldsData});
    this.render("advertisingRates"/*, {data: SelectedStates.findOne()}*/);},
  name: "advertising_rates"
}
  
  /*action: function() {
    Session.set("current_page", "advertising_rates"); 
    this.layout("masterLayout", {data: getMenuFieldsData});
    this.render("advertisingRates", {data: SelectedStates.findOne()});
    alert("hey");
  }
  */
  
 /*{waitOn: function() {return [
  Meteor.subscribe("getSelectedStates", Meteor.userId()),
  Meteor.subscribe("notifications", Meteor.userId()),
  Meteor.subscribe("errors")]
  
  }}*/
);

Router.route("/redeem_code", {
  action: function() {Router.go("redeem_codes", {"codeType": "available", "numFoundPosts": 10, "numClaimedPosts": 10, "numAvailablePosts": 10});}
});


getRedeemCodeSubscription = function(type, limit, username) {
  
  console.log(Meteor.userId() + " " + limit + " " + type);
  
  switch(type) {
    case "available":
      return Meteor.subscribe("allCodes", {"selectors": {"foundBy": {$ne: username}, "redeemedBy": null}, "options": {"sort": {dateGenerated: -1}, "limit": limit}});
    case "found":
      return Meteor.subscribe("allCodes", {"selectors": {"foundBy": username, "claimedBy": null}, "options": {"sort": {dateGenerated: -1}, "limit": limit}});
    case "claimed":
      return Meteor.subscribe("allCodes", {"selectors": {"claimedBy": username, "redeemedBy": null}, "options": {"sort": {dateGenerated: -1}, "limit": limit}});
    default:
      break;
  }
};


function getIncreasedPostsPath(values, dateCutoff) {
  values = [parseInt(values.numAvailablePosts), parseInt(values.numFoundPosts), parseInt(values.numClaimedPosts)];
  var newValues = values;
  
//  switch(type) {
//    case "available":
      var availableCodes = CodeRedemption.find({"foundBy": null});
      if (availableCodes.count() === newValues[0]) {newValues[0]+=10;}
//    case "found":
      var foundCodes = CodeRedemption.find({"dateFound": {$gt: dateCutoff}, "foundBy": Meteor.userId(), "claimedBy": null});
      if (foundCodes.count() === newValues[1]) {newValues[1]+=10;}
//    case "claimed":
      var claimedCodes = CodeRedemption.find({"claimedBy": Meteor.userId(), "redeemedBy": null});
      if (claimedCodes.count() === newValues[2]) {newValues[2]+=10;}
//    default:
//      break;
//  }
  
  return {
    "numPosts": {
      "numAvailablePosts": [newValues[0], values[1], values[2]],
      "numFoundPosts":  [values[0], newValues[1], values[2]],
      "numClaimedPosts":  [values[0], values[1], newValues[2]]
    },    
    "codes": {
      "availableCodes": availableCodes,
      "foundCodes": foundCodes,
      "claimedCodes": claimedCodes
    }
  };
  
}
 
/*
    var foundLimit = (this.params.numFoundPosts > 0) ? parseInt(this.params.numFoundPosts) : 10; 
                             var claimedLimit = (this.params.numClaimedPosts > 0) ? parseInt(this.params.numClaimedPosts) : 10;
                             var availableLimit = (this.params.numAvailablePosts > 0) ? parseInt(this.params.numAvailablePosts) : 10; 
*/


Router.route("/redeem_code/:codeType/:numAvailablePosts?&:numFoundPosts?&:numClaimedPosts?", {
  template: "redeemCode",
  increment: 10,
  subscriptions: function() {
    
    //var numPosts = this.params["num" + (this.params.codeType.charAt(0).toUpperCase() + this.params.codeType.slice(1)) + "Posts"];
    //var availableLimit = (parseInt(this.params.numAvailablePosts) > 0) ? parseInt(this.params.numAvailablePosts) : 10;
    //var foundLimit = (parseInt(this.params.numFoundPosts) > 0) ? parseInt(this.params.numFoundPosts) : 10;
    //var claimedLimit = (parseInt(this.params.numClaimedPosts) > 0) ? parseInt(this.params.numClaimedPosts) : 10;
    
    //var limits = [availableLimit, foundLimit, claimedLimit];
    
    //this.codesSub = getRedeemCodeSubscription(this.params.codeType, limits);
    
    var codeTypeUpper = this.params.codeType.charAt(0).toUpperCase() + this.params.codeType.slice(1);
    
    var limit = parseInt(this.params["num" + codeTypeUpper + "Posts"]);
    var user = Meteor.users.findOne(Meteor.userId());
    var type = this.params.codeType;

      if (user) {
          switch (type) {
              case "available":
                  this.codesSub = Meteor.subscribe("newAllCodes", {
                      "selectors": {
                          "foundBy": {$ne: user.username},
                          "redeemedBy": null
                      }, "options": {"sort": {dateGenerated: -1}, "limit": limit}
                  });
              case "found":
                  this.codesSub = Meteor.subscribe("newAllCodes", {
                      "selectors": {
                          "foundBy": user.username,
                          "claimedBy": null
                      }, "options": {"sort": {dateGenerated: -1}, "limit": limit}
                  });
              case "claimed":
                  this.codesSub = Meteor.subscribe("newAllCodes", {
                      "selectors": {
                          "claimedBy": user.username,
                          "redeemedBy": null
                      }, "options": {"sort": {dateGenerated: -1}, "limit": limit}
                  });
              default:
                  break;
          }
      } else {
          this.codesSub = {
              ready: function() {
                  return true;
              }
          };
      }
    
    /*
       this.codesSub = [Meteor.subscribe("allCodes", {"selectors": {"foundBy": {$ne: Meteor.userId()}, "redeemedBy": null}, "options": {"sort": {dateGenerated: -1}, "limit": availableLimit}}),
               Meteor.subscribe("allCodes", {"selectors": {"foundBy": Meteor.userId(), "claimedBy": null}, "options": {"sort": {dateGenerated: -1}, "limit": foundLimit}}),
               Meteor.subscribe("allCodes", {"selectors": {"claimedBy": Meteor.userId(), "redeemedBy": null}, "options": {"sort": {dateGenerated: -1}, "limit": claimedLimit}})];
    */
  },
  data: function() {
    var dateCutoff = Session.get("current_date") - (codeValidAfterClaimTimeMillis + 1*24*60*60*1000);
    
    var result = getIncreasedPostsPath(this.params, dateCutoff);
    var loadAvailableCodesPath = this.route.path({"numAvailablePosts": result.numPosts.numAvailablePosts[0], "numFoundPosts": result.numPosts.numAvailablePosts[1], "numClaimedPosts": result.numPosts.numAvailablePosts[2]});
    var loadFoundCodesPath = this.route.path({"numAvailablePosts": result.numPosts.numFoundPosts[0], "numFoundPosts": result.numPosts.numFoundPosts[1], "numClaimedPosts": result.numPosts.numFoundPosts[2]});
    var loadClaimedCodesPath = this.route.path({"numAvailablePosts": result.numPosts.numClaimedPosts[0], "numFoundPosts": result.numPosts.numClaimedPosts[1], "numClaimedPosts": result.numPosts.numClaimedPosts[2]});

    return {"ready": this.codesSub.ready(),
            "loadAvailableCodesPath": loadAvailableCodesPath,
            "loadFoundCodesPath": loadFoundCodesPath,
            "loadClaimedCodesPath": loadClaimedCodesPath,
            "codes": result.codes 
           };
  },
  action: function() {
    this.render("redeemCode", {data: this.data});
  },
  name: "redeem_codes"
  });




    //alert("found codes: " + foundCodes.count() + " and claimed: " + claimedCodes.count());

    
    /*
    var increaseAvailableCodesPath = this.route.path(getIncreasedPostsPath("available", this.params, dateCutoff));
    var increaseFoundCodesPath = this.route.path(getIncreasedPostsPath("found", this.params, dateCutoff));
    var increaseClaimedCodesPath = this.route.path(getIncreasedPostsPath("claimed", this.params, dateCutoff));
*/
    
    //var nextPage = (foundCodes.count() === parseInt(this.params.numPosts)) ? this.route.path({"numPosts": (parseInt(this.params.numPosts) + 10)}) : null;
    



Router.route("/advertising_statistics", function() {
  Session.set("current_page", "advertising_statistics"); 
  this.layout("masterLayout", {data: getMenuFieldsData});
  this.render("advertising_statistics", {data: function() {return CodeRedemption.find();}});
}, {waitOn: function() {return [
      Meteor.subscribe("advertisingStatistics", Meteor.userId()),
      Meteor.subscribe("advertisingMessages", Meteor.userId()),
      Meteor.subscribe("getSelectedStates", Meteor.userId())];}
   }
);

Router.route("/advertising_messages", function() {
  Session.set("current_page", "advertising_messages"); 
  this.layout("masterLayout", {data: getMenuFieldsData});
  this.render("advertising_messages", {data: function() {return AdvertisingMessages.findOne();}});
}, {waitOn: function() {return [
  Meteor.subscribe("advertisingMessages", Meteor.userId()),
  Meteor.subscribe("getSelectedStates", Meteor.userId())];},
    //data: function() {return AdvertisingMessages.findOne();}
   }
            );

Router.route("/home", function() {
  
  Session.set("current_page", "home");
  Session.set("location", "home");
  this.layout("masterLayout", {data: getMenuFieldsData});
  this.render("Home");
  
}, {name: "home"});

Router.route("/:pageName", function() {
  
  Session.set("current_page", this.params.pageName);
  this.layout("masterLayout", {data: getMenuFieldsData});
  this.render(this.params.pageName);
  
}, {name: 'main_body.link'});


Router.route("/", function() {
}, {name: "start.page"});

getMenuFieldsData = function() {
  var current_language = Session.get("language");
  var page = Session.get("current_page");
  return Text[page][current_language];
};

