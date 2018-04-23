var express = require('express');
var app = express();
var wifi = require('node-wifi');
var parsedNetworks;
var cors = require('cors');
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
app.use(cors())
express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
wifi.init({
	iface :null
});
wifi.scan(function(err, networks){
	if(err){
	console.log(err);
}else{
	console.log(networks);
	parsedNetworks = [];
	networks.forEach(function(e){
		parsedNetworks.push({'ssid': e.ssid, 'signal_level':e.signal_level, 'mac':e.mac, 'security':e.security})
	})
	console.log(parsedNetworks);
}
});

app.get('/getwifis', function (req, res) {
   res.json(parsedNetworks);
   // res.render('pagetest.html', {pn: parsedNetworks});
})


var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})



