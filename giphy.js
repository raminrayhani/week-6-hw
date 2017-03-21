// initial array of button list
  var fixedButton = ["Boeing" , "Flight" , "Eagle" , "Falcon" , "Pilot" , "Airbus" , "Ferrary" , "BMW" , "Benz" , "Nissan"];

// function for displaying buttons
function renderButtons()
{

  // delete the other shows, adding new ones
  $("#showsView").empty();

  // loop through the shows array
  for (var i = 0; i<fixedButton.length; i++)
  {
      // generate button for each item in the array
      var a =$("<button>");
      a.addClass("show");
      a.attr("data-name",fixedButton[i]);
      a.text(fixedButton[i]);
      $("#showsView").append(a);
  }
}

// when the add button is clicked
  $("#addShow").on("click" , function() {
    //  get the text from the input
    var newButton = $("#show-input").val().trim();

    // push new button name into the array
    fixedButton.push(newButton);

    renderButtons();

    return false;
  });


// event for clicks on the buttons
    $(document).on("click" , ".show" , function() {

      var title = $(this).data("name");

      // set query URL to query based on the button name, return a limit of 10 gif
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + title + "&api_key=dc6zaTOxFJmzC&limit=10&rating=pg";

      $.ajax({url: queryURL, method: "GET"}).done(function(response) {

        console.log(response);

        var results = response.data;

        for (var i = 0; i < results.length; i++) {
          var gifDiv = $("<div>");

          var rating = results[i].rating;

          var p = $("<p>").text("Rating: " + rating);

          var showImage = $("<img>");
          showImage.addClass("gif");
          showImage.attr("src" , results[i].images.fixed_height_still.url);
          showImage.attr("data-still" , results[i].images.fixed_height_still.url);
          showImage.attr("data-animate" , results[i].images.fixed_height.url);
          showImage.attr("data-state" , "still");
          gifDiv.append(p);
          gifDiv.append(showImage);


          // place the gifs into the showDiv
          $("#gifsHere").prepend(gifDiv);
        }

      });

    });  

  // when user clicks on a gif
  $(document).on("click", ".gif" , function() {

    console.log("This was clicked");
    var state = $(this).attr("data-state");


      if ( state == "still")
        {
        $(this).attr("src", $(this).data("animate"));
        $(this).attr("data-state", "animate");
        }
        else
        {
        $(this).attr("src", $(this).data("still"));
        $(this).attr("data-state", "still");
        }
  });      

  renderButtons();    

