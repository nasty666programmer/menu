const constructShema = require('../models/constructItems');


const dataReturn = (req,res) => {
     constructShema.find({}).then(dataItem => res.send(dataItem));
}

module.exports = dataReturn;