/*****************************************************************************/
/* Client App Namespace  */
/*****************************************************************************/
_.extend(App, {
});

App.helpers = {
};

_.each(App.helpers, function (helper, key) {
  Handlebars.registerHelper(key, helper);
});

/*
SelectedStates = new Mongo.Collection('selectedStates');
AdvertisingMessages = new Mongo.Collection('advertisingMessages');
CodeRedemption = new Mongo.Collection('codeRedemption');
CodeReviews = new Mongo.Collection('codeReviews');
Errors = new Mongo.Collection(null);
Notifications = new Mongo.Collection("notifications");
*/
