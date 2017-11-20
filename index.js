const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();

app.set('port', (process.env.PORT || 3000));

app.use('/js', express.static('src/js'));
app.use('/css', express.static('src/css'));

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'src/index.html'));
});

app.get(/(GetTitle)\/(.*)$/, (req, res) => {
	let url = req.params[1];

	if (!/^http(s?):\/\//i.test(url)) {
		url = "http://" + url;
	} else if (url.substr(0, 2) == '//') {
		url = "http" + url;
	}

	axios.get(url).then((resp) => {
		let title = (resp.data).match(/<title>(.*)<\/title>/);
		title = encodeURI(title[1]);

		res.send({
			success: true,
			title: title || 'Título desconhecido'
		});
	}).catch((err) => {
		res.status(200).json({
			success: false,
			message: err.toString()
		});
	});
});

app.listen(app.get('port'), () => {
	console.log('abntreference running at port', app.get('port'));
});