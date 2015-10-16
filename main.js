
//create global variables for the board, number of moves, and array of images
var numberOfMoves = 0;
var tileFlipped = "";
var imageFlipped = "";
var imageLookup = 0;

//create an array of images that are hidden behind the tiles
var image_array = [
    "sun.png",
    "surf.png",
    "moon.png",
    "earth.png",
    "snowboard.png",
    "pumpkin.png",
    "dog.png",
    "beach.png",
    "tree.png",
    "skull.png"
];


//randomize/shuffle deck
// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution
function shuffle(max, min) {
    return Math.round(Math.random() * (max - min) + min);
}

// randomize images in the array
function randomImages() {
    
    //create variable for children of #tiles element
    var allImages = $('#tiles').children();
    var thisImage = $('#tiles' + " div:first-child");
    var newImageArray = new Array();
    //
    for (var i = 0; i < allImages.length; i++) {
        newImageArray[i] = $("#" + thisImage.attr("id") + " img").attr("src");
        thisImage = thisImage.next();
    }
    
    thisImage = $('#tiles' + " div:first-child");
    
    for (var z = 0; z < allImages.length; z++) {
        var random = shuffle(0, newImageArray.length - 1);
        
        $("#" + thisImage.attr("id") + " img").attr("src", newImageArray[random]);
        newImageArray.splice(random, 1);
        thisImage = thisImage.next();
    }
}

//resets the game
/*function reset() {
     
    randomImages();
     
    $(gameBoard + " div img").hide();
    $(gameBoard + " div").css(visible");
     
    $("#finished").remove();
     
    numberOfMoves = 0;
    $("#numberOfMoves").html("" + numberOfMoves);
     
    tileFlipped = "";
    imageFlipped = "";
    imageLookup = 0;
     
    return false;
}
*/

// show/hide cards, number of moves shown, checks for matches and game complete
function flipTile() {
    
    var id = $(this).attr("id");
    //flip card when clicked
    if ($("#" + id + " img").is(":hidden")) {
        $('#tiles' + " div").unbind("click", flipTile);
        
        $("#" + id + " img").slideDown('fast');
        
        //display images
        if (imageFlipped == "") {
            tileFlipped = id;
            imageFlipped = $("#" + id + " img").attr("src");
            setTimeout(function() {
                $('#tiles' + " div").bind("click", flipTile)
            }, 400);
        } else {
            current = $("#" + id + " img").attr("src");
            
            //matching logic
            if (imageFlipped != current) {
                setTimeout(function() {
                    $("#" + id + " img").slideUp('fast');
                    $("#" + tileFlipped + " img").slideUp('fast');
                    tileFlipped = "";
                    imageFlipped = "";
                }, 500);
            } else {
                $("#" + id + " img").parent().css("hidden");
                $("#" + tileFlipped + " img").parent().css("hidden");
                imageLookup++;
                
                tileFlipped = "";
                imageFlipped = "";
            }
            setTimeout(function() {
                $('#tiles' + " div").bind("click", flipTile)
            }, 500);
        }
        
        numberOfMoves++;
        $("#numberOfMoves").html("" + numberOfMoves);
        
        // if all cards are flipped, display confirmation message
        if (imageLookup == image_array.length) {
            $("#memoryBoard").append('<div id="finished">Good Job!</div>');
        }
    }
}

// Run the game
$(function() {
    
    for (var y = 1; y < 3 ; y++) {
        $.each(image_array, function(i, val) {
            $('#tiles').append("<div id=card" + y + i + "><img src=" + val + " />");
        });
    }
    
    $('#tiles' + " div").click(flipTile);
    randomImages();
    
});