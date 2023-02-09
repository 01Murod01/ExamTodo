const token = localStorage.getItem("token");
// console.log(token);
const todoForm = document.querySelector("#todoForm");
const cards = document.querySelector("#cards");

if (!token) {
  window.location.replace("login.html");
}

allGetTodos();

let arrTodo = [];
console.log(arrTodo);

todoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const todo = event.target[0].value;
  fetch(`https://todo-for-n92.cyclic.app/todos/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": JSON.parse(token),
    },

    body: JSON.stringify({
      task: todo,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      allGetTodos();
    });
});

async function allGetTodos() {
  let response = await fetch("https://todo-for-n92.cyclic.app/todos/all", {
    method: "GET",
    headers: {
      "x-access-token": JSON.parse(token),
    },
  });
  let data = await response.json();
  arrTodo = data.allTodos;
  arrTodo.reverse();
  console.log(arrTodo);
  cards.innerHTML = "";
  for (let i = 0; i < arrTodo.length; i++) {
    const template = `  
    <div class="col-md-3 p-3 m-3 bg-light rounded">
    <div class="form-check form-switch">
    <input class="form-check-input" type="checkbox" role="switch" 
    onchange"toggleCompleted("${arrTodo[i]._id}")" ${
      arrTodo.completed ? "checked" : ""
    }>
    <strong id="todoName">${arrTodo[i].task}</strong> <br>
    <span id="time">${arrTodo[i].createdAt}</span>
    <div class="d-flex justify-content-end gap-3 mt-3">
    <button class="btn btn-success" type="button" id="editBtn"><i
    class="fas fa-pen"></i></button>
    <button class="btn btn-danger" type="button" id="deleteBtn" onclick="deleteTodo('${
      arrTodo[i]._id
    }')"><i
    class="fas fa-trash"></i></button>
    </div>
    </div>
    </div>
    `;
    cards.innerHTML += template;
  }
}

function deleteTodo(_id) {
  fetch("https://todo-for-n92.cyclic.app/todos/" + _id, {
    method: "DELETE",
    headers: {
      "x-access-token": JSON.parse(token),
    },
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      allGetTodos();
    });
}

// function toggleCompleted(_id) {
//   fetch("https://todo-for-n92.cyclic.app/todos/" + _id, {
//     method: "PUT",
//     headers: {
//       "x-access-token": JSON.parse(token),
//     },
//   })
//     .then((res) => res.json())
//     .then((res) => {
//       console.log(res);
//       // if (arrTodo[i]._id === _id) {
//       //   arrTodo[i].completed = !arrTodo[i].completed;
//       // }
//       allGetTodos();
//     });
// }

// function editTodo(e, id) {
//   e.preventDefault();
//   fetch("https://todo-for-n92.cyclic.app/todos/" + _id, {
//     method: "PUT",
//     headers: {
//       "x-access-token": JSON.parse(token),
//     },
//     body: {
//       task: "Update task",
//     },
//   });
// }
