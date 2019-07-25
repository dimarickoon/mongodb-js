const Https = require('https');
var TelegramBot = require('node-telegram-bot-api');
var MongoDB = require('mongodb').MongoClient;

const token = "901936923:AAFGeTaEcZtlhNCpRkJHo4zvORJmo-dHpCM";
const bot = new TelegramBot(token,{polling:true});

const url = 'mongodb://localhost:27017'

var employes

function update(dbO, callback){
	dbO.collection('Employers').find({}).toArray(function(err,result){
			if (err) throw err;
			employes = result;
			console.log(result);
		});
	callback();
}

function findEmploye(dbO, Ename, callback){
	console.log(Ename);
	var query = { name: Ename};
	dbO.collection('Employers').findOne(query, function(err,result){
			if (err) throw err;
			console.log(result);
			callback(result.name + " " + result.surname);
		});
}

MongoDB.connect(url, function (err, db)  {
	var dbo = db.db('test');
	dbo.collection('Employers', function(err,collection) {
		dbo.collection('Employers').count(function(err,count) {
			if (err) throw err;
			console.log("totals rows: "+ count);
		});

		dbo.collection('Employers').find({}).toArray(function(err,result){
			if (err) throw err;
			employes = result;
			console.log(result);
		});
		bot.onText(/\/add (.+)/, (msg, match) => {
			collection.insertOne({name: match[1], surname: "none"}, (err, result) =>{
				bot.sendMessage(msg.chat.id, match[1] + " successfully added to the database");
			});
		});
		bot.onText(/\/show (.+)/, (message, match) =>{
			//update(dbo);
			//console.log(employes);
			//update(dbo).then(bot.sendMessage(msg.chat.id, employes[4].name));
			findEmploye(dbo, match[1], function(res){
				bot.sendMessage(message.chat.id, res);
			});
			//update(dbo, function(){
			//	bot.sendMessage(message.chat.id, employes[5].name);
			//});
		});


	});
	

	/*bot.on("text", (message) =>{

	});*/

})
/*bot.on("text", (message) =>{
			console.log(employes);
			console.log(employes[1].name);
			console.log(typeof(employes[1].name));
			bot.sendMessage(message.chat.id, employes[1].name);
	});
	*/