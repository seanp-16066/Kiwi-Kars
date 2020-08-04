// JavaScript Document
//grab a form
const form = document.querySelector('.form-inline');
checkedAddItems = []; //empty list to add the selected additional items to
var carPrice = 0,
	carSelect; //Global variables try to keeps these to a limit so that they don't interfer with other code 
var totalCost = 0; //Global variables try to keeps these to a limit so that they don't interfer with other code 
//Finds the car selected & gives value to the corresponding variables
function updateCar() {
	carSelect = this.dataset.name;
	carPrice = this.dataset.price;
	document.getElementById("carOutput").innerHTML = carSelect;
	document.getElementById("carPriceOutput").innerHTML = "$" + carPrice;
}

function updateBooking() {
	var addItems = document.getElementsByClassName('addCheck');
	var addCost = 0; //holds the cost of the checkboxes
	// this collects all my additional items checkboxes and stores them in an object array
	checkedAddItems = [] //empty list to add the selected additional items to
	for (var i = 0; i < addItems.length; i++) {
		if (addItems[i].checked) {
			checkedAddItems.push(' ' + addItems[i].value); //finds the value
			addCost += Number(addItems[i].dataset.price); //Basically adds all the checked boxes data-prices together
		}
	}
	var numberNights = form.querySelector('#numberNights').value;
	document.getElementById("nightsOutput").innerHTML = numberNights;
	var insuranceFee = 20 * numberNights;
	var standardFee = 50;
	document.getElementById("insuranceOutput").innerHTML = "$" + insuranceFee;
	document.getElementById("standardOutput").innerHTML = "$" + standardFee;
	document.getElementById("extrasOutput").innerHTML = checkedAddItems;
	totalCost = insuranceFee + numberNights * carPrice + addCost + standardFee;
	document.getElementById("totalOutput").innerHTML = "$" + totalCost;
}
//Pushes data from the form to firebase
//config your firebase push
const config = {
	apiKey: "AIzaSyCfI_1234455glTdTNjFA3kAvmimlU",
	authDomain: "example-9167e.firebaseapp.com",
	databaseURL: "example-9167e.firebaseio.com",
	projectId: "example-9167e",
	storageBucket: "example-9167e.appspot.com",
	messagingSenderId: "6271234586832"
};
//create a functions to push
function firebasePush(input) {
	//prevents from breaking
	if (!firebase.apps.length) {
		firebase.initializeApp(config);
	}
	//pushes itself
	var mailsRef = firebase.database().ref('Person Info').push().set({
		firstname: firstNameInput.value,
		lastname: lastNameInput.value,
		age: ageInput.value,
		email: emailInput.value,
		numberOfNights: numberNights.value,
		dateInput: dateInput.value,
		cellphone: cellInput.value,
		carSelect: carSelect,
		carDailyPrice: carPrice,
		totalcost: totalCost,
		comment: commentCar.value,
		extras: checkedAddItems
	});
}
//push on form submit
if (form) {
	//grab an input
	var firstNameInput = form.querySelector('#firstNameInput');
	var lastNameInput = form.querySelector('#lastNameInput');
	var ageInput = form.querySelector('#ageInput');
	var emailInput = form.querySelector('#emailInput');
	var numberNights = form.querySelector('#numberNights');
	var cellInput = form.querySelector('#cellInput');
	var dateInput = form.querySelector('#dateInput');
	var commentCar = form.querySelector('#commentCar');
	form.addEventListener('submit', function(evt) {
		evt.preventDefault();
		if (!form.terms.checked) {
			form.terms.focus();
			return false;
		}
		firebasePush(firstNameInput, lastNameInput, ageInput, emailInput, numberNights, checkedAddItems, cellInput, commentCar, dateInput);
		//shows alert if everything went well.
		document.getElementById('confirmOverlay').style.height = "100%" //display the confirm overlay
		setTimeout(function() { //sets a timer of 3 seconds and will then refresh the page
			location.reload();
		}, 3500);
		return alert('Data Successfully Sent to Realtime Database');
	})
}
//Pushes data from the form to firebase
//event listener that will call the update room function if a card is clicked
var carInputs = document.getElementsByClassName('card');
for (i = 0; i < carInputs.length; i++) {
	carInputs[i].addEventListener('click', updateCar);
}
//event listener for when a user selects nights/date/extras is clicked
var allInputs = document.getElementsByClassName('addCheck');
for (var i = 0; i < allInputs.length; i++) {
	allInputs[i].addEventListener('click', updateBooking)
}
//creating variable sto check the date select is only a present date
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1; //January is 0
var yyyy = today.getFullYear();
if (dd < 10) {
	dd = '0' + dd
}
if (mm < 10) {
	mm = '0' + mm
}
today = yyyy + '-' + mm + '-' + dd;
document.getElementById("dateInput").setAttribute("min", today);