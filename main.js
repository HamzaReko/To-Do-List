const upload = document.querySelector(".upload");
const menu = document.querySelector(".menu");
const form = document.querySelector("form");
const input = document.querySelector("input");
const text = document.querySelector("p");
let task = {
  title: "title",
  Done: false,
  fav: false,
};
let tasks = [
  {
    title: "Follow @rekostudio at insta ;-;",
    Done: false,
    fav: true,
  },
  {
    title: "Follow @HamzaReko at github ;-;",
    Done: false,
    fav: true,
  },
];

const getTasks = () => {
  let retTasks = JSON.parse(localStorage.getItem("tasks"));
  switch (retTasks) {
    case null:
      tasks = [
        {
          title: "Follow @rekostudio at insta ;-;",
          Done: false,
          fav: true,
        },
        {
          title: "Follow @HamzaReko at github ;-;",
          Done: false,
          fav: true,
        },
      ];
      break;

    default:
      tasks = retTasks;
      break;
  }
};
getTasks();

let addTasks = () => {
  menu.innerHTML = "";
  let index = 0;
  for (task of tasks) {
    let content = `
                          <div class="task">
                            <span onclick="fav(${index})" class="icon-star hove icon fav${index}"></span>
                            <p class="start">${task.title}</p>
                            <div class="icons">
                              <span onclick="deleteTask(${index})" class="icon-trash icon"></span>
                              <span onclick="finish(${index})" class="icon-angry2 icon task${index}"></span>
                            </div>
                          </div>
                      `;
    menu.innerHTML += content;
    index++;
  }
};

addTasks();

let sync = () => {
  tasks.forEach((item) => {
    let deleteTaskElement = document.querySelector(
      `.task${tasks.indexOf(item)}`
    );
    let favTaskElement = document.querySelector(`.fav${tasks.indexOf(item)}`);
    switch (item.Done) {
      case true:
        switch (deleteTaskElement.className) {
          case `icon-heart icon task${tasks.indexOf(item)}`:
          case `icon task${tasks.indexOf(item)} icon-angry2`:
          case `icon-angry2 icon task${tasks.indexOf(item)}`:
            deleteTaskElement.classList.remove("icon-angry2");
            deleteTaskElement.classList.add(`icon-heart`);
            deleteTaskElement.parentElement.parentElement
              .getElementsByClassName("start")[0]
              .classList.add("finish");
            break;
        }

        break;
    }

    switch (item.fav) {
      case true:
        switch (favTaskElement.className) {
          case `icon-star hove icon fav${tasks.indexOf(item)}`:
          case `icon-star icon fav${tasks.indexOf(item)} hove`:
            favTaskElement.classList.add("orange");
            favTaskElement.classList.remove("hove");
            menu.prepend(favTaskElement.parentElement);
            break;
        }

        break;
    }
  });
};
sync();

function deleteTask(index) {
  tasks.splice(index, 1);
  Store();
  addTasks();
  sync();
}

function finish(index) {
  let deleteTaskElement = document.querySelector(`.task${index}`);
  if (tasks[index].Done == true) {
    tasks[index].Done = false;
    Store();
    switch (deleteTaskElement.className) {
      case `icon task${index} icon-heart`:
        deleteTaskElement.classList.add("icon-angry2");
        deleteTaskElement.classList.remove("icon-heart");
        deleteTaskElement.parentElement.parentElement
          .getElementsByClassName("start")[0]
          .classList.remove("finish");
        break;
    }
  } else {
    tasks[index].Done = true;
    Store();
    switch (deleteTaskElement.className) {
      case `icon-heart icon task${index}`:
      case `icon task${index} icon-angry2`:
      case `icon-angry2 icon task${index}`:
        deleteTaskElement.classList.remove("icon-angry2");
        deleteTaskElement.classList.add(`icon-heart`);
        deleteTaskElement.parentElement.parentElement
          .getElementsByClassName("start")[0]
          .classList.add("finish");
        break;
    }
  }
}

function fav(index) {
  let favTaskElement = document.querySelector(`.fav${index}`);

  if (tasks[index].fav == true) {
    tasks[index].fav = false;
    Store();
    switch (favTaskElement.className) {
      case `icon-star icon fav${index} orange`:
        favTaskElement.classList.remove("orange");
        favTaskElement.classList.add("hove");
        menu.append(favTaskElement.parentElement);
        break;
    }
  } else {
    tasks[index].fav = true;
    Store();
    switch (favTaskElement.className) {
      case `icon-star hove icon fav${index}`:
      case `icon-star icon fav${index} hove`:
        favTaskElement.classList.add("orange");
        favTaskElement.classList.remove("hove");
        menu.prepend(favTaskElement.parentElement);
        break;
    }
  }
}

form.addEventListener("submit", (eo) => {
  eo.preventDefault();

  let taskName = input.value;

  let taskObj = {
    title: taskName,
    Done: false,
    fav: false,
  };

  tasks.push(taskObj);
  Store();
  addTasks();
  sync();
  input.value = "";
});

const Store = () => {
  let taskstring = JSON.stringify(tasks);
  localStorage.setItem("tasks", taskstring);
};
