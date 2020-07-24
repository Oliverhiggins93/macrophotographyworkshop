// Set constraints for the video stream
var constraints = { video: { facingMode: "environment" }, audio: false };
var textCounter = 0;
//var miniButtons = document.getElementById("miniButtons");
//miniButtons.style.display = "none"
var imagered = new Image();
var extractRGBButton = document.getElementById("extractRGBButton");
extractRGBButton.style.display = "none"

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
    textCounter++;
    displayText();
    if (textCounter > 4) {
        extractRGBButton.style.display = "block"
        //cameraOutputRed.src = cameraSensor.toDataURL("image/webp");
        //cameraOutputRed.classList.add("takenred");
        extractRGBOpencv()
        
    }
    

};

//Define constants for which overlay is currently shown

function displayText() {
    var overlayText = document.getElementById("workshopInstructions");
    var overlayBox = document.getElementById("workshopOverlay");
    

    if (textCounter == 0) {
        overlayText.innerText = "Thanks for clicking the button! Here's soome theory about imaging. Click next when you are ready to move on.";
        
    }
    if (textCounter == 1) {
        overlayText.innerText = "Thanks for clicking again! This is fun!";
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

    cameraOutputRed.src = cameraOutput.src;
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
function extractRGBOpencv() {
    var newCanvas = document.createElement('canvas');
    var context = newCanvas.getContext('2d');
    context.fillRect(0, 0, newCanvas.width, newCanvas.height);
    newCanvas.width = cameraSensor.width;
    newCanvas.height = cameraSensor.height;
    
    newCanvas.getContext('2d').drawImage(cameraView, 0, 0);
    let src = cv.imread(cameraSensor);
    let dst = new cv.Mat();
    // You can try more different parameters

    let rgbaPlanes = new cv.MatVector();
    // Split the Mat
    cv.split(src, rgbaPlanes);
    // Get R channel
    let R = rgbaPlanes.get(0);
    let B = rgbaPlanes.get(2);
    //cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY, 0);
    cv.imshow(cameraSensor, R);
    cameraOutputRed.src = cameraSensor.toDataURL();
    cameraOutputRed.classList.add("takenred");

    cv.imshow(cameraSensor, B);
    cameraOutputBlue.src = cameraSensor.toDataURL();
    cameraOutputBlue.classList.add("takenblue");
}

// Start the video stream when the window loads
window.addEventListener("load", cameraStart, false);