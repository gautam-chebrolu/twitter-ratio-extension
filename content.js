(() => {
  let currentTweet = "";
  allStats = [];

  chrome.runtime.onMessage.addListener((obj, sender, response) => {
    const { type, value, tweetId } = obj;

    if (type === "NEW") {
      currentTweet = tweetId;
      newPageLoaded();
    }
  });

  const newPageLoaded = () => {
    var obs = new MutationObserver(function (mutations, observer) {
      const postStats = document.getElementsByClassName(
        "css-1dbjc4n r-1ta3fxp r-18u37iz r-1wtj0ep r-1s2bzr4 r-1mdbhws"
      );

      const mainTweet = document.getElementsByClassName(
        "css-1dbjc4n r-1dgieki r-1efd50x r-5kkj8d r-13awgt0 r-18u37iz r-tzz3ar r-s1qlax r-1yzf0co"
      );
      console.log("Main tweet: ", mainTweet[0]);

      if (
        postStats.length != allStats.length &&
        postStats.length != allStats.length - 1
      ) {
        allStats = [];

        for (var i = 0; i < postStats.length; i++) {
          allStats.push(postStats[i].id);
        }
        allStats.push(mainTweet[0].id);
        console.log("This is the id: ", mainTweet[0].id);

        for (var i = 0; i < allStats.length; i++) {
          var currStats = document.getElementById(allStats[i]);
          testDivExists = currStats.getElementsByClassName(
            "css-901oao r-1awozwy r-14j79pv r-6koalj r-37j5jr r-a023e6 r-16dba41 r-1h0z5md r-rjixqe r-bcqeeo r-o7ynqc r-clp7b1 r-3s2u2q r-qvutc0 testDiv"
          );

          if (testDivExists.length === 0) {
            var views, replies, retweets, likes;
            const testDiv = document.createElement("div");
            testDiv.className =
              "css-901oao r-1awozwy r-14j79pv r-6koalj r-37j5jr r-a023e6 r-16dba41 r-1h0z5md r-rjixqe r-bcqeeo r-o7ynqc r-clp7b1 r-3s2u2q r-qvutc0 testDiv";
            testDiv.title = "Views per Like";
            for (const child of currStats.children) {
              var currLabel = child.firstChild.ariaLabel;
              if (currLabel) {
                if (currLabel.includes("Views"))
                  views = parseInt(currLabel.split(" ")[0]);
                if (currLabel.includes("Replies"))
                  replies = parseInt(currLabel.split(" ")[0]);
                if (currLabel.includes("Retweets"))
                  retweets = parseInt(currLabel.split(" ")[0]);
                if (currLabel.includes("Likes"))
                  likes = parseInt(currLabel.split(" ")[0]);
              }
            }

            testDiv.innerHTML = Math.trunc(views / likes);
            testDiv.style.backgroundColor = "#1DA1F220";
            testDiv.style.padding = "5px 5px 5px 5px";
            testDiv.style.borderRadius = "6px";
            testDiv.style.fontSize = "small";
            currStats.appendChild(testDiv);
          }
        }
      }
    });
    obs.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: false,
      characterData: false,
    });

    //"css-1dbjc4n r-18u37iz r-1h0z5md"
  };

  newPageLoaded();
})();
