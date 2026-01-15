// 1. Grab the elements we need to talk to (Move to TOP)
const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');

// Before loading the page, we need to load the TodoList from localStorage
const savedTodos = localStorage.getItem('myTodos');
if (savedTodos) {
    const tasks = JSON.parse(savedTodos);
    tasks.forEach(task => {
        createTaskElement(task.text, task.done);
    });
};

function createTaskElement(todoText, done) {
    // --- A. Create elements ---
    const listItem = document.createElement('li');
    const textSpan = document.createElement('span'); //to hold the todo text

    const editButton = document.createElement('button');
    const deleteButton = document.createElement('button');

    textSpan.textContent = todoText;
    textSpan.contentEditable = "false"; // Make it non-editable by default 
    textSpan.classList.add('todo-text'); //For css styling
    
    // Apply "done" style if loading from storage
    if (done) {
        textSpan.classList.add('done');
    }

    editButton.textContent = 'Edit';
    deleteButton.textContent = 'Delete';

    let originalText = ""; // To store original text for canceling edits
    // --- C. Add logic ---


    // Delete Logic
    deleteButton.addEventListener('click', function() {
        listItem.remove();
        saveTasks(); // Save changes after deletion
    });

    // Edit Logic (The Toggle Switch)
    editButton.addEventListener('click', function() {

        if (editButton.textContent === 'Edit') {
            // MODE: edit
            originalText = textSpan.textContent; // Store original text

            textSpan.contentEditable = "true"; // Make it editable
            textSpan.classList.add('editing'); // Add 'Input box' styles
            textSpan.focus(); // Focus cursor
            
            editButton.textContent = 'Save'; // Change button to Save

            textSpan.style.pointerEvents = 'auto'; // Disable "Done" clicking while editing 
        } else{
            // Save changes 

            textSpan.contentEditable = "false"; // Lock
            textSpan.classList.remove('editing'); // Remove 'Input box' styles

            editButton.textContent = 'Edit'; // Change button to Edit
            // The text is Already updated because the user typed directly into the span
            saveTasks(); // Save changes after editing text

            textSpan.style.pointerEvents = 'auto'; // Re-enable "Done" clicking
        }
    });
    
    // Done/Finished clicking logic
    textSpan.addEventListener('click', function() {
        if (textSpan.isContentEditable === false){
            textSpan.classList.toggle('done');
            saveTasks(); // Save changes after marking done/undone
        }
    });

    // --- D. Assemble the item ---
    listItem.appendChild(textSpan);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    list.appendChild(listItem);
    // Removed saveTasks() from here to avoid loop on load
}

form.addEventListener('submit', function(event) {

    event.preventDefault(); // Prevent form submission

    const todoText = input.value;
    if (todoText === "") {
        alert("Please enter smth.");
        return;
    }
    createTaskElement(todoText, false);
    saveTasks(); // Save explicitly when user adds
    
    // Cleanup
    input.value = '';
});

function saveTasks() {
    const tasks = [];

    // 1. Loop through every LI in UL
    document.querySelectorAll('#todo-list li').forEach(li => {
        const textSpan = li.querySelector('.todo-text');

        tasks.push({
            text: textSpan.textContent,
            done: textSpan.classList.contains('done')
        });
    });

    localStorage.setItem('myTodos', JSON.stringify(tasks));
}
