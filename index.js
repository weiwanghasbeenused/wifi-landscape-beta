var express = require('express');
var app = express();
var wifi = require('node-wifi');
var parsedNetworks;
var cors = require('cors');

app.use(cors());
app.listen(process.env.PORT || 8081);
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


/*var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})*/



