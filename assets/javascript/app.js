
// Initialize Firebase
var config = {
  apiKey: "AIzaSyAc_VxsFuLfoo7-iUrzyxBtElVFGjLgb1I",
  authDomain: "employeedbproj.firebaseapp.com",
  databaseURL: "https://employeedbproj.firebaseio.com",
  projectId: "employeedbproj",
  storageBucket: "",
  messagingSenderId: "573587009241"
};
firebase.initializeApp(config);

var database = firebase.database();


$("#submit").on("click", function () {
  event.preventDefault();
  var name = $("#newName").val().trim()
  var role = $("#newRole").val().trim()
  var startDate = $("#newStartDate").val().trim()
  var monthRate = $("#newRate").val().trim()

  database.ref().push({
    name: name,
    role: role,
    startDate: startDate,
    monthRate: monthRate
  })

})

database.ref().on("child_added", function(snapshot){
  var currentDate = moment().valueOf();
  var monthsWorked =  currentDate - moment(snapshot.val().startDate, "DD-MM-YYYY").valueOf;
  var totalBilled = monthsWorked * snapshot.val().monthRate;


  $("tbody").append("<tr><th>" + snapshot.val().name + "</th><th>" + snapshot.val().role + "</th><th>" +
    snapshot.val().startDate + "</th><th>" + monthsWorked + "</th><th>" + snapshot.val().monthRate + "</th><th>" + totalBilled + "</th></tr>")
})