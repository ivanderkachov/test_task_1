//Initial Data

const category = ["Task", "Random thoughts", "Idea"];

let taskData = {
  1662907031392: {
    id: 1662907031392,
    name: "Shopping list",
    createdAt: new Date(1662907031392).toLocaleDateString(),
    category: "Task",
    content: "Tomatoes, bread",
    dates: "",
  },
  1662907031393: {
    id: 1662907031393,
    name: "The theory",
    createdAt: new Date(1662907031393).toLocaleDateString(),
    category: "Random thoughts",
    content: "The theory ...",
    dates: "",
  },
  1662907031394: {
    id: 1662907031394,
    name: "New feature",
    createdAt: new Date(1662907031394).toLocaleDateString(),
    category: "Idea",
    content: "Implement new feature",
    dates: "",
  },
};

let taskDataArchive = {};

const taskTableBody = document.querySelector(".tasktable__body");
const taskArchiveBody = document.querySelector(".archivetable__body");
const summaryBody = document.querySelector(".summarytable__body");
const workSheet = document.querySelector(".worksheet");

//Functions

//get Dates from content field

function getDates(str) {
  const cond = /\s|\n/;
  if (str.length > 0) {
    const arr = str
      .split(cond)
      .map((it) => +new Date(it))
      .filter((it) => typeof it === "number" && it)
      .sort()
      .map((it) => new Date(it).toLocaleDateString())
      .join(", ");
    return arr;
  } else {
    return "";
  }
}

//Count summary for active and archived tasks

function summary() {
  let summaryStr = "";
  const summaryTable = category.reduce((acc, rec, index) => {
    return {
      ...acc,
      [rec]: Object.values(taskData).filter((it) => it.category === rec).length,
    };
  }, {});

  const summaryTableArchive = category.reduce((acc, rec, index) => {
    return {
      ...acc,
      [rec]: Object.values(taskDataArchive).filter((it) => it.category === rec)
        .length,
    };
  }, {});
  const summaryAll = category.reduce((acc, rec) => {
    return {
      ...acc,
      [rec]: { active: summaryTable[rec], archived: summaryTableArchive[rec] },
    };
  }, {});

  Object.entries(summaryAll).forEach((item, index) => {
    summaryStr += `
        <tr>
          <td class="summarytable__body_name">${item[0]}</td>
          <td>${item[1].active}</td>
          <td>${item[1].archived}</td>
        </tr>`;
    summaryBody.innerHTML = summaryStr;
  });
}

// Display initial data

if (Object.keys(taskData).length > 0) {
  displayTaskList();
}

// Edit, delete, archive, add functions

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

// Display function

function displayTaskList() {
  let taskStr = ""
  let archiveTaskStr = ""
  let none = ""
  let noneArch = ""
  if (Object.keys(taskData).length > 0) {
    const sortedTaskData = Object.keys(taskData).sort((a, b) => b - a).reduce((acc, rec) => {
      return {...acc, [rec]: taskData[rec]}
    },{})
    Object.values(sortedTaskData).forEach((task, index) => {
      taskStr += `
        <tr dataTr=${task.id}>
          <td class="tasktable__body_name">${task.name}</td>
          <td>${task.createdAt}</td>
          <td>${task.category}</td>
          <td>${task.content}</td>
          <td class="tasktable__body_dates">${task.dates}</td>
          <td class="tasktable__body_buttons">
            <button data=${task.id} type="button" class="tasktable__body_button_edit">Edit</button>
            <button data=${task.id} type="button" class="tasktable__body_button_delete">Delete</button>
            <button data=${task.id} type="button" class="tasktable__body_button_archive">Archive</button>
          </td>
        </tr>`;
      taskTableBody.innerHTML = taskStr;
    });
  } else {
    none += `<div class="none"> ... </div>`
    taskTableBody.innerHTML = none;
  }
  if (Object.keys(taskDataArchive).length > 0) {
    const sortedTaskDataArchive = Object.keys(taskDataArchive).sort((a, b) => b - a).reduce((acc, rec) => {
      return {...acc, [rec]: taskDataArchive[rec]}
    },{})
    Object.values(sortedTaskDataArchive).forEach((task, index) => {
      archiveTaskStr += `
        <tr dataTr=${task.id}>
          <td class="archivetable__body_name">${task.name}</td>
          <td>${task.createdAt}</td>
          <td>${task.category}</td>
          <td>${task.content}</td>
          <td class="archivetable__body_dates">${task.dates}</td>
          <td>
            <button data=${task.id} type="button" class="tasktable__body_button_unarchive">Unarchive</button>
          </td>
        </tr>`;
      taskArchiveBody.innerHTML = archiveTaskStr;
    });
  } else {
    noneArch += `<div class="none"> ...</div>`;
    taskArchiveBody.innerHTML = noneArch;
  }
  summary();
}

