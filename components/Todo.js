class Todo {
  constructor(data, selector) {
    this._data = data;
    this._templateSelector = document.querySelector(selector);
  }

  _setEventListeners() {
    this._todoCheckboxEl.addEventListener("change", () => {
      this._data.completed = !this._data.completed;
    });

    const todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");
    todoDeleteBtn.addEventListener("click", () => {
      this._todoElement.remove();
      console.log(`Todo with id ${this._data.id} deleted.`);
    });
  }

  _generateCheckbox() {
    this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    this._todoLabel = this._todoElement.querySelector(".todo__label");
    this._todoCheckboxEl.checked = this._data.completed;
    // Apply id and for attributes.
    // The id will initially be undefined for new todos.
    this._todoCheckboxEl.id = `todo-${this._data.id}`;
    this._todoLabel.setAttribute("for", `todo-${this._data.id}`);
  }

  _setDueDate() {
    const todoDate = this._todoElement.querySelector(".todo__date");

    const dueDate = new Date(this._data.date);
    if (!isNaN(dueDate)) {
      todoDate.textContent = `Due: ${dueDate.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`;
    } else {
      todoDate.textContent = "";
    }
  }

  getView() {
    this._todoElement = this._templateSelector.content
      .querySelector(".todo")
      .cloneNode(true);

    const todoNameEl = this._todoElement.querySelector(".todo__name");

    todoNameEl.textContent = this._data.name;

    this._generateCheckbox();
    this._setEventListeners();
    this._setDueDate();

    return this._todoElement;
  }
}

export default Todo;
