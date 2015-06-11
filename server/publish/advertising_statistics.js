Meteor.publish('advertisingStatistics', function (userId) {
  // you can remove this if you return a cursor
  return CodeRedemption.find({'createdBy': userId});
  
});