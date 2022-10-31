const mongoose = require("mongoose");

const librarySchema = new mongoose.Schema({
  owner: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
  purchasedSongs: {
    type: [mongoose.SchemaTypes.ObjectId],
    required: true,
  },
});

module.exports = mongoose.model("Library", librarySchema);
