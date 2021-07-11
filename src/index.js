const Client = require("./structures/Client");
const config = require("../config");

const client = new Client(config);

(async () => {
  await client.login();
})();
