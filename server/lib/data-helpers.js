"use strict";

// Simulates the kind of delay we see with network or filesystem operations
const simulateDelay = require("./util/simulate-delay");

//for dealing with dates
const moment = require('moment');

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
      simulateDelay(() => {
        db.tweets.push(newTweet);
        callback(null, true);
      });
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
      simulateDelay(() => {
        const sortNewestFirst = (a, b) => {
          a.created_at - b.created_at;
        }
        // const sorted = db.tweets.sort(sortNewestFirst);
        // for (const tweet of sorted) {
        //   tweet.created_at = moment(tweet.created_at).fromNow();
        // }
        callback(null, db.tweets.sort(sortNewestFirst));
      });
    }

  };
}
