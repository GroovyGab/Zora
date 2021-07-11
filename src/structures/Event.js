/* eslint-disable no-unused-vars */
const { CommandoClient } = require("discord.js-commando");

module.exports = class Event {
  constructor(client, name, options = {}) {
    /**
     * @type {String}
     */
    this.name = name;
    /**
     * @type {CommandoClient}
     */
    this.client = client;
    /**
     * @type {boolean}
     */
    this.type = options.once ? "once" : "on";
    this.emitter =
      (typeof options.emitter === "string"
        ? this.client[options.emitter]
        : options.emitter) || this.client;
  }

  // eslint-disable-next-line no-unused-vars
  async run(...args) {
    throw new Error(`The run method has not been implemented in ${this.name}.`);
  }
};
