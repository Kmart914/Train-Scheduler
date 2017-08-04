var config = {
   apiKey: "AIzaSyA06R83asalKiuxBasMaDFlwiFz_1k47gU",
   authDomain: "test-project-78a2d.firebaseapp.com",
   databaseURL: "https://test-project-78a2d.firebaseio.com",
   projectId: "test-project-78a2d",
   storageBucket: "test-project-78a2d.appspot.com",
   messagingSenderId: "550930009757"
 };
 firebase.initializeApp(config);

 var database = firebase.database();

 var trainName = "";
 var destination = "";
 var firstTrain = "";
 var frequency = "";

 $("#addButton").on("click", function() {

   trainName = $('#inputName').val();
   destination = $('#inputDest').val();
   firstTrain = $('#inputTime').val();
   frequency = $('#inputFreq').val();

   database.ref().push({
     trainName: trainName,
     destination: destination,
     firstTrain: firstTrain,
     frequency: frequency
   })

 });

 database.ref().on("child_added", function(childSnapshot){
   var snap = childSnapshot.val();
   //console.log(snap);

   $("#trainTable").append("<tr>" + "<td>" + snap.trainName + "</td>" + "<td>" + snap.destination +  "</td>" +"<td>" + snap.frequency + "</td>")

   var trainFrequency = snap.frequency
   console.log("Frequency: " + trainFrequency);
   var trainTime = snap.firstTrain
  console.log("First Train: " + trainTime);
   var trainTimeConverted = moment(trainTime,  "hh:mm").subtract(1, "years");
   console.log("Converted: " + trainTimeConverted);

   var currentTime = moment();
   console.log("Current Time: " + moment(currentTime).format("hh:mm"));


   var timeDiff = moment().diff(moment(trainTime), "minutes");
   
   console.log("diff in time: " + timeDiff);

   var tRemainder = timeDiff % trainFrequency;

   console.log("remainder: " + tRemainder);

 });
