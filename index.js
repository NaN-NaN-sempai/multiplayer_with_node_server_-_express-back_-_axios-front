const express = require('express')
var bodyParser = require('body-parser');
const app = express()
const port = 8080

app.use(bodyParser.json())


app.get('/', function(req, res) {
    res.sendfile("index.html");
});


var cnt = 0;
        
//no frontend, pra receber dados do backend
//serverGet('/hee', 'get',  function(obj) { console.log(obj.responseText)})
app.get('/hee', function(req, res){
    res.json(cnt);
});

//no frontend, para enviar dados ao backend zx
/*axios({
    method: 'post',
    url: '/hu',
    data: {
        tet: 'Finn',
        lastName: 'Williams'
    }
}); */
app.post('/hu', (req, res)=> {
    // req.body.fileName
    cnt++;
    console.log(req.body);
    res.get("/")
})

app.listen(port, () => {
  console.log(`Server Started`)
})