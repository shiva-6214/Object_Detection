img = "";
objectstatus = "";
object = [];

function setup() {
    canvas = createCanvas(640, 450);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById('status').innerHTML = "Object Detecting";
}

function modelLoaded() {
    console.log("Model Loaded!");
    objectstatus = true;
    objectDetector.detect(img, gotResults);
}

function gotResults(results, error) {
    if (error) {
        console.log(error);
    } else {
        console.log(results);
        object = results;
    }

}

function preload() {
    img = loadImage('dog_cat.jpg');
}

function draw() {
    image(img, 0, 0, 640, 450);
    if(objectstatus != "") {
        for (let i = 0; i < object.length; i++) {
            document.getElementById("status").innerHTML = "Object Detected";
            fill("#FF0000");
            percent = floor(object[i].confidence * 100);
            text(object[i].label + " " + percent + "%", obejct[i].x , object[i].y);
            noFill();
            stroke("#FF0000");
            rect(object[i].x , object[i].y, object[i].width, object[i].height);  
        }
    }
}