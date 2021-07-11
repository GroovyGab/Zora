const { Client, SQLiteProvider } = require("discord.js-commando");
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
const path = require("path");
const { Collection, Intents } = require("discord.js");
const ZoraIntents = new Intents();
const Util = require("../util/Util");
const i18n = require("i18n");

ZoraIntents.add(Intents.ALL);

module.exports = class CustomClient extends Client {
  constructor(options = {}) {
    super({
      commandPrefix: options.PREFIX,
      owner: options.OWNER,
      disableMentions: "everyone",
      partials: ["CHANNEL", "GUILD_MEMBER", "MESSAGE", "REACTION", "USER"],
      intents: ZoraIntents
    });

    this.validate(options);

    this.events = new Collection();

    this.utils = new Util(this);

    this.on("error", console.error)
      .on("warn", console.warn)
      .on("debug", console.log);

    i18n.configure({
      locales: ["en_us", "es_es"],
      directory: path.join(__dirname, "../locales"),
      defaultLocale: "en_us",
      objectNotation: true,
      register: global,

      logWarnFn: (msg) => {
        console.log("warn", msg);
      },

      logErrorFn: (msg) => {
        console.log("error", msg);
      },

      missingKeyFn: (locale, value) => {
        return value;
      },

      mustacheConfig: {
        tags: ["{{", "}}"],
        disable: false
      }
    });

    open({
      filename: "./settings.db",
      driver: sqlite3.Database
    })
      .then((db) => {
        this.setProvider(new SQLiteProvider(db)).catch(console.error);
      })
      .catch(console.error);

    this.registry
      .registerGroups([
        ["misc", "Miscellaneous commands."],
        ["tools", "Tools."],
        ["botadmin", "Bot administration commands."]
      ])
      .registerDefaults()
      .registerCommandsIn(path.join(__dirname, "../commands"));
  }

  validate(options) {
    if (typeof options !== "object")
      throw new TypeError("Options must be a type of Object.");
    if (!options.TOKEN)
      throw new Error(
        "A Discord bot Token is required to run this application."
      );
    this.TOKEN = options.TOKEN;
    if (typeof options.TOKEN !== "string")
      throw new TypeError("The Bot token must be a type of String.");
    if (!options.PREFIX)
      throw new Error("Bot prefix misssing from configuration file.");
    this.PREFIX = options.PREFIX;
    if (typeof options.PREFIX !== "string")
      throw new TypeError("The prefix must be a type of String.");
    if (!options.OWNER)
      throw new Error("Bot owner(s) missing from configuration file.");
    if (!Array.isArray(options.OWNER) && typeof options.OWNER !== "string")
      throw new TypeError("The owner must be a type of Array or String.");
  }

  async login(token = this.TOKEN) {
    await super.login(token);
    this.utils.loadEvents();
  }
};
