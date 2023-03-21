const taskInput = document.querySelector("input");
const taskBox = document.querySelector(".task-box");
const filters = document.querySelectorAll(".filters span");
const clearAll = document.querySelector(".clear")

let editId;
let isEditedTask = false;

let todos = JSON.parse(localStorage.getItem("todo-list"));

filters.forEach(btn =>{
    btn.addEventListener("click",()=>{
        document.querySelector("span.active").classList.remove("active");
        btn.classList.add("active");
        showTodo(btn.id);
    });
});


function showTodo(filter){
    let li = "";
    todos.forEach((todo,id)=>{
        let isCompleted = todo.status == "completed" ? "checked" : "";
        if(filter == todo.status || filter =="all") { //also after loading the webpage; the completed status will not be reloaded.
            li += `
            <li class="task">
                <label for="${id}">
                    <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${isCompleted}>
                    <p class="${isCompleted}">${todo.name}</p>  
                </label>
                <div class="setting">
                    <img src="./svg/dot.svg" class="task-img" alt="">
                    <div class="task-icons">
                        <span id="edit-span" onclick="editTask(${id}, '${todo.name}')"><img src="./svg/edit.svg" id="edit" alt="">
                            <p>Edit</p>
                        </span>
                        <span id="delete-span" onclick="deleteTask(${id})"><img src="./svg/delete.svg" id="delete" alt="">
                            <p>Delete</p>
                        </span>
                    </div>
                </div>
            </li>`
        }
    });
    taskBox.innerHTML = li || `<span style="color:grey">You don't have any task here</span>`;
}
showTodo("all"); //adding "add" to keep the content even after refresh

function editTask(taskId, taskName) {
    editId = taskId;
    isEditedTask = true;
    taskInput.value = taskName;
}

function deleteTask(id) {
    todos.splice(id, 1);
    localStorage.setItem("todo-list",JSON.stringify(todos));  //To store arrays or objects, you would have to convert them to strings.
    showTodo("all");
}

clearAll.addEventListener("click",(id)=>{
    todos.splice(id, 1);
    localStorage.setItem("todo-list",JSON.stringify(todos));  //To store arrays or objects, you would have to convert them to strings.
    showTodo("all");
})

function updateStatus(selectedTask){
    let taskName = selectedTask.parentElement.lastElementChild;

    if(selectedTask.checked){
        taskName.classList.add("checked");
        console.log(selectedTask.id)
        todos[selectedTask.id].status = "completed";
    }else{
        taskName.classList.remove("checked");
        todos[selectedTask.id].status = "pending";
    }
    localStorage.setItem("todo-list",JSON.stringify(todos));
}

taskInput.addEventListener("keyup",e=>{
    let userTask = taskInput.value.trim(); 
    if(e.key == "Enter" && userTask){
        if(!isEditedTask){
            if(!todos){
                todos =[];
            }
            let taskInfo = {name :userTask, status :"pending"};
            todos.push(taskInfo); 
        }else{
            isEditedTask = false;
            todos[editId].name = userTask;
        }
        taskInput.value=""
        localStorage.setItem("todo-list",JSON.stringify(todos));
        showTodo("all");
    }
})

