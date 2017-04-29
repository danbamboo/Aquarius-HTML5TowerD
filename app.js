var express = require('express');
var app = express();
var path = require("path");

//WILL NEED TO MANUALLY ASSIGN PORT ON EC2
var port = process.env.PORT; //Use for could9 autoassign port

 app.use(express.static('hellophaser'));  //Where express checks for content
// app.use(express.static('src/views'));  //Second static dir 
// app.use(express.static('bower_components'));


// app.set('views', './src/views');
// app.set('view engine', 'ejs');


//DEMO HOW TO ADD SOME JSON WITH  ROUTE
// app.get('/', function(req, res){ 
//    //res.send(index.html);
//    res.render('index', { 
//        list: ['frist val', '2nd val', '3rd val'], 
//        nav: [
//             {Link: 'Services', Text: 'Services'},
//             {Link: 'Portfolio', Text: 'Portfolio'},
//             {Link: 'About', Text: 'About'},
//             {Link: 'Team', Text: 'Team'},
//             {Link: 'Contact', Text: 'Contact'}]
//    });
// });

app.get('/', function(req, res){
   res.sendFile(path.join(__dirname+'/hellophaser/index.html')); 
});

app.listen(port, function(err){
    console.log("The server is running on port: " + port);
});

