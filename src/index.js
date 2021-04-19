const Discord = require('discord.js');
const config = require("./config.js");
const client = new Discord.Client();
const {
	exec
} = require("child_process");
const fs = require('fs');
const humanizeDuration = require('humanize-duration')
client.commands = new Discord.Collection();
const {
	UniqueID
} = require('nodejs-snowflake');
const snowflake = new UniqueID({
	customEpoch: config.snowflakeObject.epoch,
});
const Database = require("@replit/database")
const db = new Database()
const fetch = require('node-fetch')

const commandFiles = fs.readdirSync('./Commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./Commands/${file}`);
	client.commands.set(command.name, command);
}

client
	.on("debug", console.log)
	.on("warn", console.log)

client.on("ready", async () => {
  let b = /*{
  "name": "config",
  "description": "Set the config values for this scanner",
  "options": [
    {
      "type": 1,
      "name": "regex",
      "description": "Regex for scanning",
      "options": [
        {
          "type": 3,
          "name": "value",
          "description": "Regex value",
          "default": false,
          "required": true
        }
      ]
    },
    {
      "type": 1,
      "name": "delete",
      "description": "Delete token if found",
      "options": [
        {
          "type": 5,
          "name": "value",
          "description": "Whether to delete the token if found",
          "default": false,
          "required": true
        }
      ]
    },
    {
      "type": 1,
      "name": "alert",
      "description": "Alert's the poster if their token was found",
      "options": [
        {
          "type": 5,
          "name": "value",
          "description": "Whether or not to alert the posting user their token was found",
          "default": false,
          "required": true
        }
      ]
    }
  ]
  };
  fetch(`https://discord.com/api/applications/${client.user.id}/commands`, {
				method: 'post',
				body: JSON.stringify(b),
				headers: {
					Authorization: "Bot " + client.token, //API key here
					'Content-Type': 'application/json'
				},
			}).then(res => res.json()).then(a => console.log(a))*/
	client.user.setStatus(config.presence.status)
	setInterval(async () => {
		const statuslist = config.presence.activities
		const random = Math.floor(Math.random() * statuslist.length);

		try {
			client.user.setPresence({
				activity: {
					name: `${statuslist[random].name}`,
					type: `${statuslist[random].type}`,
					url: `${statuslist[random].link}`
				}
			});
		} catch (error) {
			console.error(error);
		}

	}, 45000);
});


client.ws.on('INTERACTION_CREATE', async interaction => {
	const command = interaction.data.name
	if (!client.commands.has(command)) return;
	try {
		client.commands.get(command).execute(interaction, client, Discord, db, config, fs, humanizeDuration);
	} catch (error) {
		console.error(error)
		client.api.interactions(interaction.id)(interaction.token).callback.post({
			data: {
				type: 4,
				data: {
					content: `<@${interaction.member.user.id}>, there has been an error at this time.  Please try again later.\n\n**Error Sequence:**\n\`\`\`JS\n${error}\n\`\`\``,
					flags: 64
				}
			}
		})
		return;
	}
})

client.on("message", async (message) => {
  //message event stuff
});

client.login(config.token).catch(console.error)