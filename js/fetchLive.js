const liveIcon = document.getElementById("live-icon");
const liveText = document.getElementById("join-the-stream");

fetch("/.netlify/functions/twitchLiveStatus")
  .then(res => res.json())
  .then(data => {
    console.log(data);
    if (data.isLive) {
      liveIcon.style.display = "inline";
      liveText.textContent = "Join the stream";
    } else {
      liveIcon.style.display = "none";
      liveText.textContent = "Check my Twitch";
    }
  })
  .catch(err => console.error(err));
