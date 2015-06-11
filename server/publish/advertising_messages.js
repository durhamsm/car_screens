Meteor.publish('advertisingMessages', function (userId) {
  // you can remove this if you return a cursor
  
  return AdvertisingMessages.find({'_id': userId});
  
});

Meteor.publish('getOneAdvertisingMessage', function (userId) {
  // you can remove this if you return a cursor
  
  return AdvertisingMessages.find({'_id': userId});
  
});