const friendsSContainer = document.getElementById("friends-s-container");
const friendsNSContainer = document.getElementById("friends-ns-container");

fetch("/.netlify/functions/twitchFetchFriends")
  .then(res => res.json())
  .then(data => {
    console.log(data);

    // Streamers
    data.streamers.forEach(user => {
      const friend = document.createElement("div");

      const name = document.createElement("p");
      name.textContent = user.display_name;
      name.classList.add("SUser-text");

      const nickname = document.createElement("h2");
      nickname.textContent = user.nickname || user.display_name;
      nickname.classList.add("nickname-text");

      const img = document.createElement("img");
      img.src = user.profile_image_url;
      img.alt = user.display_name;
      img.loading = "lazy";

      const link = document.createElement("a");
      link.href = `https://twitch.tv/${user.login}`;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.appendChild(nickname);
      link.appendChild(name);
      link.appendChild(img);

      friend.appendChild(link);
      friendsSContainer.appendChild(friend);
    });

    // Non-streamers
    data.nonStreamers.forEach(user => {
      const friend = document.createElement("div");

      const nickname = document.createElement("p");
      nickname.textContent = user.nickname || user.display_name;
      nickname.classList.add("nickname-text");

      const img = document.createElement("img");
      img.src = user.profile_image_url;
      img.alt = user.display_name;
      img.loading = "lazy";

      friend.appendChild(nickname);
      friend.appendChild(img);
      friendsNSContainer.appendChild(friend);
    });
  })
  .catch(err => console.error(err));
