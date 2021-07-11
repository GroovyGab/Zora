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
    if (!args.length) return;
    weather.find({ search: args, degreeType: "C" }, (err, result) => {
      if (err) {
        return message.channel.send(
          "Cannot get the weather forecast for that location."
        );
      }

      const currentDate = new Date(
        `${result[0].current.date} ${result[0].current.observationtime}`
      );

      const weatherEmbed = new MessageEmbed()
        .setTitle(`Reporte del clima de ${result[0].location.name}`)
        .setThumbnail(result[0].current.imageUrl)
        .addFields(
          {
            name: "☁ Clima",
            value: `**Temperatura:** ${result[0].current.temperature}ºC\n**Se siente como:** ${result[0].current.feelslike}ºC\n**Humedad:** ${result[0].current.humidity}%\n**Viento:** ${result[0].current.windspeed}`,
            inline: true
          },
          {
            name: "🕑 Tiempo",
            value: `**Fecha:** ${currentDate.getDate()}/${currentDate.getMonth()}/${currentDate.getFullYear()}\n**Hora local:** `,
            inline: true
          }
        );

      message.channel.send(weatherEmbed);
    });
  }
};
