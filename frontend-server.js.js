var fs = require('fs'),
    http = require('http');

const CACHE_TIME = 20 * 1000

const cacheTime = {}
const cache = {}


cache['/index.html'] = fs.readFileSync('./build/index.html', 'utf8')
cacheTime['/index.html'] = CACHE_TIME


// setInterval(() => {
//     console.log(cache)
//     console.log(cacheTime)
// }, 2000)


setInterval(() => {
    for (key in cacheTime) {
        cacheTime[key] = cacheTime[key] - 1000

        if (cacheTime[key] < 0) {
            cache[key] = null
            cacheTime[key] = -1
        }
        if (cacheTime['/index.html'] < 0) {
            cache['/index.html'] = fs.readFileSync('./build/index.html', 'utf8')
            cacheTime['/index.html'] = CACHE_TIME
        }

    }
}, 1000)


http.createServer(function (req, res) {
    console.log(req.url, cacheTime[req.url])
    if (cache[req.url]) {
        res.writeHead(200);
        res.end(cache[req.url]);
        return
    }
    fs.readFile(__dirname + '/build' + req.url, function (err, data) {
        if (err) {
            res.end(cache['/index.html'])
            return;
        }
        res.writeHead(200);
        res.end(data);

        cache[req.url] = data
        cacheTime[req.url] = CACHE_TIME

    });

}).listen(60001);


