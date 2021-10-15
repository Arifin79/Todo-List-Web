// Element

const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".footer button");

inputBox.onkeyup = () => {
    let userEnteredValue = inputBox.value;
    if(userEnteredValue.trim() != 0){ //mengecek value apakah sudah di input
        addBtn.classList.add("active"); //active btn
    }else{
        addBtn.classList.remove("active") //unactive btn
    }
}

showTask();

addBtn.onclick = () => { // ketika user click button +
    let userEnteredValue = inputBox.value; // mengambil value yang di input
    let getLocalStorageData = localStorage.getItem("New Todo"); // get localstorage
    if(getLocalStorageData == null){ // mengecek apakah data kosong
        listArray = []; // membuat array kosong
    } else {
        listArray = JSON.parse(getLocalStorageData)
    }
    listArray.push(userEnteredValue); // menambah data value ke array
    localStorage.setItem("New Todo", JSON.stringify(listArray)); // mengubah json object ke 
    showTask();
    addBtn.classList.remove("active") // unactive btn
}

function showTask(){
    let getLocalStorageData = localStorage.getItem("New Todo");
    if(getLocalStorageData == null){
        listArray = [];
    } else {
        listArray = JSON.parse(getLocalStorageData);
    }
    const pendingTaskNumb = document.querySelector(".pendingTask")
    pendingTaskNumb.textContent = listArray.length;
    if(listArray.length > 0) {
        deleteAllBtn.classList.add("active")
    } else {
        deleteAllBtn.classList.remove("active")
    }
    let newLiTag = "";
    listArray.forEach((element, index) => {
        newLiTag += `<li>${element}<span class="icon" onclick="deleteTask(${index})">
        <i class="fas fa-trash"></i></span></li>`;
    });
    todoList.innerHTML = newLiTag;
    inputBox.value = "";
}

function deleteTask(index){
    let getLocalStorageData = localStorage.getItem("New Todo");
    listArray = JSON.parse(getLocalStorageData);
    listArray.splice(index,1)
    localStorage.setItem("New Todo", JSON.stringify(listArray))
    showTask();
}

deleteAllBtn.onclick = ()=> {
    let getLocalStorageData = localStorage.getItem("New Todo")
    if(getLocalStorageData == null){
        listArray = [];
    } else {
        listArray = JSON.parse(getLocalStorageData);
        listArray = [];
    }

    localStorage.setItem("New Todo", JSON.stringify(listArray));
    showTask();
}