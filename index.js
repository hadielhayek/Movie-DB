const express = require('express')
const app = express()
const port = 3000

app.listen(port, () => {
    console.log('ok')
})

app.get('/test', function (req, res) {
    res.status(200).send("ok")
})
app.get('/time', function (req, res) {
    var today = new Date();
    var time = today.getHours() +  ":" + today.getSeconds(); 
    res.status(200).send(time)
})