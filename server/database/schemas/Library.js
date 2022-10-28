const mongoose = require('mongoose');
// Library Schema
const librarySchema = new mongoose.Schema({
  owner: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true
  },
  purchasedSongs: {
    type: [mongoose.SchemaTypes.ObjectId],
    required: true
  }
});

module.exports = mongoose.model('Library', librarySchema);
