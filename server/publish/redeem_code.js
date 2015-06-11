
Meteor.publish('allCodes', function (input) {
  return CodeRedemption.find(input.selectors, input.options);
});

Meteor.publish('checkForAvailableCode', function (code) {
  // you can remove this if you return a cursor
  //return CodeRedemption.find({$or: [{"claimedBy": userId}, {"foundBy": this.userId}]});
  return CodeRedemption.find({"_id": code});
});

Meteor.publish('newAllCodes', function (input) {
  return CodeRedemption.find(input.selectors, input.options);
});