const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const gameSchema = new Schema({
  gameID: {
    type: Number,
    index: true,
    required: true,
  },
  resultDeclared: {
    type: Boolean,
    default: false,
    required: true,
  },
  player1_ID: {
    type: Schema.Types.ObjectID,
    ref: "users",
  },
  player2_ID: {
    type: Schema.Types.ObjectID,
    ref: "users",
  },
  player1_score: {
    type: Number,
    required: true,
  },
  player2_score: {
    type: Number,
    required: true,
  },
  winner: {
    type: Schema.Types.ObjectID,
    ref:"users"
  },
  created: {
    created: { type: Date, default: Date.now },
  },
});

module.exports=mongoose.model("game",gameSchema);