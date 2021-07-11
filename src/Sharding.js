const { ShardingManager } = require("discord.js");
const { TOKEN } = require("../config");
const path = require("path");
const manager = new ShardingManager(path.join(`${__dirname}/bot.js`), {
  token: TOKEN
});

manager.on("shardCreate", (shard) => console.log(`Launched shard ${shard.id}`));
manager.spawn();
