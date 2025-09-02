const SUsers = ["twistedtxx", "angelicdemon325", "plaguedemonn", "step_milkman", "allmondmlk", "rocka_timez", "0wabi0", "callzack", "slouchyharbor", "iiplaguedoctress", "the_hunter146", "starfirexox420_ttv", "duhkoterz", "itsbenzo_", "quek1tty", "bindbleed"];
const nSUsers = ["zahra33op", "beeleavee", "caitlinharrisonx", "exiledxiv", "cozzslaps", "sugardaddywes"];

const nicknames = {
  "angelicdemon325": "Angel",
  "twistedtxx": "Twisted",
  "step_milkman": "Milk",
  "allmondmlk": "Almond",
  "plaguedemonn": "Plague",
  "bindbleed": "Bind",
  "rocka_timez": "Rocka",
  "0wabi0": "Wabi",
  "callzack": "Zack",
  "itsbenzo_": "Benzo",
  "quek1tty": "Kitty",
  "beeleavee": "Bee",
  "caitlinharrisonx": "Caitlin",
  "exiledxiv": "Exi",
  "zahra33op": "My Brother",
  "slouchyharbor": "Slouchy",
  "starfirexox420_ttv": "Star",
  "duhkoterz": "Koterz",
  "cozzslaps": "Cozz",
  "sugardaddywes": "Wes",
  "the_hunter146": "Hunter",
  "iiplaguedoctress": "Plaguess"
};

const exceptUsers = {
  "cozzslaps": "https://cdn.discordapp.com/avatars/1172873389514432562/09cb2ec45b49f6e7f44d9d41259f9849.webp?size=512"
};

export async function handler(event) {
  const CLIENT_ID = process.env.TWITCH_CLIENT_ID;
  const CLIENT_SECRET = process.env.TWITCH_CLIENT_SECRET;

  const tokenRes = await fetch(
    `https://id.twitch.tv/oauth2/token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&grant_type=client_credentials`,
    { method: "POST" }
  );
  const tokenData = await tokenRes.json();
  const accessToken = tokenData.access_token;

  const fetchUsers = async (users, streamer) => {
    const results = [];
    for (const user of users) {
      try {
        const res = await fetch(`https://api.twitch.tv/helix/users?login=${user}`, {
          headers: {
            "Client-ID": CLIENT_ID,
            "Authorization": `Bearer ${accessToken}`
          }
        });
        const data = await res.json();
        if (data.data && data.data[0]) {
          const u = data.data[0];
          results.push({
            login: u.login,
            display_name: u.display_name,
            profile_image_url: exceptUsers[user] || u.profile_image_url,
            nickname: nicknames[user] || null,
            isStreamer: streamer
          });
        }
      } catch (err) {
        console.error(`Error fetching ${user}:`, err);
      }
    }
    return results;
  };

  const streamerData = await fetchUsers(SUsers, true);
  const nonStreamerData = await fetchUsers(nSUsers, false);

  return {
    statusCode: 200,
    body: JSON.stringify({
      streamers: streamerData,
      nonStreamers: nonStreamerData
    })
  };
}