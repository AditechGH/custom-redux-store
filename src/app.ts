import * as fromStore from "./store";

import { Todo, renderTodos } from "./utils";

const input = document.querySelector("input") as HTMLInputElement;
const button = document.querySelector("button") as HTMLButtonElement;
const destroy = document.querySelector(".unsubscribe") as HTMLButtonElement;
const todoList = document.querySelector(".todos") as HTMLLIElement;

const reducer = {
  todos: fromStore.reducer,
};

const store = new fromStore.Store(reducer);
console.log(store.value);

button.addEventListener(
  "click",
  () => {
    if (!input.value.trim()) return;

    const todo: Todo = { label: input.value, complete: false };

    store.dispatch(new fromStore.AddTodo(todo));

    input.value = "";
  },
  false
);

const unsubscribe = store.subscribe((state: any) => {
  renderTodos(state.todos.data);
});

destroy.addEventListener("click", unsubscribe, false);

todoList.addEventListener("click", function (event) {
  const target = event.target as HTMLButtonElement;
  if (target.nodeName.toLowerCase() === "button") {
    const todo: Todo = JSON.parse(target.getAttribute("data-todo") as any);
    store.dispatch(new fromStore.RemoveTodo(todo));
  }
});

store.subscribe((state: any) => console.log("STATE::: ", state));
