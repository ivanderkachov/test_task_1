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

const element = document.querySelector(".table");
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
}


btn.addEventListener('click', (e) => {
  e.preventDefault()
  addItem(input.value)
  input.value=''
})

function displayList() {
  let task = ''
  console.log(data.length)
  if (data.length > 0) {
      data.forEach((user, index) => {
        task += `<div attdiv="${index}" class="table_inside">${user.name} ${user.age}
    <button attbutton="${index}" type="button" class="button__edit"> Edit </button>
     <button attbutton="${index}" type="button" class="button"> Delete </button>
    </div>`;
        element.innerHTML = task;
      });
  } else {
    element.innerHTML = "NONE";
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
    const editElement = document.querySelector(`[attdiv = "${attValue}"]`)
    console.log(editElement)
    const taskToEdit = `<input attinput="${attValue}" class="input__edit" type="text"/><button attbutton="${attValue}" class="button__save" type="button">Save</button>`
    editElement.innerHTML = taskToEdit
  }
  if (e.target.closest(".button__save")) {
    const inputEdit = document.querySelector('.input__edit')
    const attValue = e.target.closest(".button__save").getAttribute("attbutton")
    editItem({id: attValue, name: inputEdit.value, age: 5})
    displayList()
    console.log("SAVE");
  }
})

