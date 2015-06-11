/*
Meteor.startup(function() {
    makeid = function()
    {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for( var i=0; i < 5; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    };


    var userStates = [
        [
            "IN", "TX", "OH", "RI"
        ],
        [
            "DE", "NV", "WY", "IN"
        ],
        [
            "NY", "MD"
        ],
        [
            "NE", "OK", "CO", "MO", "SD"
        ]
    ];

    var userObjectArray = [];
    userObjectArray[0] = {username: "bobuser", email: "bob@email.com", password: "pass1234", userVerified: true,
        profile: {firstName: "Bob",lastName: "Hammoth",dob: new Date()}
    };

    userObjectArray[1] = {username: "youuser", email: "you@email.com", password: "pass1234", userVerified: true,
        profile: {firstName: "You", lastName: "Eisen", dob: new Date()}
    };

    userObjectArray[2] = {username: "barryuser", email: "barry@email.com", password: "pass1234", userVerified: true,
        profile: {firstName: "Barry", lastName: "Mullen", dob: new Date()}
    };

    userObjectArray[3] = {username: "jilluser", email: "jill@email.com", password: "pass1234", userVerified: true,
        profile: {firstName: "Jill", lastName: "Crawford", dob: new Date()}
    };

    var userIdArray = [], userDocArray = [];
    var m;

    var imagesBasePath = "C:\Users\Samuel\Desktop\images\\";
    var imageFileNameArray = ["monitors", "shoes", "socks", "ties", "tires"];

    var reader, message, messageId, insertObject;



    var readerArray = [];
    var readerCount = 0;



    for (var n = 0; n < userObjectArray.length; ++n) {
        //console.log(userObjectArray[n].username)
        userIdArray[n] = Accounts.createUser(userObjectArray[n]);
        userDocArray[n] = Meteor.users.findOne(userIdArray[n]);
    }

    for (var n = 0; n < userObjectArray.length; ++n) {
        //console.log(userObjectArray[n].username)
        //userIdArray[n] = Accounts.createUser(userObjectArray[n]);

        Meteor.call("updateUserStates", userIdArray[n], userStates[n]);

        for (m=0; m < imageFileNameArray.length; ++m) {

            //readerArray[readerCount] = new FileReader();

            message = {
                text: "Half off all " + imageFileNameArray[m] + " !!",
                dealType: "% Discount",
                percentDiscount: 50,
                advertImage: Meteor.absoluteUrl() + "images/" + imageFileNameArray[m] + ".jpe"
            };

            //var userDoc = Meteor.users.findOne(userIdArray[n]);

            Meteor.call("addNewAdvertisingMessage", userDocArray[n].username, message);

            var code = makeid();

            insertObject = {
                'createdBy': userDocArray[n].username,
                '_id': code,
                'messageId': m,
                'dateGenerated': (new Date()).valueOf(),
                'state': "IN",
                'text': message.text,
                'dealType': message.text,
                'percentDiscount': 0
            };

            (function() {
                Meteor.call("insertNewCode", insertObject, function () {

                    for (var authorIndex = 0; authorIndex < userDocArray.length; ++authorIndex) {

                        var rating = Math.floor(Math.random()*5);
                        var upVoters = [];
                        var downVoters = [];

                        for (var voterIndex = 0; voterIndex < userDocArray.length; ++voterIndex) {
                            if (voterIndex === authorIndex) {continue;}

                            var isUpVote = Math.floor(Math.random()*2);
                            if (isUpVote) {
                                upVoters.push(userDocArray[voterIndex].username)
                            } else {
                                downVoters.push(userDocArray[voterIndex].username)
                            }
                        }

                        var reviewObject = {
                            rating: rating,
                            date: (new Date()).valueOf(),
                            author: userDocArray[authorIndex].username,
                            review: "This is a review of the item",
                            code: code,
                            upVoters: upVoters,
                            upVotes: upVoters.length,
                            downVoters: downVoters,
                            downVotes: downVoters.length
                        };

                        Meteor.call("addNewCodeReview", reviewObject);
                    }

                });
            })();

            ++readerCount;

        }
    }
});

*/
