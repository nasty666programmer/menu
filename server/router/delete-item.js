const constructShema = require('../models/constructItems');

const deleteChildren = (item,id) => {
    
        item.children.map(element => {
            if(element._id == id) {
                console.log('delete child');
                console.log(element.key);
                // constructShema.findOne({_id:id},function (err,actions) {   
                //     console.log(actions)
                // })
                constructShema.updateOne({_id: id},{$pull: {children:{}}},function(err,res){
                    console.log(`delet`,res)
                })
                // constructShema.remove({_id:element.id});
                    // constructShema.findByIdAndRemove(element._id,function (err,res) {
                    //     console.log(res)
                    // })
                // constructShema.deleteOne({_id:element.id});
            }else {
                deleteChildren(element)
            }
        })
}

const deleteItems = (req,res,item) => {
    console.log('delete items')
    let id = req.body.id;
    console.log(req.body.id)
    constructShema.findOne({},function (err,action) {
        console.log('id remove success');
        if (action._id == req.body.id) {
            action.remove()
        }else {
        action.children.map(element => {
            if(element._id == req.body.id) {
                constructShema.remove({_id:element.id},function (err,res){
                    if(err) throw err;
                })
            }else {
                deleteChildren(element,id)
            }
        })
    }
        // console.log(constructShema.children)
    })
}

module.exports = deleteItems