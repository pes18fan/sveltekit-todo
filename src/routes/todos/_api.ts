import type { RequestEvent } from "@sveltejs/kit";

// TODO: persist in db
let todos: Todo[] = [];

export const api = (reqEvent: RequestEvent, data?: Record<string, unknown>) => {
    let body: Todo[] = [];
    let status = 500;

    switch (reqEvent.request.method.toUpperCase()) {
        case "GET":
            body = todos;
            status = 200;
            break;
        case "POST":
            if (data !== undefined) {
                todos.push(data as Todo);
                body = todos;
                status = 201;
            }
            break;
        case "DELETE":
            todos = todos.filter(todo => todo.uid !== reqEvent.params.uid);
            status = 200;
            break;
        case "PATCH":
            todos = todos.map(todo => {
                if (todo.uid === reqEvent.params.uid && data !== undefined) {
                    if (data.text) {
                        todo.text = data.text as string;
                    } else {
                        todo.done = data.done as boolean;
                    }
                }
                return todo;
            });
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