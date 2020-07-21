var textCounter = 0;


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


let processor = {
    timerCallback: function () {
        if (this.video.paused || this.video.ended) {
            this.video.play();
            return;
        }
        this.computeFrame();
        let self = this;
        setTimeout(function () {
            self.timerCallback();
        }, 0);
    },

    doLoad: function () {
        this.video = document.getElementById("video");
        this.c1 = document.getElementById("c1");
        this.ctx1 = this.c1.getContext("2d");
        this.c2 = document.getElementById("c2");
        this.ctx2 = this.c2.getContext("2d");
        let self = this;
        this.video.addEventListener("play", function () {
            self.width = self.video.videoWidth / 2;
            self.height = self.video.videoHeight / 2;
            self.timerCallback();
        }, false);
    },

    computeFrame: function () {

        this.ctx1.drawImage(this.video, 0, 0, this.width, this.height);
        let frame = this.ctx1.getImageData(0, 0, this.width, this.height);
        let l = frame.data.length / 4;

        for (let i = 0; i < l; i++) {
            let r = frame.data[i * 4 + 0];
            let g = frame.data[i * 4 + 1];
            let b = frame.data[i * 4 + 2];
            if (g > 100 && r > 100 && b < 43)
                frame.data[i * 4 + 3] = 0;
        }
        this.ctx2.putImageData(frame, 0, 0);
        return;
    }
};

document.addEventListener("DOMContentLoaded", () => {
    processor.doLoad();
});