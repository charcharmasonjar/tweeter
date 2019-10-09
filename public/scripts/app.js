/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// Test / driver code (temporary). Eventually will get this from the server.
const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
}

// function that takes in a tweet object and returning a tweet
// <article> element containing the entire HTML structure of the tweet
const createTweetElement = function(tweet) {
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

const tweet = createTweetElement(tweetData);

$(document).ready(function() {
  console.log(tweet); 
  $('#tweets-container').append(tweet);
})

