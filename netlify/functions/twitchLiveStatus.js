export async function handler(event) {
  const CLIENT_ID = process.env.TWITCH_CLIENT_ID;
  const CLIENT_SECRET = process.env.TWITCH_CLIENT_SECRET;
  const USERNAME = "ghxstak";

  const tokenRes = await fetch(
    `https://id.twitch.tv/oauth2/token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&grant_type=client_credentials`,
    { method: "POST" }
  );
  const tokenData = await tokenRes.json();
  const accessToken = tokenData.access_token;

  const fetchLiveStatus = async(user) => {
    try {
          const userRes = await fetch(`https://api.twitch.tv/helix/users?login=${user}`, {
            headers: {
              "Client-ID": CLIENT_ID,
              "Authorization": `Bearer ${accessToken}`
            }
          });
          const userData = await userRes.json();
          const u = userData.data[0];

          const streamRes = await fetch(`https://api.twitch.tv/helix/streams?${USERNAME}`, {
            headers: {
              "Client-ID": CLIENT_ID,
              "Authorization": `Bearer ${accessToken}`
            }
          });
          const streamData = await streamRes.json();

          return {
            login: u.login,
            display_name: u.display_name,
            profile_image_url: u.profile_image_url,
            isLive: streamData.data && streamData.data.length> 0
          };
    } catch(err){
      console.error("Error fetching Twitch stauts", err);
      return {error: "Unable to fetch status"};
    }
  }
};

const liveStatus = await fetchLiveStatus(USERNAME);

return {
  statusCode: 200,
  body: JSON.stringify(liveStatus)
};
