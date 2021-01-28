const express = require('express');
const bodyParser = require('body-parser');

const app = express()
const router = require('./route/route');
const PORT = 4001

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(router)


app.listen(PORT, () => {
    console.log(`server started on port ${PORT} `)
})
