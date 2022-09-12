const data = [
  {
    id: "0",
    name: "Ivan",
    age: "34",
  },
  {
    id: "1",
    name: "Marina",
    age: "35",
  },
  {
    id: "2",
    name: "Demian",
    age: "4",
  },
];

const dataArchive = [];

const element = document.querySelector(".table");
const archive = document.querySelector(".archive");
const input = document.querySelector(".input");
const btn = document.querySelector(".input-button");

if (data.length > 0) {
  displayList();
}

function addItem(item) {
  data.push({ name: item, age: "1" });
  console.log(data);
  displayList();
}
function delItem(index) {
  data.splice(index, 1);
  console.log(data);
  displayList();
}
function editItem(item) {
  data.splice(item.id, 1, item);
  displayList();
}
function addToArchive(item) {
  dataArchive.push(item);
  console.log(dataArchive);
  displayList();
}

btn.addEventListener("click", (e) => {
  e.preventDefault();
  addItem(input.value);
  input.value = "";
});

function displayList() {
  let task = "";
  let taskArchive = "";
  if (data.length > 0) {
    data.forEach((user, index) => {
      task += `<div name="${user.name}" age="${user.age}" attdiv="${index}" class="table_inside">${user.name} ${user.age}
    <button name="${user.name}" age="${user.age}" attbutton="${index}" type="button" class="button__edit"> Edit </button>
    <button name="${user.name}" age="${user.age}" attbutton="${index}" type="button" class="button"> Delete </button>
    <button name="${user.name}" age="${user.age}" attbutton="${index}" type="button" class="button__archive">Archive</button>
    </div>`;
      element.innerHTML = task;
    });
  } else {
    element.innerHTML = "NONE";
  }
  if (dataArchive.length > 0) {
    dataArchive.forEach((user, index) => {
      taskArchive += `<div name="${user.name}" age="${user.age}" attdiv="${index}" class="table_inside">${user.name} ${user.age}
    <button name="${user.name}" age="${user.age}" attbutton="${index}" type="button" class="button__edit"> Edit </button>
    </div>`;
      archive.innerHTML = taskArchive;
    });
  } else {
    archive.innerHTML = "NONE";
  }
}

element.addEventListener("click", function (e) {
  if (e.target.closest(".button")) {
    const attValue = e.target.closest(".button").getAttribute("attbutton");
    console.log(e.target.closest(".button"), attValue);
    delItem(attValue);
  }
  if (e.target.closest(".button__edit")) {
    const attValue = e.target
      .closest(".button__edit")
      .getAttribute("attbutton");
    const editItem = e.target.closest(".button__edit").getAttribute("name");
    const editElement = document.querySelector(`[attdiv = "${attValue}"]`);
    console.log(editItem, editElement);
    const taskToEdit = `<input attinput="${attValue}" value="${editItem}" class="input__edit" type="text"/><button attbutton="${attValue}" class="button__save" type="button">Save</button>`;
    editElement.innerHTML = taskToEdit;
  }
  if (e.target.closest(".button__save")) {
    const inputEdit = document.querySelector(".input__edit");
    const attValue = e.target
      .closest(".button__save")
      .getAttribute("attbutton");
    editItem({ id: attValue, name: inputEdit.value, age: 5 });
    console.log("SAVE");
  }
  if (e.target.closest(".button__archive")) {
    const attValue = e.target
      .closest(".button__archive")
      .getAttribute("attbutton");
    const archiveItem = {
      id: e.target.closest(".button__archive").getAttribute("attbutton"),
      name: e.target.closest(".button__archive").getAttribute("name"),
      age: e.target.closest(".button__archive").getAttribute("age"),
    };
    delItem(attValue);
    addToArchive(archiveItem);
  }
});

const category = ["Task", "Random thoughts", "Idea"];

