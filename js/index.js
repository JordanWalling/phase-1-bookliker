document.addEventListener("DOMContentLoaded", function () {
  // set variable
  let books = [];

  fetch(`http://localhost:3000/books`)
    .then((resp) => resp.json())
    .then((data) => {
      // select elements
      const ul = document.querySelector("#list");
      books = data;
      books.map((book) => {
        const li = document.createElement("li");
        const { title, description, id, author, img_url, users } = book;

        li.textContent = title;
        li.addEventListener("click", (e) => {
          let panel = document.querySelector("div#show-panel");
          panel.innerHTML = "";

          const div = document.createElement("div");
          div.innerHTML = `
           <img src=${img_url} />
           <h3>${title}</h3>
           <h3>${author}</h3>
           <p>${description}</p>
           <ul>
            ${users.map((user) => `<li>${user.username}</li>`)}
           </ul>    
           
          `;
          let button = document.createElement("button");
          button.textContent = "LIKE";
          button.addEventListener("click", (e) => {
            fetch(`http://localhost:3000/books/${id}`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
              body: JSON.stringify({
                users: [
                  { id: 8, username: "maverick" },
                  { id: 9, username: "alex" },
                  {
                    id: 1,
                    username: "pouros",
                  },
                ],
              }),
            })
              .then((resp) => console.log(resp.json()))
              .then((data) => console.log(data))
              .catch((error) => console.error(error));
          });
          div.appendChild(button);
          panel.appendChild(div);
        });
        ul.appendChild(li);
      });
    })
    .catch((error) => console.error(error));
});
