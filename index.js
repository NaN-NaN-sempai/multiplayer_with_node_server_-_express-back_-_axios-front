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
    serverData.players.find(e=>e.id == reqPlayer.id).pos = reqPlayer.pos;

    console.log("updated: "+reqPlayer.id);
    res.end()
})

app.listen(port, () => {
  console.log(`Server Started`)
})