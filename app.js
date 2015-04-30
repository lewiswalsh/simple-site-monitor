
  var fs      = require('fs');
  var request = require('request');
  var RSS     = require('rss');
  var cuid    = require('cuid');
  var sites   = require(__dirname +'/sites.json');

  var results    = [];

  var feed = new RSS({
    title       : 'Simple Site Monitor',
    description : 'Website availability test tool results',
    feed_url    : 'http://<my_domain_or_ip>:<my_port>/monitor',
    site_url    : 'http://<my_site>/'
  });

  function checkSite(site, index){
    request(site.url, function(err, res, body){
      var result = {
        title : site.title,
        url   : site.url
      }
      if(err){
        result.status = 503;
        result.error  = err.code;
      } else {
        result.status         = res.statusCode;
        result.phrase_present = (body.toLowerCase().indexOf(site.phrase.toLowerCase()) > -1 ? true : false);
      }
      results.push(result);
      if((sites.length - 1) === index){
        sitesParsed();
      }
    });
  }

  function sitesParsed(){
    var any_errors = false;
    results.forEach(function(res){
      if(res.status !== 200 || !res.phrase_present){
        any_errors = true;
        var problem;
        if(res.status !== 200){
          problem = 'Status not 200 - '+ res.status +' - '+ res.error;
        } else if(!res.phrase_present){
          problem = '200 OK but content not found';
        }
        feed.item({
            title       : res.title,
            description : problem,
            url         : res.url,
            guid        : cuid.slug(),
            date        : (new Date()).toUTCString()
        });
      }
      if(any_errors){
        fs.writeFile(__dirname +'/rss.xml', feed.xml());
      }
    });
  }

  sites.forEach(checkSite);
