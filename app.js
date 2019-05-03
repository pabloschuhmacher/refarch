var express = require('express'),
    app     = express(),
    swig    = require('swig'),
    fs      = require('fs'),
    server;

// Template Engine Setup
// Swig will cache templates for you, so
// disable Express's caching
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.set('view cache', false);

// Routes
app.get('/', function (req, res) {
  var vcap_app = JSON.parse(process.env.VCAP_APPLICATION);
  res.render('index', {
    activePage: 'hello',
    name: vcap_app.application_name,
    host: process.env.CF_INSTANCE_IP,
    port: process.env.PORT,
    index: process.env.CF_INSTANCE_INDEX
  });
});

app.get('/tour', function (req, res) {
  res.render('tour', {
    activePage: 'tour'
  });
});

app.get('/crash', function () {
  fs.readFile('somefile.txt', function (err, data) {
    if (err) throw err;
    console.log(data);
  });
});




// Fire it up
server = app.listen(process.env.PORT || 3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('ExpressApp listening at http://%s:%s', host, port);

});
