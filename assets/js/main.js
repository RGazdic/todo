//Fetch all data on page load
fetch('https://jsonplaceholder.typicode.com/todos')
.then(function(data){
	return data.json()
})
.then(function(data){
	var counter = 0; 
	var counterMax = 20; // Display 20 items only
	var result = document.getElementById('todo-list')
	data.forEach(todo => {
		if (counter<counterMax){
			addTodo(todo.title,todo.completed);
		}
		counter++;
	});
});


// Selector
const todoInput = document.querySelector('.add-input');
const todoList = document.querySelector('.todo-list ul');
const todoNew = document.querySelector('.new-task');
const todoAdd = document.querySelector('.add-task');
const deleteButton = document.querySelector('.delete-todo');
const checkButton = document.querySelector('.checkTodo');
const confirmYes = document.querySelector('.confirm-yes');
const confirmNo = document.querySelector('.confirm-no');
const menu = document.querySelector('.menu');
const menuIcon = document.querySelector('.menu-icon');



// Event listeners
todoNew.addEventListener('click',displayForm);
todoList.addEventListener('click',optionsTodo);
todoAdd.addEventListener('click',addTodo);
menuIcon.addEventListener('click',showMenu);



// Functions

// Create new todo
function addTodo(title,status){

	// li item
	const todoItem = document.createElement('li');

	// Todo Title 
	const text = document.createElement('span');
	text.classList.add('title');
	text.innerText = title.length > 0 ? title : todoInput.value;
	todoItem.appendChild(text); // Append to parrent

	// Options div
	const optionsDiv = document.createElement('div');
	optionsDiv.classList.add('options');

	// Delete button
	const deleteButton = document.createElement('button')
	deleteButton.classList.add('delete-todo','far','fa-trash-alt')
	optionsDiv.appendChild(deleteButton); // Append to parrent

	// Mark as done button
	const doneButton = document.createElement('button');
	doneButton.classList.add('check-todo', 'fas', 'fa-check');
	optionsDiv.appendChild(doneButton); // Append to parrent

	// Edit button
	const editButton = document.createElement('button');
	editButton.classList.add('edit-todo', 'fas', 'fa-pen');
	optionsDiv.appendChild(editButton); // Append to parrent

	todoItem.appendChild(optionsDiv); // Append to parrent

	// Append to list if value not empty
	if (todoInput.value != "" || title != ""){
		todoList.appendChild(todoItem);

		// Clear input value
		todoInput.value = "";

		// Change style for add & insert buttons
		todoInput.style.display = 'none';
		todoAdd.style.display = 'none';
		todoNew.style.display = 'block';
	}
}

// Handles all interaction with todo (edit,delete,finish)
function optionsTodo(e){
	const item = e.target;

	// Delete todo
	if (item.classList[0] === 'delete-todo') {
		const todo = item.parentElement;
		todo.querySelector('button').style.display = 'block';

		// Append confirmation box to item
		const confirmBox = document.createElement('div');
		confirmBox.classList.add('confirm');
		confirmBox.innerHTML = '<p>Are you sure?</p><br> <span class="confirm-yes">Yes</span> <span class="confirm-no">No</span>';
		todo.querySelector('.delete-todo').appendChild(confirmBox);
	}

	// Mark todo as done
	else if (item.classList[0] === 'check-todo') {
		const todo = item.parentElement.parentElement;
		const title = todo.querySelector('.title');
		title.style.textDecoration === 'line-through'? title.style.textDecoration = 'none' : title.style.textDecoration = 'line-through';
	}

	// Confirm delete
	else if (item.classList[0] === 'confirm-yes') {
		item.parentElement.parentElement.parentElement.parentElement.remove();
	}

	// Quit delete
	else if(item.classList[0] === 'confirm-no'){
		document.querySelectorAll('.delete-todo').forEach(e => e.style.display = 'none');
		document.querySelectorAll('.confirm').forEach(e => e.remove());
	
	}

	// Edit todo
	else if(item.classList[0] === 'edit-todo'){
		
		document.querySelectorAll('.edit').forEach(e => e.remove()); //Remove open edit fields so that user can edit one field at once

		const todo = item.parentElement.parentElement; // Todo item
		const todoText = todo.querySelector('.title').innerText; // Load current todo value

		// Parent div
		const editForm = document.createElement('div');
		editForm.classList.add('edit'); 
		
		// Input
		const editFormField = document.createElement('textarea');
		editFormField.classList.add('editFieldInput');
		editFormField.value = todoText;
		editForm.appendChild(editFormField); // Append to parrent


		// Save button
		const saveFormBtn = document.createElement('button');
		saveFormBtn.classList.add('save');
		saveFormBtn.innerText = 'Update';
		editForm.appendChild(saveFormBtn);

		todo.appendChild(editForm); // Append to parrent
	}	

	// Save todo
	else if(item.classList[0] === 'save'){
		const editValue = item.parentElement.querySelector('.editFieldInput').value;
		const todo = item.parentElement.parentElement;
		
		const span = todo.querySelector('.title'); // Find todo title
		span.innerText = editValue; // Update title

		todo.querySelector('.edit').remove(); // Remove edit box
		
	}
}


function displayForm(){
	todoInput.style.display = 'block';
	todoAdd.style.display = 'block';
	todoNew.style.display = 'none';
}

function showMenu(){
	console.log(menu.style.display);
	menu.style.display === 'block' ? menu.style.display = 'none' : menu.style.display = 'block';
}