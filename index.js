console.clear();

var express = require('express')
var bodyParser = require('body-parser');
var app = express()

//my custom opened port for my network
var port = 4444

app.use(bodyParser.json())



app.get('/', function(req, res) {
    res.sendfile("index.html");
});

var serverData = {
    serverFPS: 1,
    players: []
}

app.get('/serverData', function(req, res){
    res.json(serverData);
    res.end();
});

app.post('/newPlayer', (req, res)=> {
    var newPlayer = req.body.player;

    serverData.players.push(newPlayer)
    console.log("newPlayer: "+newPlayer.id);
    res.end();
})

app.post('/updatePlayer', (req, res)=> {
    var reqPlayer = req.body.player; 
    serverData.players[serverData.players.find(e=>e.id == reqPlayer.id).index] = reqPlayer;

    console.log("updated: "+reqPlayer.id);
    res.end()
})

app.post('/removePlayer', (req, res)=> {
    var reqPlayer = req.body.player;
    serverData.players.find(e=>e.id == reqPlayer.id).online = false;

    console.log("removed: "+reqPlayer.id);
    res.end()
})

app.listen(port, () => {
    console.log('\x1b[33m%s\x1b[0m', "Server Started.");
    require('dns').lookup(require('os').hostname(), function (err, add, fam) {
        console.log("Ip Link:", '\x1b[36m', 'http://'+ add + ":" + port +"/",'\x1b[0m');
        console.log("Localhost Link:", '\x1b[36m', 'http://localhost:' + port +"/",'\x1b[0m');
    })
})