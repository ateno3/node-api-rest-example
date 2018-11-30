var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override"),
    mongoose = require("mongoose");

//Connect to DB
mongoose.connect('mongodb://127.0.0.1:27017/tvshows',{useNewUrlParser: true});


//Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

//Import Model and Controller
var models = require('./models/tvshow');
var TVShowCtrl = require('./controllers/tvshows');

//Example router
var router = express.Router();

router.get('/', function(req,res){
    res.send("Hello World!!!");
});

app.use(router);

//API routes
var tvshows = express.Router();tvshows.route('/tvshows')
    .get(TVShowCtrl.findAllTVShows)
    .post(TVShowCtrl.addTVShow);

tvshows.route('/tvshows/:id')
    .get(TVShowCtrl.findById)
    .put(TVShowCtrl.updateTVShow)
    .delete(TVShowCtrl.deleteTVShow);

app.use(tvshows);


app.listen(3000,function(){
    console.log("Node server is running on http://localhost:3000/");
});