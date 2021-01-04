const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ConvoSchema = new Schema({
  fromWhom: {
    type: String,
    required: true,
    enum: ["Practise", "Patient"]
  },
  User: {
    type: Schema.Types.ObjectId,
    refPath: "fromWhom"
  },
  Chats: [{ type: Schema.Types.ObjectId, ref: "Chats" }]
});
const ChatModel = mongoose.model(
  "Chats",
  new Schema({
    fromWhom: Schema.Types.ObjectId,
    message: String,
    readReceipt: { type: Number, enum: [1, 2, 3] },
    timestamp: {
      type: Date,
      default: Date.now()
    }
  })
);
module.exports = {
  Conversation: mongoose.model("Conversations", ConvoSchema),
  Chat: ChatModel
};
