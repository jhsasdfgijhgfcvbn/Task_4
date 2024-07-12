var btns = document.querySelectorAll(".btns button");
var penTaskFilter = document.querySelector("#penTaskFilter");
var comTaskFilter = document.querySelector("#comTaskFilter");
var showChange = document.querySelector(".showChange");
var todoscontainer = document.querySelector(".todoscontainer");
var pendingTodos = document.querySelector(".pendingTodos");
var completeTodos = document.querySelector(".completeTodos");
var todoList = document.querySelectorAll(".todoList");
var addInputField = document.querySelector(".addInputField");
var editInputField = document.querySelector(".editInputField");
var addTaskBtn = document.querySelector(".addTask");
var saveTaskBtn = document.querySelector(".saveTask");
var pending = document.querySelector(".pending");
var completeTasks = document.querySelector(".completeTask");
var notification = document.querySelector(".notification");
var deleteAllPenTodos = document.querySelector(".penTodos button");
var deleteAllComTodos = document.querySelector(".comTodos button");
var pendingNum = document.querySelector(".pendingNum");
var completeNum = document.querySelector(".completeNum");

btns[0].addEventListener("click", () => {
    showChange.style.left = "0";
    btns[0].style.pointerEvents = "none";
    btns[1].style.pointerEvents = "auto";
    penTaskFilter.style.display = "block";
    comTaskFilter.style.display = "none";
    pendingTodos.style.display = "block";
    completeTodos.style.display = "none";
    todoList.forEach((todo) => {
        todo.offsetHeight >= 320 ? todo.classList.add("overflow") : todo.classList.remove("overflow");
    });
});
btns[1].addEventListener("click", () => {
    showChange.style.left = "50%";
    btns[1].style.pointerEvents = "none";
    btns[0].style.pointerEvents = "auto";
    penTaskFilter.style.display = "none";
    comTaskFilter.style.display = "block";
    pendingTodos.style.display = "none";
    completeTodos.style.display = "block";
    todoList.forEach((todo) => {
        todo.offsetHeight >= 320 ? todo.classList.add("overflow") : todo.classList.remove("overflow");
    });
});

addInputField.addEventListener("keyup", () => {
    var inputval = addInputField.value;
    if (inputval.trim() != 0) {
        addTaskBtn.classList.add('active');
        addTaskBtn.disabled = false;  // Enable the button
    }
    else {
        addTaskBtn.classList.remove('active');
        addTaskBtn.disabled = true;  // Disable the button
    }
});

function showNotification(text, id) {
    notification.textContent = text;
    notification.classList.add(`${id}`);
    setTimeout(() => {
        notification.textContent = "";
        notification.classList.remove(`${id}`);
    }, 1500);
}
showtask();

//function for saving data to local storage
addTaskBtn.onclick = () => {
    let userData = addInputField.value;
    let getLocalStorageData = localStorage.getItem("Pending Todos");
    if (getLocalStorageData == null) {
        listArr = [];
    }
    else {
        listArr = JSON.parse(getLocalStorageData);
    }
    listArr.push(userData);
    localStorage.setItem("Pending Todos", JSON.stringify(listArr));
    addInputField.value = "";
    addTaskBtn.disabled = true;  // Disable the button after adding the task
    showtask();
    showNotification("Todo is added successfully", "success");
}

//function for showing data from local storage
function showtask() {
    let getLocalStorageData = localStorage.getItem("Pending Todos");
    if (getLocalStorageData == null) {
        listArr = [];
    }
    else {
        listArr = JSON.parse(getLocalStorageData);
    }

    pendingNum.textContent = listArr.length;
    if (listArr.length > 1) {
        deleteAllPenTodos.classList.add("active");
    }
    else {
        deleteAllPenTodos.classList.remove("active");
    }

    let newTodos = "";
    listArr.forEach((element, index) => {
        newTodos += `<li>${element}<div class="action">
        <button onclick="editTask(${index})"><i class="fa-solid fa-pen-to-square"></i></button>
        <button onclick="completeTask(${index})"><i class="fa-regular fa-square-check"></i></button>
        <button onclick="deleteTask(${index})"><i class="fa-solid fa-trash"></i></button></div></li>`;
    });

    pending.innerHTML = newTodos;
    addInputField.value = "";
    todoList.forEach((todo) => {
        todo.offsetHeight >= 320 ? todo.classList.add("overflow") : todo.classList.remove("overflow");
    });
}

//function for deleting task
function deleteTask(index) {
    if (confirm("Are you sure you want to delete this task?")) {
        let getLocalStorageData = localStorage.getItem("Pending Todos");
        listArr = JSON.parse(getLocalStorageData);
        listArr.splice(index, 1);
        //after removing we need to update the local storage
        localStorage.setItem("Pending Todos", JSON.stringify(listArr));
        showtask();
        showNotification("Task is Deleted Successfully", "danger");
    }
}

