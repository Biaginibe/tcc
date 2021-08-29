const express = require('express');
const cors = require('cors');
const {routes, authRoute} = require('./routes');
require('./database');

const app = express();

app.use(express.json());
app.use(cors())
app.use(authRoute);
app.use(routes);

const port = 3333;
app.listen(port, () => {
	console.log(`running on port ${port}.`);
});
