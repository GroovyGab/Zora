/* eslint-disable no-unused-vars */
const { MessageEmbed } = require("discord.js");
const { Command, CommandoMessage } = require("discord.js-commando");
const weather = require("weather-js");

module.exports = class WeatherCommand extends Command {
  constructor(client) {
    super(client, {
      name: "weather",
      memberName: "weather",
      group: "tools",
      description: "Get the local forecast for any location",
      clientPermissions: []
    });
  }

  /**
   * @param {CommandoMessage} message
   * @param {String} args
   */

  async run(message, args) {
    this.client.statcord.postCommand(this.name, message.author.id, this.client);
    if (!args.length) return;
    weather.find({ search: args, degreeType: "C" }, (err, result) => {
      if (err) {
        return message.channel.send(
          "Cannot get the weather forecast for that location."
        );
      }
    });
  }
};
