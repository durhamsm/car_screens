/*****************************************************************************/
/* Header: Event Handlers and Helpersss .js*/
/*****************************************************************************/


Template.Header.helpers({
  language_options: main_body_text_all_languages.language_options
});

Template.Header.events({

  "click #go_home": function(event) {
    Session.set("current_page", "home");
  },
  "click a": function(event, tmpl) {

    switch(event.target.text) {
      case "English":
        Session.set("language", "english");
        break;
      case "Русский":
        Session.set("language", "russian");
        break;
      case "Espanol":
        Session.set("language", "spanish");
        break;
      case "Home":
        return;
    }
    
    event.preventDefault();

  }
});

/*****************************************************************************/
/* Header: Lifecycle Hooks */
/*****************************************************************************/
Template.Header.created = function () {
};

Template.Header.rendered = function () {
};

Template.Header.destroyed = function () {
};