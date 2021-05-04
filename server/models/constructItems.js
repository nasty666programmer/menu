const mongoose = require('mongoose');

const constructItemShema = mongoose.Schema({
    title:String,
    key:String,
    children:Array
});

module.exports = mongoose.model('constructItems',constructItemShema);