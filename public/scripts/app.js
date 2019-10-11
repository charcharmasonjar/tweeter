/*
 * Client-side JS logic
 * jQuery is already loaded
 */

//function that prevents untrusted text from being evaluated
const escape = function (string) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(string));
  return div.innerHTML;
};

// function that takes in a tweet object and returns a tweet
// <article> element containing the entire HTML structure of the tweet
const createTweetElement = function (tweet) {
  const $result = `<article>
  <header>
    <div class="user">
      <img src="${tweet.user.avatars}" alt="user avatar">
      <p>${escape(tweet.user.name)}</p>
    </div>
    <span class="handle">${escape(tweet.user.handle)}</span>
  </header>
  <section>
    <p>${escape(tweet.content.text)}</p>
  </section>
  <footer>
    <span class="date">
    ${moment(tweet.created_at).fromNow()}
    </span>
    <div class="icons">
      <i class="fa fa-flag"></i>
      <i class="fa fa-retweet"></i>
      <i class="fa fa-heart"></i>
    </div>
  </footer>
  </article>`

  return $result;
}

// loops through array of tweet objects
// calls createTweetElement for each tweet
// takes return value and appends it to the tweets container
const renderTweets = function (tweets) {
  for (const tweet of tweets) {
    let result = createTweetElement(tweet);
    $('#tweets-container').prepend(result);
  }
};

//makes a request to /tweets
//receives the array of tweets as JSON
const loadTweets = function () {
  $.ajax({
    url: "/tweets",
    type: "GET",
  })
    .then((res) => {
      renderTweets(res);
    })
};

//same as loadTweets, except only adds the last tweet to the page
const loadLastTweet = function () {
  $.ajax({
    url: "/tweets",
    type: "GET",
  })
    .then((res) => {
      renderTweets([res[res.length - 1]]);
    })
};

$(document).ready(function () {

  loadTweets();

  $(".new-tweet").submit(function (event) {
    event.preventDefault();

    $(".empty").slideUp();
    $(".too-long").slideUp();

    //error handling
    if (!$("textarea[name='text']").val().length) {
      return $(".empty").slideDown();
    }
    if ($("textarea[name='text']").val().length > 140) {
      return $(".too-long").slideDown();
    }

    let tweet = $(this).serialize();

    $.ajax({
      url: "/tweets",
      type: "POST",
      data: tweet,
    })
      .then(() => {
        loadLastTweet();
        $("textarea[name='text']").val('');
        $(".counter").text(140);
      })
  })

  //toggles write tweet form and moves focus to form
  $(".nav-button").click(() => {
    $(".form-container").slideToggle("fast", () => {
      $("textarea[name='text']").focus();
    });
  })

  //write tweet button takes user backto top
  $(".nav-button").click(() => {
    $("html, body").animate({ scrollTop: 0 }, "fast");
    return false;
  })

  //arrow in nav switches direction once user scrolls down 
  $(window).scroll(() => {
    if ($(document).scrollTop() > 400) {
      $(".bounce").addClass("fa-angle-double-up");
      $(".bounce").removeClass("fa-angle-double-down");
    } else {
      $(".bounce").addClass("fa-angle-double-down");
      $(".bounce").removeClass("fa-angle-double-up");
    }
  });

});


