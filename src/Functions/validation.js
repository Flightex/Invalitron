let fetch = require("node-fetch");

exports.bot = async (token) => {
  let f = await fetch("https://discord.com/api/gateway/bot", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bot " + client.token
    }
  });
  let status = await f.status;
  if (status == 401) { 
    return false;
  } else if (status == 200) { 
    return true;
  } else { 
    return false;
  }
};

exports.user = async (token) => {
  let f = await fetch("https://discord.com/api/gateway/bot", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": client.token
    }
  });
  let status = await f.status;
  if (status == 401) { 
    return false;
  } else if (status == 200) { 
    return true;
  } else { 
    return false;
  }
};