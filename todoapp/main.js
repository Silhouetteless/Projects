const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".footer button");

inputBox.onkeyup = ()=> {
    //users value:
    let userData = inputBox.value;
    if(userData.trim() != 0) { //if user values aren't only spaces
        addBtn.classList.add("active");/*from inputField button.active*/ 
    } else {
        addBtn.classList.remove("active");
    }
}

//calling showTask function to have the changes saved after refreshing the page
showTasks();

//after clicking add button:
addBtn.onclick = ()=> {
    let userData = inputBox.value;
    let getLocalStorage = localStorage.getItem("New Todo");
    if(getLocalStorage == null) {
        listArr = [];
    } else {
        //JSON string => js object
        listArr = JSON.parse(getLocalStorage);
    }
    listArr.push(userData);
    //js object => JSON string
    localStorage.setItem("New Todo", JSON.stringify(listArr));
    //calling showTask function
    showTasks();
    addBtn.classList.remove("active");
}

//adding tasks inside ul
function showTasks() {
    let getLocalStorage = localStorage.getItem("New Todo");
    if(getLocalStorage == null) {
        listArr = [];
    } else {
        //JSON string => js object
        listArr = JSON.parse(getLocalStorage);
    }

    //setting pending tasks number
    const pendingNum = document.querySelector(".pendingNum");
    pendingNum.textContent = listArr.length;

    //activating delete all button
    if(listArr.length > 0) {
        deleteAllBtn.classList.add("active");
    } else {
        deleteAllBtn.classList.remove("active");
    }

    let newLiTag = "";
    listArr.forEach((element, index) => {
        newLiTag += `<li>${element}<span onclick = "deleteTask(${index})"><i class="fas fa-trash"></i></span></li>`;
    });
    //adding new li tag inside ul tag
    todoList.innerHTML = newLiTag;
    //cleaning input field
    inputBox.value = "";
}

//deleting tasks
function deleteTask(index) {
   let getLocalStorage = localStorage.getItem("New Todo");
   listArr = JSON.parse(getLocalStorage);
   //deleting a particular li index
   listArr.splice(index, 1);
   //updating the list
    localStorage.setItem("New Todo", JSON.stringify(listArr));
    showTasks();
}


//deleting all tasks
deleteAllBtn.onclick = () => {
    //empty array
    listArr = [];
    //updating the list
    localStorage.setItem("New Todo", JSON.stringify(listArr));
    showTasks();
}