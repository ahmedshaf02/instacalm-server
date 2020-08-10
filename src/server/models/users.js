const mongo = require("mongoose");
const { ObjectId } = mongo.Schema.Types;
const userSchema = new mongo.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: "https://cdn.onlinewebfonts.com/svg/img_243887.png"
  },
  password: {
    type: String,
    required: true
  },
  follower: [{ type: ObjectId, ref: "User" }],
  following: [{ type: ObjectId, ref: "User" }]
});

module.exports = mongo.model("User", userSchema);
