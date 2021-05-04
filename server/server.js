const express = require('express');
const app = express();
const mongoose = require('mongoose');
var cors = require('cors')
var bodyParser = require('body-parser')

mongoose.connect(`mongodb+srv://172839:123456qwerty@cluster0.aiudb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,{
     //useMongoClient:true,
    useUnifiedTopology: true,
    useNewUrlParser: true
})

app.use(cors())
app.use(bodyParser.json())


app.post('/create-structur', require('./router/construct-item'));

app.delete('/delete-item', require('./router/delete-item'));

app.get('/data-menu', require('./router/data-menu'));

app.get('/', (req, res) => {
    
    res.send('oks')
});

app.listen(3007);