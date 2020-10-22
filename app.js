const submitBtn = document.getElementById('submit-btn');
const resultContainer = document.getElementById('result-container');
let inputField = document.getElementById('input-field');
let tasks, actives,overTasks;
//Load the content when the page is refreshed
document.addEventListener('DOMContentLoaded', contentLoad);
//Intialise event litsener for submit button
submitBtn.addEventListener('click', function (e) {
    if(inputField.value!=="")
    {
    addToStorage(inputField.value);
    }else{
        alert("Please enter some task to proced");
    }
    e.preventDefault();
});
//Initialise for enter button to trigger on input field
inputField.addEventListener('keyup', function (e) {
    if (e.keyCode === 13&&inputField.value!=="") {
        e.preventDefault();
        addToStorage(inputField.value);
    }else
    if(e.keyCode===13){
        alert("Please enter some task to proced");
    }
});
//Add to storage when any value is added
function addToStorage(task) {
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    addValues(task);
}
//Add the active work in the app to storage
function addToStorageActives(activeTask) {
    if (localStorage.getItem('actives') === null) {
        actives = [];
    } else {
        actives = JSON.parse(localStorage.getItem('actives'));
    }

    if (!actives.includes(activeTask.toString())) {
        actives.push(activeTask.toString());
    }
    localStorage.setItem('actives', JSON.stringify(actives));
}
//Add the completed work in the app to storage
function addToStorageCompleted(completedTask) {
    if (localStorage.getItem('overTasks') === null) {
        overTasks = [];
    } else {
        overTasks = JSON.parse(localStorage.getItem('overTasks'));
    }

    if (!overTasks.includes(completedTask.toString())) {
        overTasks.push(completedTask.toString());
    }
    localStorage.setItem('overTasks', JSON.stringify(overTasks));
}
//Function for content to load on to the page
function contentLoad() {
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
        actives = [];
        overTasks=[];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
        actives = JSON.parse(localStorage.getItem('actives'));
        overTasks = JSON.parse(localStorage.getItem('overTasks'));
    }
    //This will loop over the local storage to get the data form local storage and load it into the DOM
    tasks.forEach(function (task) {
        let row = document.createElement('div');
        let number = document.createElement('span');
        let innerTask = document.createElement('span');
        let buttons = document.createElement('span');
        let completed = document.createElement('span');
        let deleted = document.createElement('span');

        row.className = "row-task";
        number.className = "number";
        innerTask.className = "inner-task";
        buttons.className = "buttons";
        completed.className = "completed";
        deleted.className = "deleted";

        number.innerHTML = "<i class='fa fa-circle' aria-hidden='true'></i>";
        innerTask.innerText = task;
        completed.innerHTML = "<i class='fa fa-check' aria-hidden='true'></i>";
        deleted.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';

        buttons.append(completed);
        buttons.append(deleted);
        row.append(number);
        row.append(innerTask);
        row.append(buttons);

        resultContainer.appendChild(row);
    });
    //This will loop over the local storage to check if any active work on the list or not to load to the DOM
    actives.forEach(function (active) {
        if (tasks.includes(active)) {
            let color = tasks.indexOf(active);
            let numberAc = document.querySelectorAll('.fa-circle');
            numberAc[color].classList.add('active-task');
        }
    });
     //This will loop over the local storage to check if any completed work on the list or not to load to the DOM
     overTasks.forEach(function (completed) {
        if (tasks.includes(completed)) {
            let color = tasks.indexOf(completed);
            let completedAc = document.querySelectorAll('.inner-task');
            completedAc[color].classList.add('line-through');
        }
    });
}
//MAin function to add the data to the DOM
function addValues(task) {
    let row = document.createElement('div');
    let number = document.createElement('span');
    let innerTask = document.createElement('span');
    let buttons = document.createElement('span');
    let completed = document.createElement('span');
    let deleted = document.createElement('span');

    row.className = "row-task";
    number.className = "number";
    innerTask.className = "inner-task";
    buttons.className = "buttons";
    completed.className = "completed";
    deleted.className = "deleted";


    number.innerHTML = "<i class='fa fa-circle' aria-hidden='true'></i>";
    innerTask.innerText = task;
    completed.innerHTML = "<i class='fa fa-check' aria-hidden='true'></i>";
    deleted.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';

    buttons.append(completed);
    buttons.append(deleted);
    row.append(number);
    row.append(innerTask);
    row.append(buttons);

    resultContainer.appendChild(row);

    inputField.value = "";
}
//Check the delete , completed and active buttons triggers
document.body.addEventListener('click', function (e) {
    if (e.target.parentElement.classList.contains('deleted')) {
        e.target.parentElement.parentElement.parentElement.remove();
        deleteFromStorage(e.target.parentElement.parentElement.parentElement);
        deleteFromStorageActives(e.target.parentElement.parentElement.parentElement.textContent);
        deleteFromStorageCompleted(e.target.parentElement.parentElement.parentElement.textContent);
    }
    if (e.target.parentElement.classList.contains('completed')) {
        if(!e.target.parentElement.parentElement.parentElement.children[1].classList.contains('line-through'))
        {
            e.target.parentElement.parentElement.parentElement.children[1].classList.add('line-through');
            addToStorageCompleted(e.target.parentElement.parentElement.parentElement.children[1].textContent);
        }else{
            e.target.parentElement.parentElement.parentElement.children[1].classList.remove('line-through');
            deleteFromStorageCompleted(e.target.parentElement.parentElement.parentElement.children[1].textContent);
        }
    }
    checkActive(e);
});
//Function to delete the values from the storage
function deleteFromStorage(taskItem) {
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function (task, index) {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
//Function to delete the actives from the local storage
function deleteFromStorageActives(activeItem) {
    if (localStorage.getItem('actives') === null) {
        actives = [];
    } else {
        actives = JSON.parse(localStorage.getItem('actives'));
    }
    actives.forEach(function (active, index) {
        if (activeItem === active) {
            actives.splice(index, 1);
        }
    });
    localStorage.setItem('actives', JSON.stringify(actives));
}
//Function to delete the completed from the local storage
function deleteFromStorageCompleted(completedItem) {
    if (localStorage.getItem('overTasks') === null) {
        overTasks = [];
    } else {
        overTasks = JSON.parse(localStorage.getItem('overTasks'));
    }
    overTasks.forEach(function (completed, index) {
        if (completedItem === completed) {
            overTasks.splice(index, 1);
        }
    });
    localStorage.setItem('overTasks', JSON.stringify(overTasks));
}
//This will trigger when we click the clear all task and calls the clear function
document.querySelector('.clear').addEventListener('click', () => {
    while (resultContainer.firstChild) {
        resultContainer.removeChild(resultContainer.firstChild);
    }
    clearAll();
});
//Function to check the active toggle of the button
function checkActive(e) {
    if (e.target.classList.contains('active-task') && e.target.classList.contains('fa-circle')) {
        e.target.classList.remove('active-task');
        deleteFromStorageActives(e.target.parentElement.parentElement.children[1].textContent);
    } else
    if (e.target.classList.contains('fa-circle')) {
        e.target.classList.add('active-task');
        addToStorageActives(e.target.parentElement.parentElement.children[1].textContent);
    }
}
//Functin to clear the local store fully
function clearAll() {
    localStorage.clear();
}