export async function handler(event) {
  const CLIENT_ID = process.env.TWITCH_CLIENT_ID;
  const CLIENT_SECRET = process.env.TWITCH_CLIENT_SECRET;
  const USERNAME = "ghxstak";

  try {
    const tokenRes = await fetch(
      `https://id.twitch.tv/oauth2/token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&grant_type=client_credentials`,
      { method: "POST" }
    );
    const tokenData = await tokenRes.json();
    console.log("Token response:", tokenData);
    const accessToken = tokenData.access_token;
    if (!accessToken) throw new Error("No access token returned from Twitch");

    const userRes = await fetch(`https://api.twitch.tv/helix/users?login=${user}`, {
      headers: {
        "Client-ID": CLIENT_ID,
        "Authorization": `Bearer ${accessToken}`
      }
    });

    const userData = await userRes.json();
    const u = userData.data[0];
    console.log("User response:", userData);
    if (!userData.data || userData.data.length === 0) {
      throw new Error("No user data found");
    }

    const streamRes = await fetch(`https://api.twitch.tv/helix/streams?user_login=${user}`, {
      headers: {
        "Client-ID": CLIENT_ID,
        "Authorization": `Bearer ${accessToken}`
      }
    });
    const streamData = await streamRes.json();
    console.log("Stream response:", streamData);

    return {
      statusCode: 200,
      body: JSON.stringify({
        login: u.login,
        display_name: u.display_name,
        isLive: streamData.data && streamData.data.length > 0,
      })
    };

  } catch(err){
      console.error("Error fetching Twitch stauts", err);
      return {
      statusCode: 500,
      body: JSON.stringify({ error: "Unable to fetch Twitch status" })
      };
  }
}