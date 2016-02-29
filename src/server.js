var express = require('express');
var bodyParser = require('body-parser');
var _ = require('lodash');
var httpProxy = require('http-proxy');

var proxy = httpProxy.createProxyServer();

var app = express();

var todos = [];

app.use(express.static('.'));
app.use(bodyParser.json());
app.use(bodyParser.text());

app.route('/todo')
    .get((req, res) => {
        console.log(JSON.stringify(todos));
        res.send(todos);
    })
    .put((req, res) => {
        var json = req.body;
        var toggled = _.find(todos, (todo) => todo.id == json.id);
        toggled.completed = !toggled.completed;
        console.log(JSON.stringify(todos));
        res.send();
    })
    .delete((req,res) => {
        console.log('removing todo with id = ' + req.query.id);
        todos = _.remove(todos,(todo) => todo.id != req.query.id );
        console.log(JSON.stringify(todos));
        res.send();
    })
    .post((req, res) => {
        todos.push(req.body);
        console.log(JSON.stringify(todos));
        setTimeout(() => res.send(), 1000);
    });

app.all('/bundle.js', function (req, res) {
    proxy.web(req, res, {
        target: 'http://localhost:8081'
    });
});

var server = app.listen(8080, function() {
    console.log("Server running at http://localhost:" + server.address().port);
});