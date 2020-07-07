const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const port = process.env.PORT || 3030;
const app = express();

app.use(bodyParser.json());

app.listen(port, () => {
	console.log(`Tooth Inc Server running on port ${port}`);
});
