exports.user = async (user, permission) => {
  let embed = {
    color: 15158332,
    description: `**Missing Permissions — ${permission}**\n\nYou are missing the permission \`${permission}\` and will not be able to execute this command.\n\nIf you believe this is an error, please [join our support server](https://discord.gg/7va3rtC) and report this.`,
    footer: {
      text: `Triggered by ${user.username}#${user.tag}`,
      icon_url: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar.replace("a_", "")}/${((user.avatar.startsWith("a_")) ? ".gif" : ".png")}`
    }
  }
  return embed;
}