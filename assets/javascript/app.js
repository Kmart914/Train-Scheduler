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


   var trainFrequency = snap.frequency
   console.log("Frequency: " + trainFrequency);

   var trainTime = snap.firstTrain;
   var trainTimeConverted = moment(trainTime,  "HH:mm").subtract(1, "years").format("X");



   var timeDiff = moment().diff(moment.unix(trainTime), "minutes");



   var tRemainder = moment().diff(moment.unix(trainTime)) % trainFrequency;
   var trainMinutes = trainFrequency - tRemainder;
   console.log("fer: ", trainFrequency);
   var arrival = moment().add(trainMinutes, "m").format("hh:mm A");

   console.log("arrival: ", arrival);

   console.log("remainder: " + tRemainder);
   $("#trainTable").append("<tr>" + "<td>" + snap.trainName + "</td>" + "<td>" + snap.destination +  "</td>" +"<td>" + snap.frequency + "</td>" + "<td>" + arrival + "</td>" +"<td>" + trainMinutes + "</td>")

 });