let taskData = {
  1662907031392: {
    id: 1662907031392,
    name: "Shopping list",
    createdAt: new Date().toLocaleDateString(),
    category: "Task",
    content: "Tomatoes, bread",
    dates: "",
  },
  1662907031393: {
    id: 1662907031393,
    name: "The theory",
    createdAt: new Date().toLocaleDateString(),
    category: "Random thoughts",
    content: "The theory ...",
    dates: "",
  },
  1662907031394: {
    id: 1662907031394,
    name: "New feature",
    createdAt: new Date().toLocaleDateString(),
    category: "Idea",
    content: "Implement new feature",
    dates: "11/9/2022, 12/9/2022",
  },
};

let taskDataArchive = {};

const taskTableBody = document.querySelector(".tasktable__body");
const taskArchiveBody = document.querySelector(".archivetable__body");
const summaryBody = document.querySelector(".summarytable__body")
const workSheet = document.querySelector(".worksheet");

if (Object.keys(taskData).length > 0) {
  displayTaskList();
}

function addTaskToArchive(item) {
  taskDataArchive = { ...taskDataArchive, [item]: taskData[item] };
  displayTaskList();
}
function delTaskFromTable(item) {
  delete taskData[item];
  displayTaskList();
}
function addTaskToTable(item) {
  taskData = { ...taskData, [item]: taskDataArchive[item] };
  displayTaskList();
}
function delTaskFromArchive(item) {
  delete taskDataArchive[item];
  displayTaskList();
}
function editTask(item) {
  taskData = { ...taskData, [item.id]: item };
  displayTaskList();
}
function addTask(item) {
  taskData = { ...taskData, [item.id]: item };
  displayTaskList();
}

function displayTaskList() {
  let taskStr = "";
  let archiveTaskStr = "";
  let summaryStr = ""
  if (Object.keys(taskData).length > 0) {
    Object.values(taskData).forEach((task, index) => {
      taskStr += `
        <tr dataTr=${task.id}>
          <td>${task.name}</td>
          <td>${task.createdAt}</td>
          <td>${task.category}</td>
          <td>${task.content}</td>
          <td>${task.dates}</td>
          <td>
            <button data=${task.id} type="button" class="tasktable__body_button_edit">Edit</button>
            <button data=${task.id} type="button" class="tasktable__body_button_delete">Delete</button>
            <button data=${task.id} type="button" class="tasktable__body_button_archive">Archive</button>
          </td>
        </tr>`;
      taskTableBody.innerHTML = taskStr;
    });
  } else {
    taskTableBody.innerHTML = "NONE";
  }
  if (Object.keys(taskDataArchive).length > 0) {
    Object.values(taskDataArchive).forEach((task, index) => {
      archiveTaskStr += `
        <tr dataTr=${task.id}>
          <td>${task.name}</td>
          <td>${task.createdAt}</td>
          <td>${task.category}</td>
          <td>${task.content}</td>
          <td>${task.dates}</td>
          <td>
            <button data=${task.id} type="button" class="tasktable__body_button_unarchive">Unarchive</button>
          </td>
        </tr>`;
      taskArchiveBody.innerHTML = archiveTaskStr;
    });
  } else {
    taskArchiveBody.innerHTML = "NONE";
  }
  const summaryTable = category.reduce((acc, rec, index) => {
    return {
      ...acc,
      [rec]: Object.values(taskData).filter((it) => it.category === rec).length,
    };
  }, {});

  const summaryTableArchive = category.reduce((acc, rec, index) => {
    return {
      ...acc,
      [rec]: Object.values(taskDataArchive).filter((it) => it.category === rec).length,
    };
  }, {});
  const summaryAll = category.reduce((acc,rec) => {
    return {...acc, [rec]: {active: summaryTable[rec], archived: summaryTableArchive[rec]}}
  },{})

  console.log(summaryTable, summaryTableArchive, summaryAll);

  Object.entries(summaryAll).forEach((item, index) => {
    summaryStr += `
        <tr>
          <td>${item[0]}</td>
          <td>${item[1].active}</td>
          <td>${item[1].archived}</td>
        </tr>`;
    summaryBody.innerHTML = summaryStr;
  })


}

