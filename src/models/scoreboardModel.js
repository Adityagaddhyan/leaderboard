const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const scoreboardSchema = new Schema({
  player: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  gameID: {
    type: Number,
    required: true,
  },
  wins:{
      type:Number,
      default:0
  },
  score:{
    type:Number,
    default:0
  }
});
module.exports=mongoose.model("scoreboard",scoreboardSchema);
