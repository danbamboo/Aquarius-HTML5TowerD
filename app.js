var express = require('express');
var app = express();
var path = require("path");

var sitePath = process.argv[2] || ".";

//WILL NEED TO MANUALLY ASSIGN PORT ON EC2
var port = process.env.PORT; //Use for could9 autoassign port

//Where express checks for content
app.use(express.static(__dirname + '/js'));
app.use(express.static(__dirname + '/assets'));
app.use(express.static(__dirname + '/Spritesheets'));


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
   res.sendFile(path.join(__dirname+'/SpacePirateTowerD.html')); 
});

//For use on node server
// app.listen(3000, function(err){
//     console.log("The server is running on port: " + 3000);
// });

//For use with Cloud9 Testing
app.listen(port, function(err){
    console.log("The server is running on port: " + port);
});

