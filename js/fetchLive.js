const liveIcon = document.getElementById("live-icon");
const liveText = document.getElementById("join-the-stream");

fetch("/.netlify/functions/twitchLiveStatus")
  .then(res => res.json())
  .then(data => {
    console.log(data);
    if isLive == "true" {
      liveIcon.style.display = "inline",
      liveText.innerHTML = "Join the stream"
    }
    else {
      liveIcon.style.display = "none",
      liveText.innerHTML = "Check my Twitch"
    }
  })
  .catch(err => console.error(err));
