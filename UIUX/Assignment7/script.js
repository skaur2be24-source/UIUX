.
const taskForm = document.getElementById("taskForm");
const taskTitle = document.getElementById("taskTitle");
const taskDescription = document.getElementById("taskDescription");
const taskList = document.getElementById("taskList");

let tasks = [];
let nextId = 1;

// Add a new task
taskForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const title = taskTitle.value.trim();
    const description = taskDescription.value.trim();

    if (title === "" || description === "") {
        alert("Please enter both title and description.");
        return;
    }

    const task = {
        id: nextId++,
        title: title,
        description: description,
        completed: false,
        editing: false
    };

    tasks.push(task);
    taskForm.reset();
    displayTasks();
});

// Display all tasks
function displayTasks() {
    taskList.innerHTML = "";

    tasks.forEach(function(task) {
        const taskDiv = document.createElement("div");
        taskDiv.className = "task";

        const title = document.createElement("h3");
        title.textContent = task.title;

        const description = document.createElement("p");
        description.textContent = task.description;

        // Apply line-through when completed
        if (task.completed) {
            title.classList.add("completed");
            description.classList.add("completed");
        }

        taskDiv.appendChild(title);
        taskDiv.appendChild(description);

        // Edit mode
        if (task.editing) {
            const titleInput = document.createElement("input");
            titleInput.value = task.title;
            titleInput.placeholder = "Task title";

            const descriptionInput = document.createElement("textarea");
            descriptionInput.value = task.description;
            descriptionInput.placeholder = "Task description";

            const saveButton = document.createElement("button");
            saveButton.textContent = "Save";

            saveButton.addEventListener("click", function() {
                const newTitle = titleInput.value.trim();
                const newDescription = descriptionInput.value.trim();

                if (newTitle === "" || newDescription === "") {
                    alert("Both fields are required.");
                    return;
                }

                task.title = newTitle;
                task.description = newDescription;
                task.editing = false;

                displayTasks();
            });

            taskDiv.appendChild(titleInput);
            taskDiv.appendChild(descriptionInput);
            taskDiv.appendChild(saveButton);

        } else {
            // Complete / Incomplete button
            const completeButton = document.createElement("button");
            completeButton.className = "complete";
            completeButton.textContent = task.completed
                ? "Mark as Incomplete"
                : "Mark as Completed";

            completeButton.addEventListener("click", function() {
                task.completed = !task.completed;
                displayTasks();
            });

            // Edit button
            const editButton = document.createElement("button");
            editButton.className = "edit";
            editButton.textContent = "Edit";

            editButton.addEventListener("click", function() {
                task.editing = true;
                displayTasks();
            });

            // Delete button
            const deleteButton = document.createElement("button");
            deleteButton.className = "delete";
            deleteButton.textContent = "Delete";

            deleteButton.addEventListener("click", function() {
                tasks = tasks.filter(function(item) {
                    return item.id !== task.id;
                });

                displayTasks();
            });

            taskDiv.appendChild(completeButton);
            taskDiv.appendChild(editButton);
            taskDiv.appendChild(deleteButton);
        }

        taskList.appendChild(taskDiv);
    });
}
