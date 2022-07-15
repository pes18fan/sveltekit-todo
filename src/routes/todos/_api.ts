import type { RequestEvent } from "@sveltejs/kit";

// TODO: persist in db
let todos: Todo[] = [];

export const api = (reqEvent: RequestEvent, todo?: Todo) => {
    let body: Todo[] = [];
    let status = 500;

    switch (reqEvent.request.method.toUpperCase()) {
        case "GET":
            body = todos;
            status = 200;
            break;
        case "POST":
            if (todo !== undefined) {
                todos.push(todo);
                body = todos;
                status = 201;
            }
            break;
        case "DELETE":
            todos = todos.filter(todo => todo.uid !== reqEvent.params.uid);
            status = 200;
            break;
        default:
            break;
    }

    if (reqEvent.request.method.toUpperCase() !== "GET") {
        return {
            status: 303,
            headers: {
                location: "/"
            }
        }
    }

    return {
        status,
        body
    }
}