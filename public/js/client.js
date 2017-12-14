let user, zip, my_location, cinema_id, movie_id, showtime_id;

function fetchLocation(zip){
    $.ajax({
        url: "/zipcode?zip=" + zip,
        success: function (result) {
            result = JSON.parse(result);
            my_location = result.lat + "," + result.lng;
            renderTheatres(my_location);
        }
    });
}

function renderTheatres(location){
    $.ajax({
        url: "/theatres?location=" + location,
        success: function (result) {
            $("#cinemas").html(result);
            $("#splash").slideUp();
            $("#cinemas").show();
        }
    });
}

function renderMovies(cinema_id){
    $.ajax({
        url: "/movies?cinema_id=" + cinema_id,
        success: function (result) {
            $("#movies").html(result);
            $("#cinemas").slideUp();
            $("#movies").show();
        }
    });
}

function renderShowtimes(cinema_id, movie_id){
    $.ajax({
        url: "/showtimes?cinema_id=" + cinema_id + "&movie_id=" + movie_id,
        success: function (result) {
            $("#showtimes").html(result);
            $("#movies").slideUp();
            $("#showtimes").show();
        }
    });
}

function renderMain(user, cinema_id, movie_id, showtime_id){
    $.ajax({
        url: "/main?cinema_id=" + cinema_id + "&movie_id=" + movie_id + "&showtime_id=" + showtime_id + "&user=" + user,
        success: function (result) {
            $("#main").html(result);
            $("#showtimes").slideUp();
            $("#main").show();
        }
    });
}

function formHandler(event) {
    user = $("#user_name").val();
    zip = $("#zip_code").val();
    fetchLocation(zip);
    event.preventDefault();
}

function theatreHandler() {
    cinema_id = this.id;
    renderMovies(cinema_id);
    event.preventDefault();
}

function movieHandler() {
    movie_id = this.id;
    renderShowtimes(cinema_id, movie_id);
    event.preventDefault();
}

function showtimeHandler(){
    showtime_id = this.id;
    renderMain(user, cinema_id, movie_id, showtime_id);
    event.preventDefault();
}

$("#splashForm").submit(formHandler);

//wont load yet...
$(".chooseTheatre").click(theatreHandler);
$(".poster").click(movieHandler);
$(".chooseshowtime").click(showtimeHandler);


