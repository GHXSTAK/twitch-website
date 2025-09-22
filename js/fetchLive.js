const liveText = document.getElementById("livestream");
const liveContainer = document.getElementById("live-container")

fetch("/.netlify/functions/twitchLiveStatus")
  .then(res => res.json())
  .then(data => {
    console.log(data);

    if (data.isLive) {
      const liveIcon = document.createElement("div");
      const liveIconPulse = document.createElement("span");

      liveIcon.setAttribute("id", "live-icon");
      liveIcon.appendChild(liveIconPulse);

      liveText.classList.add("is-live");
      liveText.textContent = "Join the stream";

      liveContainer.prepend(liveIcon);
    } else {
      liveText.classList.remove("is-live");
      liveText.textContent = "Check my Twitch";
    }
  })
  .catch(err => console.error(err));
