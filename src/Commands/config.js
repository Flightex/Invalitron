module.exports = {
	name: 'config',
	permissions: {
		user: "MANAGE_SERVER",
		bot: "EMBED_LINKS"
	},
	async execute(interaction, client, Discord, db, config, fs, humanizeDuration) {
    let member = await client.guilds.cache.get(interaction.guild_id).members.fetch(interaction.member.user.id)
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
    let d = await db.get(`${interaction.guild_id}`)
    if (d == undefined || d == null) {
        let embed = require("../Functions/error.js").botError("Scanning Not Activated", "Scanning has either been de-activated or has not been configured.  Please run the scanner command to enable it.")
      client.api.interactions(interaction.id)(interaction.token).callback.post({
				data: {
					type: 4,
					data: {
						embeds: [embed]
					}
				}
			})
    }
		let subCommand = interaction.data.options[0].name
    if (subCommand == "regex") {
      
    }
	},
};