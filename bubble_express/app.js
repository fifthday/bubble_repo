
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , bubble = require('./routes/bubble')
  , other = require('./routes/other')
  , user = require('./routes/user')
  , status = require('./routes/status')
  , http = require('http')
  , path = require('path');


var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 8011);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/tiy', other.tiy);
app.get('/trysina', other.trysina)

app.all('/1/user/sina_login', user.sina_login);
app.all('/1/bubble/take_bids', bubble.take_bids);
app.all('/1/bubble/take', bubble.take);
app.all('/1/bubble/put', bubble.put);
app.all('/1/bubble/search', bubble.search);
app.all('/1/bubble/take_rank', bubble.take_rank);
app.all('/1/bubble/take_hot_tweets', bubble.take_hot_tweets);
app.all('/1/bubble/like', bubble.like);
app.all('/1/bubble/like_count', bubble.like_count);
app.all('/1/status/hot_tweets', status.hot_tweets);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
