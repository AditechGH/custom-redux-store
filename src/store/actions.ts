// Action constants
export const ADD_TODO = "[Todo] Add Todo";
export const REMOVE_TODO = "[Todo] Remove Todo";

// Action creators
export class AddTodo<Todo> {
  readonly type = ADD_TODO;
  constructor(private payload: Todo) {}
}

export class RemoveTodo<Todo> {
  readonly type = REMOVE_TODO;
  constructor(private payload: Todo) {}
}
