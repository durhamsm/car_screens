/*****************************************************************************/
/* CodeReviews Publish Functions
/*****************************************************************************/

Meteor.publish('codeReviews', function (codeId, sortOptions) {
  // you can remove this if you return a cursor
  return CodeReviews.find({code: codeId}, sortOptions);
  
});