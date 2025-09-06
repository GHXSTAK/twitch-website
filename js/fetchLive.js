fetch("/.netlify/functions/twitchLiveStatus")
  .then(res => res.json())
  .then(data => {
    console.log(data);

    // Streamers
  })
  .catch(err => console.error(err));
