# Simple Site Monitor Tool
Program to check if a series sites are up and displaying properly plus a small server to serve an RSS feed of any issues found. Feed can be subscribed to using any RSS reader or with something like [Boxcar](https://boxcar.io/) for push notification.

## sites.json
This is where you define the site title, site URL and some text to check if the site is displaying properly. It's an array of objects.
```
[
  {
    "title"  : "My Website",
    "url"    : "http://<site_domain_or_ip>/",
    "phrase" : "text to look for"
  },
  {
    "title"  : "Another Website",
    "url"    : "http://<site_domain_or_ip>/",
    "phrase" : "text to look for"
  }
]

```

## Cron

In your crontab enter the following to run every 30 minutes, change as you see fit.
```
0,30 * * * * /path/to/node/binary /path/to/app.js
```

## RSS feed
The feed is generated by `app.js` if any issues are found and written out to `rss.xml`. You can serve this file any way you wish, or use the included `rss.js` to create a simple server.

### PM2
Included is a 'processes.json' file to quickly get the RSS server up and running with PM2.


## Files
| File | Notes |
| ---- | ----- |
| app.js | Program to run every x minutes to check sites via cron |
| rss.js | Simple RSS feed generator and server |
| sites.json | Details of sites to check |
| rss.xml | This is the file generated by app.js |
| package.json | Configuration for NodeJS/io.js/npm |
| processes.json | Configuration for PM2 (pm2 start processes.json) |
| Gruntfile.js | Configuration file for Grunt (if needed) |
| .gitignore | Tells Git what files and folders to ignore |
| .gitattributes | Sets some git env stuff |