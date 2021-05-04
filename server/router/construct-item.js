const { Mongoose } = require('mongoose');
const constructItems = require('../models/constructItems');
const constructShema = require('../models/constructItems');


const handler = (req,res) => {
    const data = req.body.data;
    console.log(data)
            data.map(element => {
                constructShema.deleteMany({},function(err,res) {
                    console.log(res)
                })          
                const constShem = new constructShema({
                    title:element.title,
                    key:element.key,
                    children:element.children || []
                });
                constShem.save();
            });
}

module.exports = handler;