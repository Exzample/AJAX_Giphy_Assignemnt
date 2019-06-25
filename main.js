console.log("JS loaded");

var memes = [
    "Success Kid", "Courage Wolf", "Philosoraptor", "Tim & Eric", "LOL Cat", "Grumpy Cat", "Scumbag Steve", "More Cowbell"
]

function createButtons(arrayToUse, btnClass, divToAddTo) {
    $(divToAddTo).empty();

    for (i = 0; i < arrayToUse.length; i++ ) {
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

    let type = $(this).attr("data-type");
    let queryURL =
      "http://api.giphy.com/v1/gifs/search?q=" +
      type +
      "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then( (res) => {
        let results = res.data;
        console.log(results);

        for(i = 0; i < res.length; i++) {
            let memeDiv = $("<div class=\"meme-item\">");
            console.log(results[i].rating);
            let rating = results[i].rating;
            let paragraph = $("<p>").text("Rating: " + rating);
            console.log(results[i].images.fixed_height.url);
            let movingGif = results[i].images.fixed_height.url;
            console.log(results[i].images.fixed_height_still.url);
            let stillGif = results[i].images.fixed_height_still.url;

            let memeImg = $("<img>");
            memeImg.attr("src", still);
            memeImg.attr("data-still", still);
            memeImg.attr("data-animate", animated);
            memeImg.attr("data-state", "still");
            memeImg.addClass("meme-image");

            memeDiv.append(paragraph);
            memeDiv.append(memeImg);

            $("#memes").append(memeDiv);
        }
    });
});