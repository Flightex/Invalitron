module.exports = {
  token: process.env.TOKEN,
  constants: {
    "scanRegex": /[MNO][A-Za-z\d]{23}\.[\w-]{6}\.[\w-]{27}/
  }
};