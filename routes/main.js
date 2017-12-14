const showtimes = require('../lib/showtimes');
const zipCode = require('../lib/zipCode');

// Routes
// ------

exports.init = function(app) {
  app.get("/zipcode", getZip);
  app.get("/theatres", getTheatres);
  app.get("/movies", getMovies);
  app.get("/showtimes", getShowtimes);
  app.get("/main", getMain);
};

// Route Handlers
// --------------

function getZip(req, res) {
    let zip = req.query.zip;
    if(zip){
        zipCode.getLocation(zip, function(error, statusCode, headers, body){
            if(error){ throw error; }
            res.send(body);
        });
    }else{
        res.send({error: "Error, No zip param in querystring..."});
    }
}

function getTheatres(req, res) {
    let location = req.query.location;
    if(location){
        showtimes.getTheatres(location, 20, function(error, statusCode, headers, body){
            if(error){ throw error; }
            let theatres = JSON.parse(body).cinemas;
            res.render("cinemas", { theatres: theatres});
        });
    }else{
        res.send("Error, No location param in querystring...");
    }
}

function getMovies(req, res) {
    let cinema_id = req.query.cinema_id;
    if(cinema_id){
        showtimes.getMovies(cinema_id, function(error, statusCode, headers, body){
            if(error){ throw error; }
            let movies = JSON.parse(body).movies;
            res.render("movies", { movies: movies});
        });
    }else{
        res.send("Error, No cinema_id param in querystring...");
    }
}

function getShowtimes(req, res) {
    let cinema_id = req.query.cinema_id;
    let movie_id = req.query.movie_id;
    // let tomorrow = new Date();
    // let dateString = tomorrow.getMonth()+1 + "-" +tomorrow.getUTCDate() + "-" + tomorrow.getFullYear() + "T00:00:00-08:00";
    if(cinema_id && movie_id){
        showtimes.getShowtimes(cinema_id, movie_id, function(error, statusCode, headers, body){
            if(error){ throw error; }
            let showtimes = JSON.parse(body).showtimes;
            res.render("showtimes", { showtimes: showtimes});
        });
    } else {
        res.send("Error, No cinema_id param in querystring...");
    }
}

function getMain(req, res) {
    let cinema_id = req.query.cinema_id;
    let movie_id = req.query.movie_id;
    let user = req.query.user;
    let showtime_id = req.query.showtime_id;

    if(cinema_id && movie_id && showtime_id){
    //    require('./serverSocket.js').init(io, showtime_id);
       res.render("main", {cinema: cinema_id, movie: movie_id, user: user, showtime: showtime_id});
    }else{
       res.send("Error, params missing...");
    }
}
