/*****************************************************************************/
/* AdvertisingRates Publish Functions
/*****************************************************************************/

Meteor.publish('getSelectedStates', function (userId) {
  // you can remove this if you return a cursor
  //SelectedStates = new Mongo.Collection("selectedStates");
  return SelectedStates.find({"_id": userId});
});
