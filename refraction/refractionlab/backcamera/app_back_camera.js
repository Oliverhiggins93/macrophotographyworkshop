// Set constraints for the video stream
var constraints = {
    video: { facingMode: { exact: "environment"} }, audio: false };
var textCounter = 0;
//var miniButtons = document.getElementById("miniButtons");
//miniButtons.style.display = "none"

// Define constants
var cameraView = document.querySelector("#camera--view"),
    cameraOutput = document.querySelector("#camera--output"),
    cameraSensor = document.querySelector("#camera--sensor"),
    cameraTrigger = document.querySelector("#camera--trigger"),
    cameraOutputRed = document.querySelector("#camera--output--red"),
    cameraOutputBlue = document.querySelector("#camera--output--blue"),
    prevButton = document.querySelector("#previousButton"),
    nextButton = document.querySelector("#nextButton"),
    activity1 = document.querySelector("#activity1Overlay"),
    activity2 = document.querySelector("#activity2Overlay"),
    activity3 = document.querySelector("#activity3Overlay"),
    changeCameraButton = document.querySelector("#switch-camera")




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
    displayText();
}
// Take a picture when cameraTrigger is tapped
cameraTrigger.onclick = function() {
    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.height = cameraView.videoHeight;
    cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
    cameraOutput.src = cameraSensor.toDataURL("image/webp");
    cameraOutput.classList.add("taken");
    textCounter++;
    displayText();
    

};

//Define constants for which overlay is currently shown

function displayText() {
    var overlayText = document.getElementById("workshopInstructions");
    var overlayBox = document.getElementById("workshopOverlay");
    

    if (textCounter == 0) {
        prevButton.style.display = "none";
        activity1Overlay.style.display = "none";
        activity2Overlay.style.display = "none";
        activity3Overlay.style.display = "none";
        overlayText.innerText = "Hello and welcome to the workshop. These tool tips will guide you through how to perform the experiments. \n \n Once you are ready to begin, please select which camera you would like to use below:";
        
    }
    if (textCounter == 1) {
        overlayBox.style.display = "none";
        
    }
    if (textCounter == 2) {
        overlayText.innerText = "Here we can have some practical examples of things to do.";
    }
    if (textCounter == 3) {
        overlayText.innerText = "The next click will hide this tip, so we can see the camera. Lets take a photo";
    }
    if (textCounter == 4) {
        overlayBox.style.display = "none";
        
        //miniButtons.style.display = "block"
    }
    if (textCounter == 5) {
        overlayBox.innerText = "Great, we took a picture. Now lets see what the Red and Blue components of the picture look like.";
        overlayBox.style.display = "block"
        
    }
}

function previousInstruction() {
    textCounter++;
    displayText();
}
function nextInstruction() {
    textCounter++;
    displayText();
}
function showActivity1() {
    activity1.style.display = "block"
    activity2.style.display = "none"
    activity3.style.display = "none"
}
function showActivity2() {
    activity1.style.display = "none"
    activity2.style.display = "block"
    activity3.style.display = "none"
}
function showActivity3() {
    activity1.style.display = "none"
    activity2.style.display = "none"
    activity3.style.display = "block"
}
function hideOverlay() {
    activity1.style.display = "none"
    activity2.style.display = "none"
    activity3.style.display = "none"
}
function changeCamera() {

    
    

}

// Start the video stream when the window loads
window.addEventListener("load", cameraStart, false);