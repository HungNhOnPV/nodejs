require('dotenv').config();
// console.log(process.env.SESSION_SECRET);

var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var csurf = require('csurf');

var userRoute = require('./routes/user.routes');
var authRoute = require('./routes/auth.routes');
var productRoute = require('./routes/product.routes');
var cartRoute = require('./routes/cart.routes');
var transferRouter = require('./routes/transfer.routes');

var authMiddleware = require('./middleware/auth.middleware');
var sessionMiddleware = require('./middleware/session.middleware');

var port = 3000;

var app = express();
app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(sessionMiddleware);
app.use(csurf({ cookie:true }));

app.use(express.static('public'));

app.get('/', function(req, res) {
	res.render('index', {
		name:'Phạm Việt Hưng'
	});
});

app.use('/users',authMiddleware.requireAuth, userRoute);
app.use('/auth', authRoute);
app.use('/products', productRoute);
app.use('/cart', cartRoute);
app.use('/transfer',authMiddleware.requireAuth, transferRouter);

app.listen(port, function() {
	console.log('Server listening on port ' + port);
});