const mongoose = require("mongoose");
const { MONGODB_URL } = require("../../../config");

module.exports = async () => {
  await mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  return mongoose;
};
