

//Date
const data = new Date();
const day = data.getDate();
const month = data.getMonth() + 1;
const year = data.getFullYear();

const $CURRENT_DATA = document.querySelector(".currentData");
$CURRENT_DATA.textContent = `${day}.${month}.${year}.`;



//new consts

const popupBtns = document.querySelectorAll(".CreateCard");
const body = document.querySelector("body");
const popup = document.querySelector (".CreateTaskPopup");


//Open popup
const openPopup = () => {
  popup.classList.toggle("active");
  body.style.overflow = "hidden";
  body.style.paddingRight = scrollPadding;
};

popupBtns.forEach ((item) => {
  item.addEventListener("click", openPopup);
});


//Close popup

const ClosePopupBtn = document.querySelector(".CreateTaskPopup__close");

const closePopup = ()=> {
  popup.classList.toggle("active");
  body.style.overflow = "auto";
  body.style.paddingRight = 0;
};

ClosePopupBtn.addEventListener("click",closePopup);

//click on the dark area
popup.addEventListener("click", (e)=> {
  if(!e.target.closest(".CreateTaskPopup__content")){
      closePopup(e.target.closest(".CreateTaskPopup"));
  }
});

let scrollPadding = window.innerWidth - popup.offsetWidth + "px";
console.log(scrollPadding);

//Make an object
let form = document.querySelector("form");
let DoneBtn = form.querySelector(".CreateTaskPopup__btn");
let inputTitle = form.querySelector(".taskName");
let inputDescription = form.querySelector(".taskDescription");
let inputPerson = form.querySelector(".taskPerson");
let inputDeadline = form.querySelector(".taskDeadline");
let tasksWrapper = document.querySelector(".CardsWrapper");
const wrappers  = document.querySelectorAll(".CardsWrapper");

let toDo = [];
let inProgress = [];
let completed = [];


function CreateTask() {
let CreateObject = {
  title:inputTitle.value,
  description:inputDescription.value,
  person:inputPerson.value,
  deadline: inputDeadline.value,
  id:getCardId(toDo).toString()
};

///Get id to delete and move objects

function getCardId(toDo) {
  id = 0;
  for (let item of toDo) {
    if (item ['id'] >= id) {
      id = item ['id'];
      id++;
    }
  }
  return id;
}

console.log(CreateObject);
toDo.push(CreateObject);
console.log(toDo);

toDoCounter();


const render = ()=> {
  return template = `
  <div class="item" id =${id} draggable="true">
  <div class="item__top">
    <div class="item__taskName">${inputTitle.value}</div>
    <i class="fa-solid fa-paperclip"></i>
  </div>
  <div class="item__description">${inputDescription.value}</div>
  <div class="item__person">${inputPerson.value}</div>
 <div class="item__bottom">
  <div class="item__deadline">${inputDeadline.value}</div>
  <i class="fa-solid fa-trash-can" id =${id}></i>
 </div>
</div>
  `;
};

const createTemplate = ()=> {
  tasksWrapper.innerHTML += render(CreateObject);
};
createTemplate();

closePopup();

inputTitle.value= "";
inputDescription.value= "";
inputPerson.value="";
inputDeadline.value="";
}

pinTask = ()=> {
  pinBtns = document.querySelectorAll('.fa-paperclip');
  items = document.querySelectorAll('.item');
console.log(pinBtns);
 
  pinBtns.forEach(btn => {
    btn.addEventListener('click', (event) => {
        event.target.closest('.item').classList.toggle('pinned');
    });
  });
};


DoneBtn.addEventListener("click", (e)=> {
  e.preventDefault();
  CreateTask();
  pinTask();
});


///counters

toDoCounter =()=> {
  totalToDo = document.querySelector("#total__1");
  totalToDo.innerHTML= "";
  totalToDo.innerHTML += toDo.length;
};

inProgressCounter =()=> {
  totalInProgress = document.querySelector("#total__2");
  totalInProgress.innerHTML= "";
  totalInProgress.innerHTML += inProgress.length;
};

completedCounter = ()=> {
  totalCompleted = document.querySelector("#total__3");
  totalCompleted.innerHTML="";
  totalCompleted.innerHTML += completed.length;
};
//Drag and drop


