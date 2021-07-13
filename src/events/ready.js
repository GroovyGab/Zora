const Event = require("../structures/Event");
const mongo = require("../database/mongodb/mongo");

module.exports = class extends Event {
  constructor(...args) {
    super(...args, {
      once: false
    });
  }

  async run() {
    await mongo().then((mongoose) => {
      try {
        console.log("[MongoDB] Connected to database.");
      } catch (err) {
        console.log("There was an error with MongoDb", err);
      } finally {
        mongoose.connection.close();
      }
    });

    console.log(
      `Client ready; logged in as ${this.client.user.username}#${this.client.user.discriminator} (${this.client.user.id})`
    );
  }
};