//function for deleting all pending tasks
deleteAllPenTodos.addEventListener("click", () => {
    if (confirm("Are you sure you want to delete all pending tasks?")) {
        listArr = [];
        localStorage.setItem("Pending Todos", JSON.stringify(listArr));
        showtask();
        showNotification("All Tasks are Deleted Successfully", "danger");
    }
})

//function for editing task
function editTask(index) {
    editInputField.value = index;
    let getLocalStorageData = localStorage.getItem("Pending Todos");
    let listArr = JSON.parse(getLocalStorageData);
    addInputField.value = listArr[index];
    addTaskBtn.style.display = "none";
    saveTaskBtn.style.display = "block";
}

//save todo after editing
saveTaskBtn.addEventListener("click", () => {
    let getLocalStorageData = localStorage.getItem("Pending Todos");
    let listArr = JSON.parse(getLocalStorageData);
    let val = editInputField.value;
    listArr[val] = addInputField.value;
    addTaskBtn.style.display = "block";
    saveTaskBtn.style.display = "none";
    localStorage.setItem("Pending Todos", JSON.stringify(listArr));
    addInputField.value = "";
    addTaskBtn.classList.remove('active');
    addTaskBtn.disabled = true;  // Disable the button after saving the task
    showtask();
    showNotification("Task is Edited Successfully", "success");
})

showCompletedTask();

//completed task function
function completeTask(index) {
    let getLocalStorageData = localStorage.getItem("Pending Todos");
    let listArr = JSON.parse(getLocalStorageData);
    let complete = listArr.splice(index, 1);
    localStorage.setItem("Pending Todos", JSON.stringify(listArr));
    showtask();

    complete.forEach((element) => {
        comArr.push(element);
    })

    localStorage.setItem("Complete Todos", JSON.stringify(comArr));
    showCompletedTask();
    showNotification("You have successfully completed one task", "success");
}

//function for showing completed tasks
function showCompletedTask() {
    let getLocalStorageData = localStorage.getItem("Complete Todos");
    if (getLocalStorageData == null) {
        comArr = [];
    }
    else {
        comArr = JSON.parse(getLocalStorageData);
    }

    completeNum.textContent = comArr.length;
    if (comArr.length > 1) {
        deleteAllComTodos.classList.add("active");
    }
    else {
        deleteAllComTodos.classList.remove("active");
    }

    let completeTask = "";
    comArr.forEach((element, index) => {
        completeTask += `<li>${element}<div class="action com">
        <button onclick="back(${index})"><i class="fa-solid fa-xmark"></i></button>
        <button onclick="comDeleteTask(${index})"><i class="fa-solid fa-trash"></i></button>
        </div></li>`;
    });
    completeTasks.innerHTML = completeTask;
}

//delete completed todo
function comDeleteTask(index) {
    if (confirm("Are you sure you want delete todo?")) {
        let getLocalStorageData = localStorage.getItem("Complete Todos");
        let comArr = JSON.parse(getLocalStorageData);
        comArr.splice(index, 1);

        //after deleting update the array
        localStorage.setItem("Complete Todos", JSON.stringify(comArr));
        showCompletedTask();
        showNotification("Delete one task from completed task", "danger");
    }
}

//delete all completed todos
deleteAllComTodos.addEventListener("click", () => {
    if (confirm("Are you sure you want to delete all completed tasks?")) {
        comArr = [];
        localStorage.setItem("Complete Todos", JSON.stringify(comArr));
        showCompletedTask();
        showNotification("All Completed Tasks are Deleted Successfully", "danger");
    }
})

//back todo from completed task to pending todo
function back(index) {
    let getLocalStorageData = localStorage.getItem("Complete Todos");
    let comArr = JSON.parse(getLocalStorageData);
    let backTodo = comArr.splice(index, 1);
    localStorage.setItem("Complete Todos", JSON.stringify(comArr));
    showCompletedTask();
    backTodo.forEach(back => {
        listArr.push(backTodo);
    })

    localStorage.setItem("Pending Todos", JSON.stringify(listArr));
    showtask();
}

//filter pending tasks
function filterPenTask() {
    let filterInput = document.querySelector("#penTaskFilter").value.toUpperCase();
    let li = pending.querySelectorAll('li');

    li.forEach(todo => {
        if (todo) {
            let textValue = todo.textContent || todo.innerHTML;
            if (textValue.toUpperCase().indexOf(filterInput) > -1) {
                todo.style.display = "";
            }
            else {
                todo.style.display = "none";
            }
        }
    });
}

//filter completed tasks
function filterCompleteTask() {
    let filterInput = document.querySelector("#comTaskFilter").value.toUpperCase();
    let li = completeTasks.querySelectorAll('li');

    li.forEach(todo => {
        if (todo) {
            let textValue = todo.textContent || todo.innerHTML;
            if (textValue.toUpperCase().indexOf(filterInput) > -1) {
                todo.style.display = "";
            }
            else {
                todo.style.display = "none";
            }
        }
    });
}
