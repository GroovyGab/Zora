const Event = require("../structures/Event");

module.exports = class extends Event {
  constructor(...args) {
    super(...args, {
      once: false
    });
  }

  run() {
    this.client.user.setActivity("el iñaki es gay");
    console.log(
      `Client ready; logged in as ${this.client.user.username}#${this.client.user.discriminator} (${this.client.user.id})`
    );
  }
};
