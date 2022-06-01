let todo; // array of todo list
let numberOfTask;
let fullTask;
let activeTask;
let completedTask;

todo = fetch("./todo.json")
.then(response => {
   return response.json();
})
.then(tasks => {
    // console.log(tasks[0]);
    numberOfTask = tasks.length;
    fullTask = tasks;
    console.log("🚀 ~ file: main.js ~ line 11 ~ numberOfTask", numberOfTask)
    activeTask = filterTask('active', tasks);
    completedTask = filterTask('completed', tasks);
    sortTasks(tasks);
    appendList(tasks);
});


function appendList(tasks) {
    tasks.forEach(task => {
        let li = document.createElement("li");
        let div = document.createElement("div");
        let buttonCheck = document.createElement("button");
        let buttonText = document.createElement("button");
        let buttonCross = document.createElement("button");
        let todo = document.createTextNode(task.task);
        let cross = document.createElement("img");
        let ul = document.querySelector(".todo-wrapper");
        let checkBoxClass = "colored-check";
        let check = document.createElement("img");

        
        div.classList.add("items-wrapper");
        
        buttonCheck.type = "button";
        buttonText.type = "button";
        buttonCross.type = "button";
        
        buttonText.id = `todo-${task.id}`;
        
        buttonCheck.classList.add("check-box");
        buttonText.classList.add("todo-task");
        buttonCross.classList.add("cross-box");
        
        li.classList.add("task-list");

        cross.alt = "close list";
        cross.src = "images/icon-cross.svg";
        check.alt = "mark list";
        check.src = "images/icon-check.svg";
        
        
        buttonText.appendChild(todo);
        
        buttonCross.appendChild(cross);
        div.appendChild(buttonCheck);
        div.appendChild(buttonText);
        li.appendChild(div);
        
        if (task.status === 'completed') {
            buttonCheck.classList.add(checkBoxClass);
            buttonText.classList.add("strike");
            buttonCheck.appendChild(check)
        }

        console.log(task);
        li.appendChild(buttonCross);
        ul.appendChild(li);
    });
}

function sortTasks(tasks) {
    tasks.sort((a, b) => {
        if (a.status < b.status) return -1;
        return 1;
    });
}

function removeList() {
    let taskList = document.querySelectorAll(".task-list");
    console.log(taskList);
    taskList.forEach(taskItem => {
        taskItem.remove();
    });
}

function filterTask(value, tasks) {
    // if value is not equal to 'All'
    if (value !== 'all') {
        let filteredTasks = tasks.filter(
            (tasks) => tasks.status == value
        );
    
        // return the filtered array
        return filteredTasks;

    } else { // if value is equal to 'All', do not filter
        tasks = fullTask;
        return tasks;
    }
}

function toggleTask(value) {
    let tasks = fullTask;
    tasks = filterTask(value, tasks);
    removeList();
    appendList(tasks);

}


// Get the root element
var r = document.querySelector(':root'); // css root variable
let background; // css body background color varaible
let elements; // css elements background color varaible
let outline; // css inputs background color varaible
let text1; // css text color varaible
let text2; // css text color varaible
let text3; // css text color varaible

let themeIcon = document.querySelector('#theme-icon'); // select theme buttons icon
let headerImg = document.querySelector('.header-background'); // select header background image

// let themme be equall to dark mode by default
let theme;
function switchTheme() {
    theme = getCookie('theme');

    if (theme === 'darkMode') { // if its currently on dark mode
        theme = 'lightMode'; // set theme controller variable as 'lightMode'
        themeIcon.src = 'images/icon-moon.svg';
        headerImg.src = 'images/bg-mobile-light.jpg';
    } else {
        theme = 'darkMode'; // set theme controller variable as 'darkMode'
        themeIcon.src = 'images/icon-sun.svg';
        headerImg.src = 'images/bg-mobile-dark.jpg';
    }
    
    setThemeColors(theme);
    setCookie('theme', theme, 30);
    
    console.log(getCookie('theme'));
}

function setThemeColors(theme) {
    // select background color of desired theme
    background = myFunction_get(`${theme}Background`);
    // set background color of the page
    myFunction_set('Background', background);
    
    // select elements color of desired theme
    elements = myFunction_get(`${theme}Elements`);
    // set elements color of the page
    myFunction_set('Elements', elements);
    
    // select outline color of desired theme
    outline = myFunction_get(`${theme}Outline`);
    // set outline color of the page
    myFunction_set('Outline', outline);
    
    // select text1 color of desired theme
    text1 = myFunction_get(`${theme}Text1`);
    // set text1 color of the page
    myFunction_set('Text1', text1);
    
    // select text2 color of desired theme
    text2 = myFunction_get(`${theme}Text2`);
    // set text2 color of the page
    myFunction_set('Text2', text2);
    
    // select text3 color of desired theme
    text3 = myFunction_get(`${theme}Text3`);
    // set text3 color of the page
    myFunction_set('Text3', text3);
    
}

// Create a function for getting a variable value
function myFunction_get(variableName) {
  // Get the styles (properties and values) for the root
  var rs = getComputedStyle(r);
  let variableValue = rs.getPropertyValue(`--${variableName}`);
  return variableValue;
}

// Create a function for setting a variable value
function myFunction_set(variableName, variableValue) {
  // Set the value of variable --blue to another value (in this case "lightblue")
  r.style.setProperty(`--${variableName}`, variableValue);
}

// function to setCookie
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

// functionto get cookie
function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
        c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
        }
    }
    return "";
}

// functionto check cookie
function checkCookie() {
    // get cookie value of theme
    let theme = getCookie("theme");
    // if cookie has not being set before
    if (theme == "") {
        // let default theme be equall to darkMode
        theme = 'darkMode';
        // console.log('running');
        // set cookie
        setCookie('theme', theme, 30)
    }
    // setTheme colors
    setThemeColors(theme);
    
    // if selected theme color is light mode
    if (theme === 'lightMode') {

        themeIcon.src = 'images/icon-moon.svg';
        headerImg.src = 'images/bg-mobile-light.jpg';
    }
}

// check for cookies
checkCookie();