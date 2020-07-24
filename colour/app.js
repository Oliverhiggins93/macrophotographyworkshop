var textCounter = 0;
var overlayImage = document.getElementById("workshopImage");
var overlayImage2 = document.getElementById("workshopImage2");
var overlayImage3 = document.getElementById("workshopImage3");
overlayImage2.style.display = 'none';
overlayImage3.style.display = 'none';

//Define constants for which overlay is currently shown

function displayText() {
    var overlayText = document.getElementById("workshopInstructions");
    var overlayBox = document.getElementById("workshopOverlay");
    var nextButtonText = document.getElementById("nextButtonText");
    var nextButton = document.getElementById("nextButtonText");
    

    if (textCounter == 0) {
        overlayText.innerText = "In a film camera, light is projected onto photographic film by a lens, creating an image of the scene. But how does a digital camera sensor work?";
        overlayImage.src = "smartphone_camera.jpg"
        
    }
    if (textCounter == 1) {
        overlayText.innerText = "Digital camera sensors consist of arrays of tiny light-sensitive sites referred to as pixels. As light hits a pixel, an electrical signal is generated which can be read off by the camera’s processor.";
        overlayImage.src = "03b5b033-5aca-40a7-ae4a-1592a9403890_CAM+HERO+ALT+2.jpg";
    }
    if (textCounter == 2) {
        overlayText.innerText = "A larger signal is registered if there is a higher intensity of light hitting each photosite, which allows us to estimate the number of photons hitting each area of the camera and decide how light or dark each area of the image should be. When the signal is saved in an image format such as JPEG, the brightness of the pixel is recorded as a number between 0 and 255, which corresponds to an 8 bit image. Higher values are lighter, and lower values are darker.";
        overlayImage.src = "imagematrix.png";
    }
    if (textCounter == 3) {
        overlayText.innerText = "But this only gives us black and white images, so how do we get colour images? Check out this image of an image sensor under the microscope. We can see that each pixel is actually a different colour – there’s Red, Green and Blue pixels.";
        overlayImage.src = "greaves-figure-1-700.jpg"
    }
    if (textCounter == 4) {
        overlayText.innerText = "This is called a bayer filter – a repeating checker-board like array of colour filters which sits over the pixels. The filter restricts the wavelengths of light that are transmitted to each pixel, each taking in only red, green or blue wavelengths so that we can work out the colour characteristics of the image.";
        overlayImage.src = "1200px-Bayer_pattern_on_sensor.svg.png"
    }
    if (textCounter == 5) {
        overlayText.innerText = "Notice how the Bayer array contains twice as many green as red or blue sensors? The human eye is more sensitive to green light than both red and blue light, so there are double the number of green pixels to emulate the way the eye sees colour. Redundancy with green pixels produces an image which appears less noisy and has finer detail than could be accomplished if each colour were treated equally. This also explains why noise in the green channel is much less than for the other two primary colours";
        overlayImage.src = "1200px-Bayer_pattern_on_sensor.svg.png"
    }
    if (textCounter == 6) {
        overlayText.innerText = "The image we can see on the left below is what the camera sees before the image is fully processed. It looks weird, doesn't it? Because each pixel only takes in red, green or blue light we end up with a kind of checkerboard over the image. The image on the right is what the image looks like after processing into a full colour 3 layer stack.";
        overlayImage.src = "debayer-2-o6jrxuck5utd9sez51ucv17j5v4prho33418h42yyw.png"
    }
    if (textCounter == 7) {
        overlayText.innerText = "Check out the image of the grafitti below. If we can split the image into the blue and red channels to see its different components!";
        overlayImage.src = "52420981_2035451236523484_2022786281947267072_o.jpg"
        overlayImage2.style.display = 'none';
        overlayImage3.style.display = 'none';
    }
    if (textCounter == 7) {
        overlayText.innerText = "Check out the image of the grafitti below. If we can split the image into the blue and red channels to see its different components!";
        overlayImage2.style.display = 'block';
        overlayImage3.style.display = 'block';
        overlayImage.src = "52420981_2035451236523484_2022786281947267072_o_red.jpg"
        overlayImage2.src = "52420981_2035451236523484_2022786281947267072_o_green.jpg"
        overlayImage3.src = "52420981_2035451236523484_2022786281947267072_o_blue.jpg"
    }
    if (textCounter == 8) {
        overlayText.innerText = "Nice! Now lets try it out on the camera feed. You can explore the colours of things around you! Click link:  https://oliverhiggins93.github.io/macrophotographyworkshop/colour/colourlab";
        overlayImage2.style.display = 'block';
        overlayImage3.style.display = 'block';
        overlayImage.src = "52420981_2035451236523484_2022786281947267072_o_red.jpg"
        overlayImage.style.display = 'none';
        overlayImage2.style.display = 'none';
        overlayImage3.style.display = 'none';
        overlayText.appendChild("https://oliverhiggins93.github.io/macrophotographyworkshop/colour/colourlab");
        var a = document.createElement('a');
        var linkText = document.createTextNode("Go To Lab");
        a.appendChild(linkText);
        a.title = "Go To Lab";
        a.href = "https://oliverhiggins93.github.io/macrophotographyworkshop/colour/colourlab";
        document.body.appendChild(a);
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

