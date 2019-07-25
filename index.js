const Https = require('https');
var TelegramBot = require('node-telegram-bot-api');
var MongoDB = require('mongodb').MongoClient;

const token = "901936923:AAFGeTaEcZtlhNCpRkJHo4zvORJmo-dHpCM";
const bot = new TelegramBot(token,{polling:true});

const url = 'mongodb://localhost:27017'

MongoDB.connect(url, function (err, db)  {
	var dbo = db.db('test');
	
	dbo.collection('Employers', function(err,collection) {

		dbo.collection('Employers').count(function(err,count) {
			if (err) throw err;
			console.log("totals rows: "+ count);
		});

		dbo.collection('Employers').find({}).toArray(function(err,result){
			if (err) throw err;
			console.log(result);
		});

	});
})