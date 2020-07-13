// Set constraints for the video stream
var constraints = { video: { facingMode: "user" }, audio: false };
var textCounter = 0;
var miniButtons = document.getElementById("miniButtons");
miniButtons.style.display = "none"
var imagered = new Image();
var extractRGBButton = document.getElementById("extractRGBButton");


// Define constants
var cameraView = document.querySelector("#camera--view"),
    cameraOutput = document.querySelector("#camera--output"),
    cameraSensor = document.querySelector("#camera--sensor"),
    cameraTrigger = document.querySelector("#camera--trigger"),
    cameraOutputRed = document.querySelector("#camera--output--red"),
    cameraOutputBlue = document.querySelector("#camera--output--blue")




// Access the device camera and stream to cameraView
function cameraStart() {
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream) {
        track = stream.getTracks()[0];
            cameraView.srcObject = stream;
            extractRGBButton.style.display = "none"
    })
    .catch(function(error) {
        console.error("Oops. Something is broken.", error);
    });
}
// Take a picture when cameraTrigger is tapped
cameraTrigger.onclick = function() {
    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.height = cameraView.videoHeight;
    cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
    cameraOutput.src = cameraSensor.toDataURL("image/webp");
    cameraOutput.classList.add("taken");
    //cameraOutputRed.src = cameraSensor.toDataURL("image/webp");
    //cameraOutputRed.classList.add("takenred");
    

};

//Define constants for which overlay is currently shown

function displayText() {
    var overlayText = document.getElementById("workshopInstructions");
    var overlayBox = document.getElementById("workshopOverlay");
    

    if (textCounter == 0) {
        overlayText.innerText = "Thanks for clicking the button!";
        
    }
    if (textCounter == 1) {
        overlayText.innerText = "Thanks for clicking again!";
    }
    if (textCounter == 2) {
        overlayText.innerText = "OK THATS ENOUGH";
    }
    if (textCounter == 3) {
        overlayText.innerText = "The next click will hide the tip, so we can see the camera. Click the arrow at the bottom to bring it back up";
    }
    if (textCounter == 4) {
        overlayBox.style.display = "none";
        miniButtons.style.display = "block"
    }
    if (textCounter == 5) {
        overlayBox.innerText = "Great, we took a picture. Now lets see what the Red and Blue components of the picture look like.";
        overlayBox.style.display = "block"
        extractRGBButton.style.display= "block"
    }
}

function previousInstruction() {
    textCounter--;
    displayText();
}
function nextInstruction() {
    textCounter++;
    displayText();
}
function extractRGB() {
    var newCanvas = document.createElement('canvas');
    var context = newCanvas.getContext('2d');
    context.fillRect(0, 0, newCanvas.width, newCanvas.height);
    newCanvas.width = cameraSensor.width;
    newCanvas.height = cameraSensor.height;
    context.drawImage(cameraView, 0, 0);

    
    
    //cameraOutputRed.src = cameraOutput.src;
    //camanCanvas.drawImage(cameraOutput, 0, 0)
    //context.drawImage(cameraSensor, 0, 0);
    cameraOutputRed.src = cameraOutput.src
    Caman('#camera--Output--Red', function () {
        this.channels({
            red: 0,
            green: -100,
            blue: -100
        }).render();
    });

    cameraOutputRed.src = newCanvas.toDataURL();
    cameraOutputRed.classList.add("takenred");

    //cameraOutputRed.src = cameraOutput.src;
    //camanCanvas.drawImage(cameraOutput, 0, 0)
    //context.drawImage(cameraSensor, 0, 0);

    var blueCanvas = document.createElement('canvas');
    var blueContext = newCanvas.getContext('2d');
    blueContext.width = cameraSensor.width;
    blueContext.height = cameraSensor.height;
    blueContext.drawImage(cameraView, 0, 0);
    blueContext.fillRect(0, 0, newCanvas.width, newCanvas.height);
           
    Caman('#camera--Output--Blue', function () {
        this.channels({
            red: -100,
            green: -100,
            blue: 0
        }).render();
    });
    cameraOutputBlue.src = cameraOutput.src
    cameraOutputRed.classList.add("takenred");
    cameraOutputBlue.classList.add("takenblue");
}

// Start the video stream when the window loads
window.addEventListener("load", cameraStart, false);