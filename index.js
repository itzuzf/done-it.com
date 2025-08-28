document.getElementById("add-btn").addEventListener("click", addTask);

// تحميل التاسكات أول ما الصفحة تفتح
window.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
  const input = document.getElementById("display");
  const taskText = input.value.trim();
  if (taskText === "") return;

  const task = {
    text: taskText,
    checked: false
  };

  createTaskElement(task);
  saveTask(task);

  input.value = "";
}

function createTaskElement(task) {
  const list = document.getElementById("list-c");

  const li = document.createElement("li");
  li.className = "task";

  // checkbox بالصور
  const checkImg = document.createElement("img");
  checkImg.src = task.checked ? "icons/checked-box.svg" : "icons/unchecked-box.svg";
  checkImg.alt = "checkbox";

  // toggle check/uncheck
  checkImg.addEventListener("click", () => {
    task.checked = !task.checked;
    checkImg.src = task.checked ? "icons/checked-box.svg" : "icons/unchecked-box.svg";
    updateStorage();
  });

  // النص
  const span = document.createElement("span");
  span.textContent = task.text;

  // زرار الحذف
  const delBtn = document.createElement("button");
  delBtn.className = "delete-btn";

  const delIcon = document.createElement("img");
  delIcon.src = "icons/remove-icon.svg";
  delIcon.alt = "remove";

  delBtn.appendChild(delIcon);

  delBtn.addEventListener("click", () => {
    li.remove();
    deleteTask(task);
  });

  // تجميع العناصر
  li.appendChild(checkImg);
  li.appendChild(span);
  li.appendChild(delBtn);

  list.appendChild(li);
}

function saveTask(task) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => {
    createTaskElement(task);
  });
}

function updateStorage() {
  const tasks = [];
  document.querySelectorAll("#list-c .task").forEach(li => {
    const text = li.querySelector("span").textContent;
    const checked = li.querySelector("img").src.includes("checked-box.svg");
    tasks.push({ text, checked });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function deleteTask(taskToDelete) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter(task => task.text !== taskToDelete.text);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
