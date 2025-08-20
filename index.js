const inputbox = document.getElementById("display");
const listC = document.getElementById("list-c");

function addTask() {
  if (inputbox.value === '') {
    alert("You must write something!");
  } else {
    let li = document.createElement("li");
    li.textContent = inputbox.value;

    let span = document.createElement("span");
    span.innerHTML = `<img src="icons/x-icon.svg" alt="Delete" class="delete-icon">`;
    li.appendChild(span);

    listC.appendChild(li);
    saveData();
  }
  inputbox.value = "";
}

listC.addEventListener("click", function(e) {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("checked");
    saveData(); // 
  } else if (e.target.tagName === "SPAN" || e.target.tagName === "IMG") {
    e.target.closest("li").remove();
    saveData(); //
  }
}, false);

function saveData(){
  localStorage.setItem("data", listC.innerHTML);
}

function showTask(){
  listC.innerHTML = localStorage.getItem("data") || "";
}

showTask();