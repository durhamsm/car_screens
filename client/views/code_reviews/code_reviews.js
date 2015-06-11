/*****************************************************************************/
/* CodeReviews: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.codeReviews.events({
    "click .exit": function(event) {
        Meteor.call("removeReview", $(event.target).closest(".review-div").attr("id"));
    },
    "click .disabled": function(event) {
        Errors.insert({message: "You already voted!!"});
    },
    /*
    "click .downvote.disabled": function(event) {
        Errors.insert({message: "You already voted!!"});
    },
    */
    "click .votable": function(event) {
        var postAuthor = this.author;
        var voteType = $(event.target).closest("a").hasClass("upvote") ? "up": "down";

        var insertObject = {
            "effected": postAuthor,
            "date": (new Date()).valueOf(),
            "type": "Your post was " + voteType + "voted!!",
            "read": false
        };

        Meteor.call("addNotification", insertObject);
        Meteor.call("vote", voteType, {"_id": this._id, "voter": Meteor.userId()});
    },
    /*
    "click .downvote.votable": function(event) {
        Meteor.call("vote", "up", {"_id": this._id, "voter": Meteor.userId()});
    },
    */
    "submit": function (event) {

        event.preventDefault();

        var ratingValue = $(event.target).find(":checked").val();
        var review = $(event.target).find("#review-text-input").val();
        var rating = parseInt(ratingValue.substr(ratingValue.length - 1));

        var insertObject = {
            rating: rating,
            date: (new Date()).valueOf(),
            author: Meteor.userId(),
            review: review,
            code: this.code,
            upVoters: [],
            upVotes: 0,
            downVoters: [],
            downVotes: 0
        };

        Meteor.call("addNewCodeReview", insertObject, function(err, result) {
            if (result.reviewExists) {
                //$("#same-author-warning").show();
                $("#same-author-warning").animate({opacity: 0});
                $("#same-author-warning").animate({opacity: 1});
            }
        });

    }
});


Template.codeReviews.helpers({
    "getReviews": function() {

        if (window.location.href.indexOf("best") > -1) {
            var myReviews = this.reviews.fetch().sort(function(doc1, doc2) {
                return ((doc2.upVotes - doc2.downVotes) - (doc1.upVotes - doc1.downVotes));
            });


        } else {
            var myReviews = this.reviews.fetch().sort(function(doc1, doc2) {
                return ((doc2.upVotes - doc2.downVotes) - (doc1.upVotes - doc1.downVotes));
            });
        }

        return myReviews;

    },
    "disableVote": function() {
        var code = this.code;

        var review = CodeReviews.find({"_id": this._id}).fetch()[0];

        //return "votable";

        if (review.downVoters && (
            _.any(review.downVoters, function(item) {return item === Meteor.userId();}) ||
            _.any(review.upVoters, function(item) {return item === Meteor.userId();})
            )) {
            return "disabled";
        } else {
            return "votable";
        }

    },
    "getStarsArray": function(rating) {
        var starsArray = ["star-empty", "star-empty", "star-empty", "star-empty", "star-empty"];

        for (var i = 0; i < rating; ++i) {
            starsArray[i] = "star";
        }

        return starsArray;

    }
})
/*****************************************************************************/
/* CodeReviews: Lifecycle Hooks */
/*****************************************************************************/
Template.codeReviews.created = function () {
};

Template.codeReviews.rendered = function () {
    this.find(".all-reviews")._uihooks = {
        insertElement: function(node, next) {
            var $node = $(node), $next = $(next);

            $node.hide().insertBefore($next);

            var numElementstToNext = $(".review-div").first().nextUntil($next).length
            var startToNextHeight = numElementstToNext*$node.outerHeight(true);
            //alert("height: " + $node.outerHeight(true) + " num elements: " + numElementstToNext);

            $node.offset();
            $node.css('top', -(startToNextHeight + 300));
            $node.offset();
            $node.fadeTo("slow", 1, function() {$node.addClass("animate").css('transition-duration', 4000).css('top', 0);});

        },
        removeElement: function(node, next) {
            //alert("hey");
            $(node)
                .fadeTo("slow", 0, function() {$(node).remove();});
        },
        moveElement: function(node, next) {

            var $node = $(node), $next = $(next);
            var oldTop = $node.offset().top;
            var height = $node.outerHeight(true);

            var $inBetween = $next.nextUntil(node);

            if ($inBetween.length === 0) {
                $inBetween = $node.nextUntil(next);
            }

            $node.insertBefore(next);

            var newTop = $node.offset().top;

            $node.removeClass("animate").css({'top': oldTop - newTop});
            $inBetween.removeClass("animate").css({'top': oldTop < newTop ? height : -height});

            //$node.removeClass("animate").removeAttr('style').css({'top': oldTop - newTop, 'position': relative, 'transition': all 1s 0ms ease-in});
            //$inBetween.removeClass("animate").removeAttr('style').css({'top': oldTop - newTop, 'position': relative, 'transition': all 1s 0ms ease-in});

            $node.offset();

            $node.addClass("animate").css({'top': 0});
            $inBetween.addClass("animate").css({'top': 0});

            setTimeout(function() {
                $node.removeAttr('style');
                $inBetween.removeAttr('style');
            }, 1000);


            //$node.addClass("animate").removeAttr('style').css({'top': oldTop - newTop, 'position': relative, 'transition': all 1s 0ms ease-in});
            //$inBetween.addClass("animate").removeAttr('style').css({'top': oldTop - newTop, 'position': relative, 'transition': all 1s 0ms ease-in});

        }
    }

};

Template.codeReviews.destroyed = function () {
};