// Set constraints for the video stream
var constraints = { video: { facingMode: "user" }, audio: false };
var textCounter = 0;
// Define constants
const cameraView = document.querySelector("#camera--view"),
    cameraOutput = document.querySelector("#camera--output"),
    cameraSensor = document.querySelector("#camera--sensor"),
    cameraTrigger = document.querySelector("#camera--trigger")


// Access the device camera and stream to cameraView
function cameraStart() {
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream) {
        track = stream.getTracks()[0];
        cameraView.srcObject = stream;
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
// Start the video stream when the window loads
window.addEventListener("load", cameraStart, false);