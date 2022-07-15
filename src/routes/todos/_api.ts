// TODO: persist in db
let todos: Todo[] = [];

export const api = (request: Request, todo?: Todo) => {
    let body: Todo[] = [];
    let status = 500;

    switch (request.method.toUpperCase()) {
        case "GET":
            body = todos;
            status = 200;
            break;
        case "POST":
            if (todo !== undefined) {
                todos.push(todo);
            }

            return {
                status: 303,
                headers: {
                    location: "/"
                }
            }
        case "DELETE":
            todos = todos.filter(todo => todo.uid !== request.params.uid);
            status = 200;
            break;
        default:
            break;
    }

    return {
        status,
        body
    }
}