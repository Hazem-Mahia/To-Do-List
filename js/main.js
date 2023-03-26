let input = document.querySelector('.input');
let submit = document.querySelector('.add');
let tasksDiv = document.querySelector('.taskes');

let arrayOfTasks = [];

if (localStorage.getItem("tasks")) {
    arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}

getData();


// Add task 
submit.onclick = function () {
    if (input.value != "") {
        addTaskToArray(input.value);
        input.value = "";
    } else {

    }
}

tasksDiv.addEventListener("click", (e) => {
    if (e.target.classList.contains("delate")) {
        delateTask(e.target.parentElement.getAttribute("data-id"));
        e.target.parentElement.remove();
    }
    if (e.target.classList.contains('task')) {
        toggleState(e.target.getAttribute("data-id"))
        e.target.classList.toggle("done");
    }
})

function addTaskToArray(taskText) {
    const task = {
        id: Date.now(),
        title: taskText,
        completed: false,
    };
    arrayOfTasks.push(task);
    addTaskTopage(arrayOfTasks);
    addDataToLocalStorage(arrayOfTasks);
};

function addTaskTopage(arrayOfTasks) {
    tasksDiv.innerHTML = "";

    arrayOfTasks.forEach(task => {
        let div = document.createElement("div");
        div.className = "task";
        if (task.completed) {
            div.className = "task done";
        } else { }
        div.setAttribute("data-id", task.id);
        div.appendChild(document.createTextNode(task.title));
        let sapn = document.createElement("span");
        sapn.className = "delate";
        sapn.appendChild(document.createTextNode("Delate"));
        div.appendChild(sapn);
        tasksDiv.appendChild(div);
    });
}


function addDataToLocalStorage(arrayOfTasks) {
    window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

function getData() {
    let data = window.localStorage.getItem("tasks");
    if (data) {
        let tasks = JSON.parse(data);
        addTaskTopage(tasks);
    }
}

function delateTask(taskid) {
    arrayOfTasks = arrayOfTasks.filter((tast) => tast.id != taskid);
    addDataToLocalStorage(arrayOfTasks);
}

function toggleState(taskid) {
    for (let i = 0; i < arrayOfTasks.length; i++) {
        if (arrayOfTasks[i].id == taskid) {
            arrayOfTasks[i].completed == false ?arrayOfTasks[i].completed = true : arrayOfTasks[i].completed = false;
        }
    }
    addDataToLocalStorage(arrayOfTasks);

}