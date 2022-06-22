//Build a ToDo App. A user must be able to add and delete a todo item, from the UI and from your storage. Save each todo item as an object, with //a key for the todo text and an "id" key that represents a random number you can use to search it by. So, you should have an //array of objects that you're saving in localStorage.

/*
1. Initialise an array "arrayOfTodoObjects" which will hold the users submitted list. Create a function expression called "createTodoItemAndStorage" that takes a string with many "x" and uses the .replace method on the string to return each "x" in the string as a random number between 0 and 9, to be used with the todo item submitted.

2. Create an object called "newTodoObj" that will store the UUID as value to "id" as well as the todo item to property "todo". The push method is used to store this object inside of the array "arrayOfTodoObjects". We want the array stored in localStorage everytime a new object is created, so at the end of the function setItem() is called on localStorage to store the object after it's been converted to a string.

3. createTodoItemAndStorage and "pushValueToCheckbox" are called inside of the submit button event listener. pushValueToCheckbox is a function that displays the submitted todo items with their own checkbox inside of a div. This div is used so each item is structured neatly by the HTML which aligns the item with flex-row. The forEach method allows us to set the values of the elements assigned to the values of the corresponding object. 

4. The final part of the project I must allow the user to delete the todo items as they wish. For this I initialised "deleteTodoItem" and defined all the checkboxes at the top in an array. forEach is used on this array, with an if statement nested that checks if any of the checkboxes are checked and if the confirmation is true, if so, the following line of code filters any of the objects that do not match the checkbox IDs that are checked, these are then returned to and re-initialised in the original array.

5. The div that holds the checkbox is removed, clearing the item and the space. Then the "ToDo-list" item inside localStorage is overwritten with the new array of object/s. This function is then called inside of the delete button event listener so that everytime the button is clicked the objects that need to be removed, are removed.
*/

let arrayOfTodoObjects = [];

window.onload = () => {
	let arrayOfObjectsForPageLoad = JSON.parse(localStorage.getItem("ToDo-List"));
	console.log(arrayOfObjectsForPageLoad);

	if (arrayOfObjectsForPageLoad) {
		arrayOfObjectsForPageLoad.forEach(obj => {
			let fieldForTodo = document.querySelector(".list");
			const checkboxForTodo = document.createElement("input"); 
			const checkboxLabelAndTodo = document.createElement("label");
			const divForCheckAndLabel = document.createElement("div");
			const containerDivOfTodoItems = document.getElementsByClassName("list")[0];
			containerDivOfTodoItems.classList.add("borderforcontainer");
		 	checkboxForTodo.type = "checkbox";
		 	checkboxForTodo.id = obj.id;
		 	checkboxForTodo.name = "checkbox";
			checkboxLabelAndTodo.setAttribute("for", obj.id);
			checkboxLabelAndTodo.innerText = obj.todo;
		 	fieldForTodo.append(divForCheckAndLabel);
		 	divForCheckAndLabel.append(checkboxForTodo, checkboxLabelAndTodo);
		});
	};
};


const createTodoItemAndStorage = () => {
	let textValueFromInput = document.getElementsByName("text-input")[0].value;
	let uuid = "xxxxxxxxxxxxxxxxxx".replace(/x/g, () => {
		return Math.floor(Math.random() * 9);
	});

	if (textValueFromInput) {
		let newTodoObj = {
			id: parseInt(uuid),
			todo: textValueFromInput,
		};

		arrayOfTodoObjects.push(newTodoObj);

		localStorage.setItem("ToDo-List", JSON.stringify(arrayOfTodoObjects));

	} else {
		alert("You must enter text to display");
	};	

};


const pushTextValueToCheckbox = () => {
	let textValueFromInput = document.getElementsByName("text-input")[0].value;
	let fieldForTodo = document.querySelector(".list");
	const checkboxForTodo = document.createElement("input"); 
	const checkboxLabelAndTodo = document.createElement("label");
	const divForCheckAndLabel = document.createElement("div");
	const containerDivOfTodoItems = document.getElementsByClassName("list")[0];
 	
 	if (textValueFromInput) {
	 	arrayOfTodoObjects.forEach(obj => {
			containerDivOfTodoItems.classList.add("borderforcontainer");
	 		checkboxForTodo.type = "checkbox";
	 		checkboxForTodo.id = obj.id;
	 		checkboxForTodo.name = "checkbox";
	 		checkboxLabelAndTodo.setAttribute("for", obj.id);
	 		checkboxLabelAndTodo.innerText = obj.todo;
	 		fieldForTodo.append(divForCheckAndLabel);
	 		divForCheckAndLabel.append(checkboxForTodo, checkboxLabelAndTodo);
	 	})
	};
};


const deleteTodoItem = () => {
	const form = document.forms[0];
	const checkboxesForTodo = form.querySelectorAll("input[name=checkbox]");
	const confirmation = confirm("Do you really want to delete the selected item/s?");

	checkboxesForTodo.forEach(checkbox => {

		if (checkbox.checked && confirmation) {
			arrayOfTodoObjects = arrayOfTodoObjects.filter(obj => {
				return 	parseInt(checkbox.id) !== obj.id;	
			});

		checkbox.parentElement.remove();
		localStorage.setItem("ToDo-List", JSON.stringify(arrayOfTodoObjects));

		};
	});
};


document.getElementsByName("submit-button")[0].addEventListener("click", e => {
	e.preventDefault();
	createTodoItemAndStorage();
	pushTextValueToCheckbox();
	document.forms[0].reset();
});

document.getElementsByName("delete")[0].addEventListener("click", e => {
	e.preventDefault();
	deleteTodoItem();
});



