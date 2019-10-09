/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// Test / driver code (temporary). Eventually will get this from the server.

// Fake data taken from initial-tweets.json
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

// function that takes in a tweet object and returning a tweet
// <article> element containing the entire HTML structure of the tweet
const createTweetElement = function (tweet) {
  const $result = `<article>
  <header>
    <div class="user">
      <img src="${tweet.user.avatars}" alt="user avatar">
      <p>${tweet.user.name}</p>
    </div>
    <span class="handle">${tweet.user.handle}</span>
  </header>
  <section>
    <p>${tweet.content.text}</p>
  </section>
  <footer>
    <span class="date">
    ${tweet.created_at}
    </span>
    <div class="icons">
      <i class="fa fa-flag"></i>
      <i class="fa fa-retweet"></i>
      <i class="fa fa-heart"></i>
    </div>
  </footer>`

  return $result;
}

// loops through array of tweet objects
// calls createTweetElement for each tweet
// takes return value and appends it to the tweets container
const renderTweets = function (tweets) {
  for (const tweet of tweets) {
    let result = createTweetElement(tweet);
    $('#tweets-container').append(result);
  }
}

$(document).ready(function () {
  $("body").click(() => {
    renderTweets(data);
  })
})

