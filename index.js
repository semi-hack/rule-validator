const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv')

dotenv.config()

const app = express()
const router = require('./route/route');
const port = process.env.PORT || 4001

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(router)


app.listen(port, () => {
    console.log(`server started on port ${port} `)
})
