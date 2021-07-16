const Event = require("../structures/Event");
const pool = require("../database/postgres/driver");
const chalk = require("chalk");

module.exports = class extends Event {
  constructor(...args) {
    super(...args, {
      once: false
    });
  }

  async run() {
    pool.query(
      `SELECT bot_status FROM Bot WHERE bot_id = '${this.client.user.id}'`,
      (err, res) => {
        console.log(res.rows[0].bot_status);
        pool.end();
      }
    );

    this.client.user.setActivity(
      "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    );

    this.client.statcord.autopost();

    console.log(
      `${chalk.bold.green("[BOT]")} Client ready; logged in as ${
        this.client.user.username
      }#${this.client.user.discriminator} (${this.client.user.id})`
    );
  }
};
