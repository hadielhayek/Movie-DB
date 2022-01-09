const express = require('express')
const app = express()
const port = 3000
const movies = [
    { title: 'Jaws', year: 1975, rating: 8 },
    { title: 'Avatar', year: 2009, rating: 7.8 },
    { title: 'Brazil', year: 1985, rating: 8 },
    { title: 'الإرهاب والكباب‎', year: 1992, rating: 6.2 }
]
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

app.get('/hello/:id', function (req, res) {
    let id=req.params.id;
    res.status(200).send("hello" + id)
})

app.get('/search?x', function (req, res) {
    if (req.query.x==" " || req.query.x=="undefined")
    {
        res.status(500).send({error:"true",message:"you have to provide a search"})
    }
    else{res.status(200).send({message:"ok",data:req.query.x})}
    
})

app.get('/read', function (req, res) {
    res.status(200).send(movies)
})

app.post('/create', function (req, res) {
    res.status(200).send("create")
})

app.put('/update', function (req, res) {
    res.status(200).send("update")
})

app.delete('/delete', function (req, res) {
    res.status(200).send("delete")
})