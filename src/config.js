module.exports = {
  token: process.env.TOKEN,
  constants: {
    scanRegex: /[MNO][A-Za-z\d]{23}\.[\w-]{6}\.[\w-]{27}/
  },
  snowflakeObject: {
    epoch: 1609459200000
  },
  developers: ["437019658374348801"],
  presence: {
    status: "online",
    activities: [
      {
        name: "for tokens",
        type: "WATCHING",
        link: "https://twitch.tv/discord"
      },
      {
        name: "over developers",
        type: "WATCHING",
        link: "https://twitch.tv/discord"
      }
    ]
  },
};