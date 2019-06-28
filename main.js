console.log("JS loaded");
// require('dotenv').config();
// const apiKey = process.env.API_KEY;
// console.log(apiKey);

$(document).ready(() => {
  let memes = [
    "Success Kid",
    "Courage Wolf",
    "Philosoraptor",
    "Tim & Eric",
    "LOL Cat",
    "Grumpy Cat",
    "Scumbag Steve",
    "More Cowbell"
  ];

  function createButtons(arrayToUse, btnClass, divToAddTo) {
    $(divToAddTo).empty();

    for (i = 0; i < arrayToUse.length; i++) {
      let btn = $("<button>");
      btn.addClass(btnClass);
      btn.attr("data-type", arrayToUse[i]);
      btn.text(arrayToUse[i]);
      $(divToAddTo).append(btn);
    }
  }

  $(document).on("click", ".meme-button", () => {
    $("#memes").empty();
    $(".meme-button").removeClass("active");
    $(this).addClass("active");

    let type = $("#add-meme").attr("data-type");
    let queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=5VSehCFHPdHrAnqNg9pNV70lqyfxdb28&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET",
      headers : {
        "Access-Control-Allow-Origin": "*"
      }
    }).then(response => {
      let results = response.data;
      console.log(results);

      for (i = 0; i < results.length; i++) {
        let memeDiv = $("<div class=\"meme-item\">");
        // console.log(results[i].rating);
        let rating = results[i].rating;
        let paragraph = $("<p>").text("Rating: " + rating);
        // console.log(results[i].images.fixed_height.url);
        let movingGif = results[i].images.fixed_height.url;
        // console.log(results[i].images.fixed_height_still.url);
        let stillGif = results[i].images.fixed_height_still.url;

        let memeImg = $("<img>");
        memeImg.attr("src", stillGif);
        memeImg.attr("data-still", stillGif);
        memeImg.attr("data-animate", movingGif);
        memeImg.attr("data-state", "still");
        memeImg.addClass("meme-image");

        memeDiv.append(paragraph);
        memeDiv.append(memeImg);

        $("#memes").append(memeDiv);
      }
    });

    $(document).on("click", ".meme-image", () => {
      var state = $(this).attr("data-state");

      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });

    $("#add-meme").on("click", event => {
      event.preventDefault();
      var newMeme = $("input")
        .eq(0)
        .val();

      if (newMeme.length > 2) {
        memes.push(newMeme);
      }
    });
    createButtons(memes, "meme-button", "#meme-buttons");
  });
  createButtons(memes, "meme-button", "#meme-buttons");
});  



