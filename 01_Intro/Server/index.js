const express = require('express');
const connection = require('./Config/db');
const router = require('./Routes/Routes')

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', router)

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
