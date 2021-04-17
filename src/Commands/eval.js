const fetch = require("node-fetch");

module.exports = {
	name: 'eval',
	categoryLocked: true,
	threadChannelLocked: true,
	async execute(interaction, client, Discord, db, config, fs, humanizeDuration) {
		let user = await client.users.fetch(interaction.member.user.id)
		if (!config.developers.includes(user.id)) {
      	client.api.interactions(interaction.id)(interaction.token).callback.post({
				data: {
					type: 4,
					data: {
						content: `<@${interaction.member.user.id}>, this command is locked to developers only.`,
						flags: 64
					}
				}
			})
      return;
    } else {
      try {
        code = interaction.data.options[0].value
      let evaled = await eval(code);
			const option = {
				depth: 0
			}
			if (typeof evaled !== 'string') {
				evaled = require('util').inspect(evaled, option);
			}
      let msg = `**Input:**\n\`\`\`JS\n${(interaction.data.options[0].value.length < 1990) ? interaction.data.options[0].value : interaction.data.options[0].value.slice(0, 1990) + "..."}\`\`\`\n\n**Output:**\n\`\`\`JS\n${(evaled.length < 1990) ? evaled : evaled.slice(0, 1990) + "..."}\n\`\`\``
    client.api.interactions(interaction.id)(interaction.token).callback.post({
      data: {
        type: 4,
        data: {
          content: `${msg}`,
          flags: 64
        }
      }
    })
    } catch (error) {
      let msg = `**Input:**\n\`\`\`JS\n${(interaction.data.options[0].value.length < 1990) ? interaction.data.options[0].value : interaction.data.options[0].value.slice(0, 1990) + "..."}\`\`\`\n\n**Error:**\n\`\`\`JS\n${(error.toString().length < 1990) ? error : error.toString().slice(0, 1990) + "..."}\n\`\`\``
    client.api.interactions(interaction.id)(interaction.token).callback.post({
      data: {
        type: 4,
        data: {
          content: `${msg}`,
          flags: 64
        }
      }
    })
    }

    }
	},
};