document.addEventListener("DOMContentLoaded", () => {

  const todoList = document.getElementById("todo-list");
  const addBtn = document.getElementById("addBtn");
  const modal = document.getElementById("modal");
  const apply = document.getElementById("apply");
  const cancel = document.getElementById("cancel");
  const newNote = document.getElementById("newNote");
  const search = document.getElementById("search");
  const empty = document.querySelectorAll(".empty");
  const darkMode = document.getElementById("darkMode");
  const filterSelect = document.getElementById("filterSelect");

  let todos = [];
  let editIndex = null;
  let filter = "ALL";

  function render() {
    todoList.innerHTML = "";
    let filtered = todos.filter(t => {
      const matchesSearch = t.text.toLowerCase().includes(search.value.toLowerCase());
      if (filter === "COMPLETE") return t.complete && matchesSearch;
      if (filter === "INCOMPLETE") return !t.complete && matchesSearch;
      return matchesSearch;
    });

    if (filtered.length === 0) {
      empty.forEach(e => e.style.display = "block");
    } else {
      empty.forEach(e => e.style.display = "none");
      filtered.forEach((todo, i) => {
        let li = document.createElement("li");
        li.classList.add("todo-item");
        li.innerHTML = `
          <div class="left">
            <input type="checkbox" id="check-${i}" ${todo.complete ? "checked" : ""} />
            <label for="check-${i}" class="${todo.complete ? 'completed' : ''}">${todo.text}</label>
          </div>
          <div class="buttons">
            <button class="editBtn"><img class="edit-icon" src="./images/edit1.svg"></button>
            <button class="deleteBtn"><img class="delete-icon" src="./images/delete1.svg"></button>
          </div>
        `;

        li.querySelector(`#check-${i}`).addEventListener("change", () => toggleComplete(i));

        li.querySelector(".editBtn").addEventListener("click", () => openEdit(i));

        li.querySelector(".deleteBtn").addEventListener("click", () => deleteTodo(i));

        todoList.appendChild(li);
      });
    }
  }

  function toggleComplete(i) {
    todos[i].complete = !todos[i].complete;
    render();
  }

  function deleteTodo(i) {
    todos.splice(i, 1);
    render();
  }

  function openEdit(i) {
    modal.style.display = "flex";
    newNote.value = todos[i].text;
    editIndex = i;
    newNote.focus();
  }

  addBtn.onclick = () => {
    modal.style.display = "flex";
    newNote.value = "";
    editIndex = null;
    newNote.focus();
  }

  cancel.onclick = () => {
    modal.style.display = "none";
  }

  apply.onclick = () => {
    if (newNote.value.trim() !== "") {
      if (editIndex === null) {
        todos.push({ text: newNote.value, complete: false });
      } else {
        todos[editIndex].text = newNote.value;
      }
      render();
      modal.style.display = "none";
    }
  }

  search.addEventListener("input", () => render());

  darkMode.onclick = () => {
    document.body.classList.toggle("dark");
  }

  filterSelect.onchange = () => {
    filter = filterSelect.value;
    render();
  }

  render();
});
