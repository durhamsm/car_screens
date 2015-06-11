/*****************************************************************************/
/* App: The Global Application Namespace */
/*****************************************************************************/
App = {};



SelectedStates = new Mongo.Collection('selectedStates');
AdvertisingMessages = new Mongo.Collection('advertisingMessages');
CodeRedemption = new Mongo.Collection('codeRedemption');
CodeReviews = new Mongo.Collection('codeReviews');
Errors = new Mongo.Collection(null);
Notifications = new Mongo.Collection("notifications");

var n;




/*
 AdvertisingMessages.allow({
 insert: function() {return true;}
 });

 AdvertisingMessages.deny({
 insert: function() {return true;}
 });
 */
/*
 Errors.allow({
 insert: function() {return true;}
 });
 */


Meteor.methods({

    "updateNotification": function(id, updateObject) {
        Notifications._collection.update({_id: id}, updateObject);
    },
    "addNotification" : function(notificationObject) {
        Notifications._collection.insert(notificationObject);
    },
    'addNewAdvertImage': function(userId, messages) {
        AdvertisingMessages._collection.update({"_id": userId}, {$set: {"messages": messages}}, {"upsert": true});
    },

    "updateAdvertisingMessage": function(id, messages) {
        AdvertisingMessages.update({"_id": id}, {$set: {"messages": messages}});
    },
    'addNewAdvertisingMessage': function(id, message) {

        var foundDoc = AdvertisingMessages.findOne(id);
        var messages;

        if (foundDoc) {
            messages = foundDoc.messages;
            if (messages.length > 0) {
                message.id = messages[messages.length-1].id + 1;
            } else {
                message.id = 0;
            }
            messages.push(message);
        } else{
            message.id = 0;
            messages = [message];
        }

        //console.log(id);

        //check(id, String);

        AdvertisingMessages.update(
            {"_id": id},
            {$set: {"messages": messages}},
            {"upsert": true}
        );
    },
    "updateCodeRedemption": function(code, setObject) {
        CodeRedemption._collection.update({"_id": code},
            {$set: setObject}
        );
    },
    'updateUserStates': function(userId, selectedStates) {

        if (SelectedStates._collection.find({'_id': userId}).fetch().length === 0) {
            SelectedStates._collection.insert({
                '_id': userId,
                'selectedStates': selectedStates
            });
        } else {

            SelectedStates._collection.update(
                {'_id': userId},
                {$set: {'selectedStates': selectedStates} },
                {upsert: true}
            );
        }
    },
    'findUserStates': function() {
        var selectedStates = SelectedStates._collection.find({'_id': Meteor.userId()}).fetch().selectedStates;
        return ((selectedStates === undefined) ? []: selectedStates);
    },
    'addNewCodeReview': function(insertObject) {
        var author = CodeReviews.findOne({"author": insertObject.author, "code": insertObject.code});


        var result = {};

        if (author){
            result.reviewExists = true;
        } else {
            CodeReviews.insert(insertObject);
        }

        //CodeReviews._collection.insert(insertObject);

        return result;

    },
    'removeReview': function(id) {
        CodeReviews.remove(id);
    },
    "insertNewCode": function(insertObject) {
        CodeRedemption._collection.insert(insertObject);
    },
    "vote": function(voteType, insertObject) {
        console.log(voteType);
        if (voteType === "up") {
            CodeReviews._collection.update({"_id": insertObject._id}, {
                $addToSet: {"upVoters": insertObject.voter},
                $inc: {upVotes: 1}
            });
        } else {
            CodeReviews._collection.update({"_id": insertObject._id}, {
                $addToSet: {"downVoters": insertObject.voter},
                $inc: {downVotes: 1}
            });
        }
    },
    "downVote": function(insertObject) {
        CodeReviews._collection.update({"_id": insertObject._id}, {
            $addToSet: {"downVoters": insertObject.voter},
            $inc: {downVotes: 1}
        });
    }
});



if (Meteor.isClient) {

    Meteor.subscribe("notifications", Meteor.userId());


}

if (Meteor.isServer) {

    process.env.MAIL_URL = "smtp://durhamsm@live.com:lawnboy85@smtp.live.com:587/";

    Accounts.emailTemplates.enrollAccount.text = function (user, url) {

        var tokenIndex = url.indexOf("#") + 2;

        var token = url.substr(tokenIndex, url.length);

        url = "https://muscular-baby-46-191432.use1.nitrousbox.com/#/" + token;

        return "Please click the link to set your password!!\n\n"
            + url;

    };

    Meteor.methods({
        "createNewUser": function(userObject) {
            var userId = Accounts.createUser(userObject);
            Accounts.sendEnrollmentEmail(userId);

            return "Success!! Confirm email address!";

        }

    });

    CodeRedemption.allow({
        insert: function() {console.log("Allow - insert"); return true;},
        update: function() {return true;},
        remove: function() {return true;}
    });

    CodeRedemption.deny({
        insert: function() {return false;},
        update: function() {return false;},
        remove: function() {return false;}
    });

}
