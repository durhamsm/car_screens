/*****************************************************************************/
/* DisplayMessages: Event Handlers and Helpersss .js*/
/*****************************************************************************/

Template.displayMessages.events({
  "change .state_dropdown": function(event, template) {
    var messages = template.data.messages;
    
    var messageId = $(event.target).closest("tr").prop("id");
    var messageIndex = getMessageIndex(messageId, messages);
    
    var selected = $(event.target).find(":selected").text();
    var selectedArray = [];
    
    for (var index = 0; index < selected.length; index += 2) {
      selectedArray.push(selected.slice(index, index + 2));
    }
    
    messages[messageIndex].selectedStates = selectedArray;
    
    Meteor.call("updateAdvertisingMessage", Meteor.userId(), messages);

  },
  "change .scrollmode-dropdown": function(event) {
    if ($(event.target).val() === "Create New") {
      //Session.set("current_page", "scroll_modes");
    }
  },
  "change .select-file": function(event) {
    readURL(event.target);
  }
});

Template.displayMessages.helpers({
  "getUserSelectedStates": function(userId) {
    return SelectedStates.findOne().selectedStates;
  },
  "checkIfSaved": function(state, messageId, messages) {
    
    var messageIndex = getMessageIndex(messageId, messages);
    
    var selectedStates = messages[messageIndex].selectedStates;
    
    if (selectedStates) {
      if (selectedStates.indexOf(state) > -1) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  },
  'getScrollModes': function() {
    var scrollModes = AdvertisingMessages.findOne().scrollModes;
    
    if (scrollModes) {
      return scrollModes;
    } else {
      return ["This", "That"];
    }
  },
  'onPage': function(page) {
    return (Session.get("current_page") === page);
  }
});

/*****************************************************************************/
/* DisplayMessages: Lifecycle Hooks */
/*****************************************************************************/
Template.displayMessages.created = function () {
};

Template.displayMessages.rendered = function () {
};

Template.displayMessages.destroyed = function () {
};

function getMessageIndex(messageId, messages) {
  for (var index = 0; index < messages.length; ++index) {
    if (messages[index].id === parseInt(messageId)) {
      return index;
    }
  }
}


readURL = function(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    var tr = $(input).closest('tr');
    var messageIndex = $(".message-display-tr").index(tr);
          
         
    reader.onload = function (e) {
      $(input).closest('tr').find(".show-image")
      .attr('src', e.target.result)
      .width(50)
      .height(50);
              
      var messages = AdvertisingMessages.findOne().messages;
      messages[messageIndex].advertImage = reader.result;
      
      Meteor.call("addNewAdvertImage", Meteor.userId(), messages);
      
    };

    reader.readAsDataURL(input.files[0]);
   }
}