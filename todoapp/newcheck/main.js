const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".footer button.clearAllBtn");
const undoBtn = document.querySelector(".footer button.undoBtn");


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


//storing deleted showTasks
function storeDeleted(listArr,index) {
    let getLocalStorageUndo = localStorage.getItem("New Removed");
    if(getLocalStorageUndo == null) {
        removedTasks = [];
    } else {
        removedTasks = JSON.parse(getLocalStorageUndo);
    }
    removedTasks.push(listArr[index]);
    localStorage.setItem("New Removed", JSON.stringify(removedTasks));
    
    showTasks();

    
}

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

    //activating undo button
    if(listArr.length > 0) {
        undoBtn.classList.add("active");
    } else {
        undoBtn.classList.remove("active");
    }

    let newLiTag = "";
    listArr.forEach((element, index) => {
        newLiTag += `<li class="levelOne">${element}<span class="dropIcon" onclick = "dropdown(${index})"><i class="fas fa-plus-circle"></i></span><span class="deleteIcon" onclick = "deleteTask(${index})"><i class="fas fa-trash"></i></span></li>`;
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
   //storing deletedTask
   storeDeleted(listArr,index);
   //deleting a particular li index
   listArr.splice(index, 1);
   //updating the list
    localStorage.setItem("New Todo", JSON.stringify(listArr));
    showTasks();
    undoBtn.classList.add("active");
}


//deleting all tasks
deleteAllBtn.onclick = () => {
    //empty array
    listArr = [];
    //updating the list
    localStorage.setItem("New Todo", JSON.stringify(listArr));
    showTasks();
}

//undo button 

undoBtn.onclick = () => {
    let getLocalStorage = localStorage.getItem("New Todo");
    if(getLocalStorage == null) {
        listArr = [];
    } else {
        listArr = JSON.parse(getLocalStorage);
    }
    let getLocalStorageUndo = localStorage.getItem("New Removed");
    if(getLocalStorageUndo == null) {
        removedTasks = [];
    } else {
        removedTasks = JSON.parse(getLocalStorageUndo);
    }

    listArr.push(removedTasks.at(-1));
    let newLiTag = "";
    listArr.forEach((element, index) => {
        newLiTag += `<li class="levelOne">${element}<span class="dropIcon" onclick = "dropdown(${index})"><i class="fas fa-plus-circle"></i></span><span class="deleteIcon" onclick = "deleteTask(${index})"><i class="fas fa-trash"></i></span></li>`;
    });
    //adding new li tag inside ul tag
    todoList.innerHTML = newLiTag;
     
    localStorage.setItem("New Todo", JSON.stringify(listArr));
    removedTasks.pop();
    localStorage.setItem("New Removed", JSON.stringify(removedTasks));
    
    showTasks();

}   
    

     
function dropdown(index) {
    //  function dropdown(index, dropIcon) {
        let getLocalStorage = localStorage.getItem("New Todo");
        if(getLocalStorage == null) {
            listArr = [];
        } else {
            listArr = JSON.parse(getLocalStorage);
        }
        let getLocalStorageContent = localStorage.getItem("New Content");
        if(getLocalStorageContent == null) {
            contentArr = listArr[index][0];
        } else {
            contentArr = JSON.parse(getLocalStorageContent);
        }



        

        showContent();
        
        contentArr.push(newContent);
        localStorage.setItem("New Content", JSON.stringify(contentArr));
}

function showContent() {
        let getLocalStorage = localStorage.getItem("New Todo");
        if(getLocalStorage == null) {
            listArr = [];
        } else {
            listArr = JSON.parse(getLocalStorage);
        }
        let getLocalStorageContent = localStorage.getItem("New Content");
        if(getLocalStorageContent == null) {
            contentArr = listArr[index][0];
        } else {
            contentArr = JSON.parse(getLocalStorageContent);
        }  

        let newContent = "";
        contentArr.forEach((element) => {
            newContent += `<li class="levelTwo" contenteditable="true">${element}</li>`;
        });
        todoList.innerHTML = newContent;
}
        
    

