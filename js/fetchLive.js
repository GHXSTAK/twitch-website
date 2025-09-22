const liveText = document.getElementById("join-the-stream");

fetch("/.netlify/functions/twitchLiveStatus")
  .then(res => res.json())
  .then(data => {
    console.log(data);

    if (data.isLive) {
      const liveIcon = document.createElement("span");
      liveIcon.setAttribute("id", "live-icon")
      liveText.textContent = "Join the stream";
      liveText.appendChild(liveIcon)
    } else {
      liveText.textContent = "Check my Twitch";
    }
  })
  .catch(err => console.error(err));