workSheet.addEventListener("click", function (e) {
  if (e.target.closest(".tasktable__body_button_delete")) {
    const attValue = e.target
      .closest(".tasktable__body_button_delete")
      .getAttribute("data");
    delTaskFromTable(attValue);
  }
  if (e.target.closest(".tasktable__body_button_archive")) {
    const attValue = e.target
      .closest(".tasktable__body_button_archive")
      .getAttribute("data");
    addTaskToArchive(attValue);
    delTaskFromTable(attValue);
  }
  if (e.target.closest(".tasktable__body_button_unarchive")) {
    const attValue = e.target
      .closest(".tasktable__body_button_unarchive")
      .getAttribute("data");
    addTaskToTable(attValue);
    delTaskFromArchive(attValue);
  }
  if (e.target.closest(".tasktable__body_button_edit")) {
    const attValue = e.target
      .closest(".tasktable__body_button_edit")
      .getAttribute("data");
    const editTableItem = document.querySelector(`[dataTr = "${attValue}"]`);
    const taskToEdit = `
      <td><input dataInputEdit=${attValue} type="text" name="name" value=${taskData[attValue].name} /></td>
      <td>...</td>
      <td><input dataInputEdit=${attValue} type="text"  name="category" value=${taskData[attValue].category} /></td>
      <td><input dataInputEdit=${attValue} type="text" name="content" value=${taskData[attValue].content} /></td>
      <td>...</td>
      <td> <button data=${attValue} type="button" class="tasktable__body_button_save">Save</button></td>`;
    editTableItem.innerHTML = taskToEdit;
  }
  if (e.target.closest(".tasktable__body_button_save")) {
    const attValue = e.target
      .closest(".tasktable__body_button_save")
      .getAttribute("data");
    const inputEditValue = document.querySelectorAll(
      `[dataInputEdit = "${attValue}"]`
    );
    let itemEdit = {};
    inputEditValue.forEach((it) => {
      itemEdit = {
        ...itemEdit,
        [it.name]: it.value,
        id: attValue,
        createdAt: new Date(parseInt(attValue)).toLocaleDateString(),
        dates: "",
      };
    });
    editTask(itemEdit);
  }
  if (e.target.closest(".worksheet__button_addNewTask")) {
    const attValue = +new Date();
    console.log(attValue);
    const addTableItem = document.querySelector(".addTaskTable");
    const taskToAdd = `
      <div class="addTaskTable__inputField">
       <input dataInputAdd=${attValue} type="text" name="name" placeholder="Task name"/>
       <input dataInputAdd=${attValue} type="text" name="category" placeholder="Task category" />
       <input dataInputAdd=${attValue} type="text" name="content" placeholder="Task content" />
       <button data=${attValue} type="button" class="worksheet__button_add">Add</button>
      </div>`;
    addTableItem.innerHTML = taskToAdd;
  }
  if (e.target.closest(".worksheet__button_add")) {
    const attValue = e.target
      .closest(".worksheet__button_add")
      .getAttribute("data");
    const inputAddValue = document.querySelectorAll(
      `[dataInputAdd = "${attValue}"]`
    );
    const addTableItem = document.querySelector(".addTaskTable");
    const taskToAdd = `<button type="button" class="worksheet__button_addNewTask"> Add new task </button>`;
    let itemAdd = {};
    inputAddValue.forEach((it) => {
      itemAdd = {
        ...itemAdd,
        [it.name]: it.value,
        id: attValue,
        createdAt: new Date(parseInt(attValue)).toLocaleDateString(),
        dates: "",
      };
    });
    addTask(itemAdd);
    addTableItem.innerHTML = taskToAdd;
  }
});
