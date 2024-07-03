const upload = document.querySelector(".upload");
const menu = document.querySelector(".menu");
const form = document.querySelector("form");
const input = document.querySelector("input");
const text = document.querySelector("p");

  menu.addEventListener("click", (eo) => {
    switch (eo.target.className) {

      case "icon-trash icon":
        eo.target.parentElement.parentElement.remove();
        break;
      case "icon-angry2 icon":
        eo.target.classList.remove("icon-angry2");
        eo.target.classList.add("icon-heart");
  
  
        eo.target.parentElement.parentElement
          .getElementsByClassName("start")[0]
          .classList.add("finish");
        break;
      case "icon icon-heart":
        eo.target.classList.add("icon-angry2");
        eo.target.classList.remove("icon-heart");
  
  
        eo.target.parentElement.parentElement
          .getElementsByClassName("start")[0]
          .classList.remove("finish")
        break;
      case "icon icon-angry2":
        eo.target.classList.remove("icon-angry2");
        eo.target.classList.add("icon-heart");
  
  
        eo.target.parentElement.parentElement
          .getElementsByClassName("start")[0]
          .classList.add("finish");
        break;
      case "icon-star hove icon":
      case"icon-star icon hove":
        eo.target.classList.add("orange");
        eo.target.classList.remove("hove");
        menu.prepend(eo.target.parentElement);
        break;
      case "icon-star icon orange":
        eo.target.classList.remove("orange");
        eo.target.classList.add("hove");
        menu.append(eo.target.parentElement);
        break;
  
      default:
        break;
    }
  }
  )


  



































  form.addEventListener("submit", (eo) => {
    eo.preventDefault();
    const task = `
  <div class="task">
  <span class="icon-star hove icon"></span>
  <p class="start">   ${input.value}   </p>
  <div>
    <span class="icon-trash icon"></span>
    <span class="icon-angry2 icon"></span>
  </div>
  <!-- <span class="icon-heart"></span> -->
</div>
  
  `;
    menu.innerHTML += task;
    input.value = ""
  });
