const Event = require("../structures/Event");

module.exports = class extends Event {
  constructor(...args) {
    super(...args, {
      once: false
    });
  }

  run(error) {
    console.log(error);
  }
};
