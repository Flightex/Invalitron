exports.botError = async (errorShort, error) => {
  let embed = {
    color: 15158332,
    description: `**Error — ${errorShort}**\n\nThe following error has occured:\n\`\`\`${error}\`\`\`\n\nPlease fix this before continuing.\n\nIf you believe this is an error, please [join our support server](https://discord.gg/7va3rtC) and report this.`,
    footer: {
      text: `Triggered by ${user.username}#${user.tag}`,
      icon_url: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar.replace("a_", "")}/${((user.avatar.startsWith("a_")) ? ".gif" : ".png")}`
    }
  }
  return embed;
}