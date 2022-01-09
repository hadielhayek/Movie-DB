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

app.get('/movies/read/by-date', function (req, res) {
    movies.sort((a, b) => (a.year > b.year) ? 1 : -1)
    res.status(200).send(movies)
  })
  
  app.get('/movies/read/by-rating', function (req, res) {
    movies.sort((a, b) => (a.rating < b.rating) ? 1 : -1)
    res.status(200).send(movies)
  })
  
  app.get('/movies/read/by-title', function (req, res) {
    movies.sort((a, b) => (a.title > b.title) ? 1 : -1)
    res.status(200).send(movies)
  })

  app.get('/movies/read/id/:id', function (req, res) {
    if (req.params.id > 0 && req.params.id <= movies.length) {
      res.status(200).send(movies[req.params.id - 1])
    }
    else {
      res.status(404).send('the movie ' + req.params.id + ' does not exist')
    }
  
  })

  
  app.post('/movies/add', function (req, res) {
    const title = req.query.title;
    const year = parseInt(req.query.year);
    const rating = parseInt(req.query.rating);
    var movie = {};
    if (title === null || year === null || year.toString().length != 4 || typeof (parseInt(year)) !== 'number') {
      res.status(404).send('you cannot create a movie without providing a title and a year');
    } else {
      if (rating === null) {
        movie = { title: title, year: year, rating: 4 }
      }
      else {
        movie = { title: title, year: year, rating: rating }
      }
  
    }
    movies.push(movie);
    res.status(200).send(movies)
  
  })
  
  app.delete('/movies/delete/:id', function (req, res) {
    const id = parseInt(req.params.id);
    if (id < 1 || id > movies.length) {
      res.status(404).send('the movie ' + id + ' does not exist');
    }
    else {
      movies.splice(id - 1, 1);
      res.send(movies)
    }
  
  })

  app.put('/movies/update/:id', function (req, res) {
    const id = parseInt(req.params.id);
    if (id < 1 || id > movies.length) {
      res.status(404).send('the movie ' + id + ' does not exist');
    }
    else {
      const movie = movies[id - 1]
      const arrObj = Object.values(movie);
    }
    const title = req.query.title;
    const year = parseInt(req.query.year);
    const rating = parseInt(req.query.rating);
    if ((title == "" || title == undefined) && (year == "" || year == undefined) && (rating == "" || rating == undefined)) {
      res.send('you are not updated anythings')
    }
    else {
      (title == "" || title == undefined) ? movies[id - 1].title = arrObj[0] : movies[id - 1].title = title;
      (year == "" || year == undefined) ? movies[id - 1].year = arrObj[1] : movies[id - 1].year = year;
      (rating == "" || rating == undefined) ? movies[id - 1].rating = arrObj[2] : movies[id - 1].rating = rating;
    }
    res.send(movies);
  })