// Add event listener for buttons

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
      <td>
        <input dataInputEdit=${attValue} maxlength="20" type="text" name="name" value="${taskData[attValue].name}" />
      </td>
      <td>...</td>
      <td>
        <select dataInputEdit=${attValue} type="text"  name="category" value=${taskData[attValue].category} />
          ${category.map((it) => {
            return `<option ${it === taskData[attValue].category ? "selected" : ""}>${it}</option>`;
          })}
        </select>
      </td>
      <td><textarea dataInputEdit=${attValue} type="text" name="content" value=${taskData[attValue].content} />${taskData[attValue].content}</textarea></td>
      <td>...</td>
      <td> <button data=${attValue} type="button" class="tasktable__body_button_save">Save</button></td>`;
    editTableItem.innerHTML = taskToEdit;
  }
  if (e.target.closest(".tasktable__body_button_save")) {
    const attValue = e.target
      .closest(".tasktable__body_button_save")
      .getAttribute("data");
    const contentValue = document.querySelector('[name="content"]').value
    const inputEditValue = document.querySelectorAll(`[dataInputEdit = "${attValue}"]`);
    let itemEdit = {};
    inputEditValue.forEach((it) => {
      itemEdit = {
        ...itemEdit,
        [it.name]: it.value,
        id: attValue,
        createdAt: new Date(parseInt(attValue)).toLocaleDateString(),
        dates: getDates(contentValue),
      };
    });
    editTask(itemEdit);
  }
  if (e.target.closest(".worksheet__button_addNewTask")) {
    const attValue = +new Date();
    const addTableItem = document.querySelector(".addTaskTable");
    const taskToAdd = `
      <div class="addTaskTable__inputField">
       <input dataInputAdd=${attValue} maxlength="20" type="text" name="name" placeholder="Task name"/>
       <select dataInputAdd=${attValue} name="category" />
          ${category.map((it, index) => {
            return `<option >${it}</option>`;
          })}
        </select>
       <textarea dataInputAdd=${attValue} type="text" name="content" placeholder="Task content" /></textarea>
       <button data=${attValue} type="button" class="worksheet__button_add">Add</button>
      </div>`;
    addTableItem.innerHTML = taskToAdd;
  }
  if (e.target.closest(".worksheet__button_add")) {
    const attValue = e.target
      .closest(".worksheet__button_add")
      .getAttribute("data");
    const inputAddValue = document.querySelectorAll(`[dataInputAdd = "${attValue}"]`);
    const contentValue = document.querySelector('[name="content"]').value;
    const addTableItem = document.querySelector(".addTaskTable");
    const taskToAdd = `<button type="button" class="worksheet__button_addNewTask"> Add new task </button>`;
    let itemAdd = {};
    inputAddValue.forEach((it) => {
      itemAdd = {
        ...itemAdd,
        [it.name]: it.value===''?'...':it.value,
        id: attValue,
        createdAt: new Date(parseInt(attValue)).toLocaleDateString(),
        dates: getDates(contentValue),
      };
    });
      addTask(itemAdd);
      addTableItem.innerHTML = taskToAdd;
  }
});