function dragDrop (){
  const items = document.querySelectorAll(".item");
  const wrappers  = document.querySelectorAll(".CardsWrapper");
  
  let dragged = null;

  items.forEach(item => {
    item.classList.add('1');
    console.log(item);
    item.addEventListener('dragstart', dragstart);
    item.addEventListener('dragend', dragend);
  });

  function dragstart() {
    console.log("dragstart");
    dragged = this;
  }

  function dragend() {
    console.log("dragend");
    dragged= null;
  }

  wrappers.forEach(wrapper => {
    wrapper.addEventListener('dragover', dragover);
    wrapper.addEventListener('dragenter', dragenter);
    wrapper.addEventListener('dragleave', dragleave);
    wrapper.addEventListener('drop',drop);
  });

  function dragover(e) {
    e.preventDefault();
  }
  function dragenter() {
    console.log('dragenter');
  }
  function dragleave() {
    console.log('dragleave');
  }
  function drop() {
    this.appendChild(dragged);

    ///Move objects

    moveObjects = () => {
      items.forEach(item => {
        if(item.parentElement.id === "2"&& item.classList.contains('1')){
          toDo.forEach(elem => {
            if(elem.id === item.id){
              toDo.splice(elem.index, 1);
              inProgress.push(elem);
              console.log(toDo);
              console.log(inProgress);
              toDoCounter();
              inProgressCounter();
              item.classList.remove('1');
              item.classList.add('2');
              console.log(item);
            }
            });
        }
        if(item.parentElement.id === "2"&& item.classList.contains('3')){
          completed.forEach(elem => {
            if(elem.id === item.id){
              completed.splice(elem.index, 1);
              inProgress.push(elem);
              console.log(completed);
              console.log(inProgress);
              completedCounter();
              inProgressCounter();
              item.classList.remove('3');
              item.classList.add('2');
              console.log(item);
            }
            });
        }
      if(item.parentElement.id === "3" && item.classList.contains('2')){
        inProgress.forEach(elem => {
          if(elem.id === item.id){
            inProgress.splice(elem.index, 1);
            completed.push(elem);
            console.log(completed);
            console.log(inProgress);
            completedCounter();
            inProgressCounter();
            item.classList.remove('2');
            item.classList.add('3');
            console.log(item);
       }
   });
    }
    if(item.parentElement.id === "3" && item.classList.contains('1')){
      toDo.forEach(elem => {
        if(elem.id === item.id){
          toDo.splice(elem.index, 1);
          completed.push(elem);
          console.log(completed);
          console.log(toDo);
          completedCounter();
          toDoCounter();
          item.classList.remove('1');
          item.classList.add('3');
          console.log(item);
     }
 });
  }

    if(item.parentElement.id === "1"&& item.classList.contains('2')){
      inProgress.forEach(elem => {
        if(elem.id === item.id){
          inProgress.splice(elem.index, 1);
          toDo.push(elem);
          console.log(toDo);
          console.log(inProgress);
          toDoCounter();
          inProgressCounter();
          item.classList.remove('2');
          item.classList.add('1');
          console.log(item);
    }
  
  });
}
if(item.parentElement.id === "1"&& item.classList.contains('3')){
  completed.forEach(elem => {
    if(elem.id === item.id){
      completed.splice(elem.index, 1);
      toDo.push(elem);
      console.log(toDo);
      console.log(completed);
      toDoCounter();
      completedCounter();
      item.classList.remove('3');
      item.classList.add('1');
      console.log(item);
}
  });}
    });};
    moveObjects();
}
}



///Delete Task

  function deleteTask() {
    deleteBtn = document.querySelectorAll(".fa-trash-can");
    const items = document.querySelectorAll(".item");

    items.forEach(item => {
      deleteBtn.forEach(elem =>{
        elem.addEventListener('click', (e)=> {
          if(item.id===elem.id) {
            if(item.parentElement.id === "1"){
                toDo.splice(e.index, 1);
                toDoCounter();
                item.parentElement.removeChild(item);
            } else if(item.parentElement.id === "2"){
                inProgress.splice(e.index, 1);
                inProgressCounter();
                item.parentElement.removeChild(item);
                console.log(inProgress);
            } else if(item.parentElement.id === "3"){
                completed.splice(e.index, 1);
                completedCounter();
                item.parentElement.removeChild(item);
          }
        }
      });
    });
  });
}

/// Remove all tasks

removeAll = () => {
  const removeAllBtn = document.querySelector('.removeAll');
  const wrappers  = document.querySelectorAll(".CardsWrapper");

  removeAllBtn.addEventListener('click', ()=> {
    wrappers.forEach(wrapper => {
      wrapper.replaceChildren();
      toDo.length=0;
      toDoCounter();
      inProgress.length=0;
      inProgressCounter();
      completed.length=0;
      completedCounter();
    });
  });
};
removeAll();


DoneBtn.addEventListener("click", () => {
  dragDrop();
  deleteTask(CreateTask);

});


