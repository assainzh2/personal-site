// 1. Grab the elements we need to talk to
const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');

form.addEventListener('submit', function(event) {

    event.preventDefault(); // Prevent form submission

    const todoText = input.value;
    if (todoText === "") {
        alert("Please enter smth.");
        return;
    }

    // --- A. Create elements ---
    const listItem = document.createElement('li');
    const textSpan = document.createElement('span'); //to hold the todo text
    const inputBox = document.createElement('input'); //the hidden edit box

    const editButton = document.createElement('button');
    const deleteButton = document.createElement('button');
    const cancelEditButton = document.createElement('button');
    cancelEditButton.textContent = 'X';

    // --- B. configure elements ---
    textSpan.textContent = todoText;

    // Configure the hidden input
    inputBox.type = 'text';
    inputBox.style.display = 'none'; //hidden by default
    cancelEditButton.style.display = 'none'; // Hidden by default

    editButton.textContent = 'Edit';
    deleteButton.textContent = 'Delete';

    // --- C. Add logic ---


    // Delete Logic
    deleteButton.addEventListener('click', function() {
        listItem.remove();
    });

    // Edit Logic (The Toggle Switch)
    editButton.addEventListener('click', function() {
        if (editButton.textContent === 'Edit') {
            // MODE: view
            inputBox.value = textSpan.textContent; //Copy current text to input box

            textSpan.style.display = 'none'; // HIde text
            inputBox.style.display = 'inline-block'; // Show input box
            cancelEditButton.style.display = 'inline-block'; // Show cancel button

            editButton.textContent = 'Save'; // Change button to Save
        } else{
            // MODE: Edit
            textSpan.textContent = inputBox.value; // Update text

            textSpan.style.display = 'inline'; //Show text
            inputBox.style.display = 'none'; // Hide input box
            cancelEditButton.style.display = 'none'; // Hide cancel button
            editButton.textContent = 'Edit'; // Change button to Edit
        }
    });

    // Cancel Edit Logic
    cancelEditButton.addEventListener('click', function() {
        // Revert to view mode without saving changes
        textSpan.style.display = 'inline'; //Show text
        inputBox.style.display = 'none'; // Hide input box


        cancelEditButton.style.display = 'none'; // Hide cancel button
        editButton.textContent = 'Edit'; // Change button to Edit

        inputBox.value = textSpan.textContent; // Reset input box value
    });

    // Done by clicking logic
    textSpan.addEventListener('click', function() {
        textSpan.classList.toggle('done');
    });

    // --- D. Assemble the item ---
    listItem.appendChild(textSpan);
    listItem.appendChild(inputBox);
    listItem.appendChild(editButton);
    listItem.appendChild(cancelEditButton);
    listItem.appendChild(deleteButton);

    list.appendChild(listItem);

    // --- E. Cleanup ---
    input.value = '';
});
