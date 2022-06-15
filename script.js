//Build a ToDo App. A user must be able to add and delete a todo item, from the UI and from your storage. Save each todo item as an object, with //a key for the todo text and an "id" key that represents a random number you can use to search it by. So, you should have an //array of objects that you're saving in localStorage.

/*
1. Initialise an array "arrayOfTodoObjects" which will hold the users submitted list. Create a function expression called "createTodoItemAndStorage" that takes a string with many "x" and uses the .replace method on the string to return each "x" in the string as a random number between 0 and 9, to be used with the todo item submitted.

2. Create an object called "newTodoObj" that will store the UUID as value to "id" as well as the todo item to property "todo". The push method is used to store this object inside of the array. We want the array stored in localStorage everytime a new object is created, so at the end setItem() is called on localStorage to store the object after it's been converted to a string.
*/

const arrayOfTodoObjects = [];

let textValueFromInput = document.getElementsByName("text-input")[0].value;



const createTodoItemAndStorage = () => {
	let textValueFromInput = document.getElementsByName("text-input")[0].value;
	let uuid = "xxxxxxxxxxxxxxxxxx".replace(/x/g, () => {
		return Math.floor(Math.random() * 9);
	});

	let newTodoObj = {
		id: parseInt(uuid),
		todo: textValueFromInput,
	};

	arrayOfTodoObjects.push(newTodoObj);

	localStorage.setItem("ToDo-List", JSON.stringify(arrayOfTodoObjects));

};

const pushTextValueToCheckbox = () => {
	let fieldForTodo = document.querySelector(".list");
	const checkboxForTodo = document.createElement("input"); 
	const checkboxLabelAndTodo = document.createElement("label");
	const divForCheckAndLabel = document.createElement("div");
 	
 	arrayOfTodoObjects.forEach(obj => {
 		console.log(obj);
 		checkboxForTodo.type = "checkbox";
 		checkboxForTodo.id = obj.id;
 		checkboxForTodo.name = "checkbox";
 		checkboxLabelAndTodo.setAttribute("for", obj.id);
 		checkboxLabelAndTodo.innerText = obj.todo;
 		fieldForTodo.append(divForCheckAndLabel);
 		divForCheckAndLabel.id = obj.id;
 		divForCheckAndLabel.append(checkboxForTodo, checkboxLabelAndTodo);
 	})
};

const deleteTodoItem = () => {
	const form = document.forms[0];
	const checkboxesForTodo = form.querySelectorAll("input[name=checkbox]");

	checkboxesForTodo.forEach(checkbox => {
		const confirmation = confirm("Do you really want to delete these items?");
		if (checkbox.checked = true && confirmation) {
			checkbox.remove();
					
		}
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



