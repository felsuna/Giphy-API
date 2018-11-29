var giphyButtons = ["panda", "cat", "owl"];

function displayButtons() {
    console.log("looping")
    $("#buttons").empty();
    for (var i = 0; i < giphyButtons.length; i++) {
        var newButton = $("<button>");
        newButton.text(giphyButtons[i]);
        newButton.attr("data-animal", giphyButtons[i])
        newButton.addClass("buttons");
        $("#buttons").append(newButton);
    }
}

displayButtons()

$(document).on("click", ".buttons", function () {
    var animal = $(this).attr("data-animal");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            console.log(response)
            $("#giphy-images").empty();
            for (var i = 0; i < response.data.length; i++) {
                var giphyContainer = $("<div>");
                var newImage = $("<img>");
                newImage.attr("src", response.data[i].images.original_still.url);
                newImage.attr("data-animated", response.data[i].images.original.url);
                newImage.attr("data-still", response.data[i].images.original_still.url);
                newImage.attr("gif-state", 'still');
                giphyContainer.append(newImage);
                var newRating = $("<p>");
                newRating.text("Rating: " + response.data[i].rating);
                giphyContainer.append(newRating);
                $("#giphy-images").append(giphyContainer);
            }
        })
})

$("#add-animal-form").on("submit", function (event) {
    event.preventDefault();
    var inputAnimal = $("#input").val();
    giphyButtons.push(inputAnimal)
    displayButtons()
    console.log(inputAnimal)
})

$("#giphy-images").on("click", "img", function () {

    var state = $(this).attr("gif-state");

    if (state == "still") {
        $(this).attr("src", $(this).attr("data-animated"));
        $(this).attr("gif-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("gif-state", "still");

};
});

