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
   console.log("sfg");

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
   console.log(snap);

   $("#trainTable").append("<tr>" + "<td>" + snap.trainName + "</td>" + "<td>" + snap.destination + "</td>" + "<td>" + snap.firstTrain + "</td>" +"<td>" + snap.frequency + "</td>")
 });
