const { text } = require('express');
const mongoose = require('mongoose');

// define a schema that maps to the structure of the data in MongoDB
const playSchema = new mongoose.Schema({
    id: String,
    filename: String,
    title: String,
    likelyDate: Number,
    genre: String,
    wiki: String,
    gutenburg: String,
    shakespeareOrg: String,
    desc: String,
    playText: {
        title: String,
        short: String,
        persona: Array,
        acts: Array
    }
});


module.exports = mongoose.model('Play', playSchema, 'plays');
