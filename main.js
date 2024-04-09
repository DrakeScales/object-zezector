objects = [];
status = "";
video = "";

function preload(){
}

function setup() {
    canvas = createCanvas(480, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
}

function draw(){
    image(video, 0, 0, 480, 380);
    if(status !="")
    {
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
           document.getElementById("status").innerHTML = "status : objects Detected";
           fill("#FF0000");
           percent = floor(objects[i].confidence * 100);
           text(objects[i].label + " " + percent + "%", objects[i].y + 15, objects[i].x + 15, objects[i].y + 15);
           noFill(); 
           stroke("#FF0000");
           rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

           if(objects[i]==object_name){
            video.stop();
            objectDetector.detect(gotResult);
            document.getElementById("status").innerHTML = object_name + "found";
            synth=window.speechSynthesis;
            utterThis = new SpeechSynthesisUtterance(object_name + "found");
            synth.speak(utterThis);
           }
           else{
            document.getElementById("status").innerHTML = object_name + " not found";
           }
        }
    }   

}

function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "status : Detecting Objects";
    object_name = document.getElementById("objectFinder").value;
}   


function modelLoaded() {
    console.log("model loaded !");
    status = true;
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}