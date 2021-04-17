module.exports = {
	name: 'scanner',
	permissions: {
		user: "MANAGE_SERVER",
		bot: "EMBED_LINKS"
	},
	async execute(interaction, client, Discord, db, config, fs, humanizeDuration) {
    let member = client.guilds.cache.get(interaction.guild_id).member(interaction.user.id)
    if (!member.hasPermission("MANAGE_GUILD")) {
      let embed = require("../Functions/permissionError.js").user(interaction, "Manage Server")
      client.api.interactions(interaction.id)(interaction.token).callback.post({
				data: {
					type: 4,
					data: {
						embeds: [embed]
					}
				}
			})
    }
		let value = interaction.data.options[0].value
		let regex = interaction.data.options[1]
		let check = await db.get(`${interaction.guild_id}`)
		if (check == undefined || check == null) {
			let data = {
				scanning: (value == "on") ? true : false,
				regex: (regex == undefined) ? require("../config.js").constants.scanRegex : interaction.data.options[1].value
			}
			await db.set(`${interaction.guild_id}`, data)
			let embed = new Discord.MessageEmbed()
				.setColor(`GREEN`)
				.setDescription(`Scanner successfully ${((value == "on") ? "**activated**" : "**deactivated**")}!`)
			client.api.interactions(interaction.id)(interaction.token).callback.post({
				data: {
					type: 4,
					data: {
						embeds: [embed]
					}
				}
			})
		} else {
			if (value.replace("on", true).replace("off", true) == check.scanning) {
				let embed = new Discord.MessageEmbed()
					.setColor(`RED`)
					.setDescription(`The scanner is already ${((value == "on") ? "**activated**" : "**deactivated**")}!`)
				client.api.interactions(interaction.id)(interaction.token).callback.post({
					data: {
						type: 4,
						data: {
							embeds: [embed]
						}
					}
				})
			} else {
        let data = {
					scanning: (value == "on") ? true : false,
					regex: (regex == undefined) ? require("../config.js").constants.scanRegex : interaction.data.options[1].value
				}
				await db.set(`${interaction.guild_id}`, data)
				let embed = new Discord.MessageEmbed()
					.setColor(`GREEN`)
					.setDescription(`Scanner successfully ${((value == "on") ? "**activated**" : "**deactivated**")}!`)
				client.api.interactions(interaction.id)(interaction.token).callback.post({
					data: {
						type: 4,
						data: {
							embeds: [embed]
						}
					}
				})
			}
		}
	},
};