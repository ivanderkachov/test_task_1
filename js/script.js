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
]

const dataArchive = []

const element = document.querySelector(".table");
const archive = document.querySelector(".archive")
const input = document.querySelector(".input");
const btn = document.querySelector(".input-button");


if (data.length > 0) {
  displayList()
}

function addItem (item) {
  data.push({name: item, age: "1"})
  console.log(data);
  displayList()
}
function delItem(index) {
  data.splice(index,1)
  console.log(data)
  displayList();
}
function editItem(item) {
  data.splice(item.id, 1, item)
  displayList();
}
function addToArchive(item) {
  dataArchive.push(item)
  console.log(dataArchive)
  displayList();
}

btn.addEventListener('click', (e) => {
  e.preventDefault()
  addItem(input.value)
  input.value=''
})

function displayList() {
  let task = ''
  let taskArchive = ''
  console.log(data.length)
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


element.addEventListener('click', function (e) {

  if (e.target.closest('.button')) {
    const attValue = e.target.closest('.button').getAttribute('attbutton')
    console.log(e.target.closest('.button'), attValue)
    delItem(attValue)
  }
  if (e.target.closest('.button__edit')) {
    const attValue = e.target.closest(".button__edit").getAttribute("attbutton");
    const editItem = e.target.closest(".button__edit").getAttribute("name");
    const editElement = document.querySelector(`[attdiv = "${attValue}"]`)
    console.log(editItem, editElement)
    const taskToEdit = `<input attinput="${attValue}" value="${editItem}" class="input__edit" type="text"/><button attbutton="${attValue}" class="button__save" type="button">Save</button>`
    editElement.innerHTML = taskToEdit
  }
  if (e.target.closest(".button__save")) {
    const inputEdit = document.querySelector('.input__edit')
    const attValue = e.target.closest(".button__save").getAttribute("attbutton")
    editItem({id: attValue, name: inputEdit.value, age: 5})
    console.log("SAVE");
  }
  if (e.target.closest(".button__archive")) {
    const attValue = e.target.closest(".button__archive").getAttribute("attbutton");
    const archiveItem = {
      id: e.target.closest(".button__archive").getAttribute("attbutton"),
      name: e.target.closest(".button__archive").getAttribute("name"),
      age: e.target.closest(".button__archive").getAttribute("age"),
    };
    delItem(attValue)
    addToArchive(archiveItem)
  }
})

