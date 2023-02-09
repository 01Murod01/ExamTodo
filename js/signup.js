// const data = {
//     username: "Hellow",
//     password: "1234578",
//   };

//   fetch("https://todo-for-n92.cyclic.app/user/register", {
//     method: "POST",
//     body: JSON.stringify(data),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   })
//     .then((res) => res.json())
//     .then((data) => console.log(data))
//     .catch("err");

const signupForm = document.querySelector("#signup__form");

signupForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = {
    username: event.target[0].value,
    password: event.target[1].value,
  };

  fetch("https://todo-for-n92.cyclic.app/user/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((res) => {
      localStorage.setItem("token", JSON.stringify(res.token));
      window.location.replace("login.html");
    })
    .catch("error");
});
