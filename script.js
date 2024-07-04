const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    if (inputBox.value === '') {
        alert("You must write something.");
    } else {
        let li = document.createElement("li");
        li.textContent = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.textContent = "\u00D7";
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();
}

listContainer.addEventListener("click", function(e) {
    if (e.target.tagName.toLowerCase() === "li") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName.toLowerCase() === "span") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData() {
    let tasks = [];
    listContainer.querySelectorAll('li').forEach(li => {
        tasks.push({
            text: li.firstChild.textContent,
            checked: li.classList.contains('checked')
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function showTask() {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    if (tasks) {
        tasks.forEach(task => {
            let li = document.createElement("li");
            li.textContent = task.text;
            if (task.checked) {
                li.classList.add("checked");
            }
            let span = document.createElement("span");
            span.textContent = "\u00D7";
            li.appendChild(span);
            listContainer.appendChild(li);
        });
    }
}

showTask();
