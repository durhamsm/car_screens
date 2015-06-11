/*****************************************************************************/
/* MasterLayout: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.masterLayout.events({
  "click .menu_anchor": function(event, tmpl) {
    var current_language = Session.get("language");
    var current_page = Session.get("current_page");
    
    var anchorIndex = $(".menu_anchor").index(event.currentTarget);
    
    //console.log(event.target.nodeType);
    
    var new_page = Text[current_page].english.menu_fields[anchorIndex];
    new_page = new_page.toLowerCase().split(' ').join('_');
    
    Session.set("current_page", new_page);
    
  }
});

Template.masterLayout.helpers({
  main_text: function() {
  },
  getHref: function() {
    var linkPageNameRaw = this;
    
    var current_page = Session.get("current_page");
    
    var current_language = Session.get("language");
    
    var index;
    
    for (index = 0; index < Text[current_page][current_language].menu_fields.length; ++index) {
      
      if (Text[current_page][current_language].menu_fields[index] == linkPageNameRaw) {
        return "/" + Text[current_page].english.menu_fields[index].toLowerCase().split(' ').join('_');
      }
    }
    
    return "";
    
  }
});

/*****************************************************************************/
/* MasterLayout: Lifecycle Hooks */
/*****************************************************************************/
Template.masterLayout.created = function () {
};

Template.masterLayout.rendered = function () {
};

Template.masterLayout.destroyed = function () {
};