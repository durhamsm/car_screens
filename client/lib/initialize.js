Session.set("language", "english");
Session.set("current_page", "home");


UI.registerHelper('onPage', function(page) {return (Session.get("current_page") === page);});
UI.registerHelper('getFormattedDate', function(dateValue) {return (new Date(dateValue)).toLocaleString();});

UI.registerHelper('getPlural', function(quantity, itemType) {
  
  var pluralItems = (itemType === "") ? "": itemType + "s";
  
  if (quantity == 1) {
    return quantity + " " + itemType;
  } else if (quantity == 0) {
    return 0 + " " + pluralItems;
  } else {
    return quantity + " " + pluralItems;
  }
});

UI.registerHelper("getUsername", function(userId) {
  //return Meteor.users.findOne(userId).username;
  return userId;
});

Template.loginButtons.events({
  "#signup-link click": function(event) {
    alert("hey");
    $("#myModal").modal("show");
    event.preventDefault();
    event.stopPropagation();
  }
});

Session.set("isCompany", true);
Session.set("isDriver", true);

Session.set("current_date", new Date());
codeValidAfterClaimTimeMillis = 2*60*1000;//1*24*60*60*1000;

codeValidAfterClaimTimeMillis = 1*60*60*1000; 
