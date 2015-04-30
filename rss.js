
  var fs         = require('fs');
  var http       = require('http');
  var dispatcher = require('httpdispatcher');

  var port = 1337;

  function getFeed(){
    return fs.readFileSync("./rss.xml", "utf8");
  }

  dispatcher.onGet("/monitor", function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(getFeed());
  });

  function handleRequest(req, res){
    try {
      //console.log(req.url);
      dispatcher.dispatch(req, res);
    } catch(err){
      console.log(err);
    }
  }

  var server = http.createServer(handleRequest);
  server.listen(port, function(){
    console.log("Server listening on port "+ port);
  });
