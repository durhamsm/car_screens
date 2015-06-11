/*****************************************************************************/
/* Register: Event Handlers and Helpersss .js*/
/*****************************************************************************/
   Accounts.onEnrollmentLink(function(token, done) {
    var newPassword = prompt("Enter new password");
    
    Accounts.resetPassword(token, newPassword, function(error) {
      if (error) {
        alert(error);
      } else {
        
      }
    });
  });

Template.register.events({
  ".register-driver-checkbox change": function(event) {
    if (Session.get("isDriver")) {
      Session.set("isDriver", false);
    } else {
      Session.set("isDriver", true);
    }
  },
  ".register-company-checkbox change": function(event) {
    if (Session.get("isCompany")) {
      Session.set("isCompany", false);
    } else {
      Session.set("isCompany", true);
    }
  },
  "blur .input-username": function(event) {
    var $formGroup = $(event.target).closest(".form-group");
    
    if (Meteor.users.findOne({"userName": $(event.target).val()})) {
      $formGroup.addClass("has-error");
      $formGroup.removeClass("has-success");
    } else {
      $formGroup.addClass("has-success");
      $formGroup.removeClass("has-error");
    }
  },
  "blur .confirm-email": function(event) {
    var $formGroup = $(event.target).closest(".form-group");
    
    if ($(event.target).val() !== "" && $(event.target).val() === $(".input-email").val()) {
      $formGroup.removeClass("has-error");
      $formGroup.addClass("has-success");
      $formGroup.find(".glyphicon-remove").hide();
      $formGroup.find(".glyphicon-ok").show();
      $formGroup.find(".help-inline").css("opacity", 0);
    } else {
      $formGroup.removeClass("has-success");
      $formGroup.addClass("has-error");
      $formGroup.find(".glyphicon-remove").show();
      $formGroup.find(".glyphicon-ok").hide();
      $formGroup.find(".help-inline").fadeTo("fast", 1);
    }
  },
  "submit": function(event) {
   event.preventDefault();
   var userObject = {
      username: $(".input-username").val(),
      email: $(".input-email").val(),
      password: $(".input-password").val(),
      userVerified: true,
      profile: {
        firstName: $(".input-firstName").val(),
        lastName: $(".input-lastName").val(),
        dob: $(".input-dob").val()
      }
    };
    
    
    Meteor.call("createNewUser", userObject, function(error, result) {
      
      if (result.indexOf("Success") !== -1) {
        $("#myModal").modal("hide");
      }
      alert(result);
    });
    
    
    
  }
});
  

Template.register.helpers({
  "isDriver": function() {
    return Session.get("isDriver");
  },
  "isCompany": function() {
    return Session.get("isCompany");
  },
  /*
   * Example:
   *  items: function () {
   *    return Items.find();
   *  }
   */
});

/*****************************************************************************/
/* Register: Lifecycle Hooks */
/*****************************************************************************/
Template.register.created = function () {
 
};

Template.register.rendered = function () {
  $(function() {$("#datetimepicker1").datetimepicker();});
};

Template.register.destroyed = function () {
};