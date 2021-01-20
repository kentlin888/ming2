const express = require('express')
const app = express();
const port = 3000;
const ip = "127.0.0.1"
//http://localhost:3000/
// app.get('/', (req, res, next) => {
//     res.send('HHHHHHHHH')
// })
//app.use(express.logger());

let path = require('path')
let pathPagesIndex = path.join(__dirname, 'public', 'ming2', 'pages', 'index') //'index.bundle.htm'
let pathPublic = path.join(__dirname, 'public', 'ming2')
app.use(express.static(pathPublic));
app.get('/', function (req, res) {
    res.sendFile('index.bundle.htm', {
        root: pathPagesIndex
    });
});
// app.get('/', function(req, res){
//     res.redirect('/default.html');
// });

//app.use('/', express.static('./public/ming2'));
let server = app.listen(port,ip, () => {
    
    console.log('start app on ', `http://${server.address().address}:${server.address().port}`)

})

// var options = {
//     index: "coming-soon.html"
// };

// app.use('/', express.static('app', options));
// var server = app.listen(8081, function () {
//     var host = server.address().address;
//     var port = server.address().port;
//     console.log('my app is listening at http://%s:%s', host, port);
// });