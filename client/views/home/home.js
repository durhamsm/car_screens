/*****************************************************************************/
/* Home: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.Home.events({
  "submit": function(event) {
    //document.getElementById("myAnchor").setAttribute("onclick", "\u0061\u006c\u0065\u0072\u0074\u0028\u0037\u0029");
    
    document.getElementById("myAnchor").onclick = "function() {alert('7');}";
    //document.getElementById("myAnchor").onclick = "\u0061\u006c\u0065\u0072\u0074\u0028\u0037\u0029";
    
    //alert("hey");
    //var newHref = $(event.target).find("input").val();
    //$("#myAnchor").attr("href", newHref);
    event.preventDefault();
  }
});

Template.Home.helpers({
  /*
   * Example:
   *  items: function () {
   *    return Items.find();
   *  }
   */
});

/*****************************************************************************/
/* Home: Lifecycle Hooks */
/*****************************************************************************/
Template.Home.created = function () {
};

Template.Home.rendered = function () {
};

Template.Home.destroyed = function () {
};