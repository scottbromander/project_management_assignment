var express = require('express');
var app = express();
var path = require('path');
var employee = require('./modules/employeeGenerate');

app.set('port', (process.env.PORT || 5000));

app.get('/generateEmployee', function(req, res, next){
    res.send(employee());
});

app.get("/*", function(request,response){
    var file = request.params[0] || "index.html";
    response.sendFile(path.join(__dirname, "./public/", file));
});

app.listen(app.get("port"));