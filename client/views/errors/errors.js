/*****************************************************************************/
/* Errors: Event Handlers and Helpersss .js*/
/*****************************************************************************/
//Template.errors.created(fucntion)

Template.error.rendered = function() {
  var error = this.data;
  
  Meteor.setTimeout(function() {
    Errors.remove(error._id);
  }, 3000);
  
}


Template.errors.events({
  /*
   * Example:
   *  'click .selector': function (e, tmpl) {
   *
   *  }
   */
});

Template.errors.helpers({
  errors: function() {
    return Errors.find();
  }
});

/*****************************************************************************/
/* Errors: Lifecycle Hooks */
/*****************************************************************************/
Template.errors.created = function () {
};

Template.errors.rendered = function () {
};

Template.errors.destroyed = function () {
};