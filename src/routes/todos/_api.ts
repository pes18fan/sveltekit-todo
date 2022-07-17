import type { RequestEvent } from "@sveltejs/kit";
import PrismaClient from "$lib/prisma";

const prisma = new PrismaClient();

export const api = async (
    reqEvent: RequestEvent,
    data?: Record<string, unknown>
) => {
    let body: Todo | Todo[] = [];
    let status = 500;

    switch (reqEvent.request.method.toUpperCase()) {
        case "GET":
            body = await prisma.todo.findMany();
            status = 200;
            break;
        case "POST":
            body = await prisma.todo.create({
                data: {
                    created_at: data!.created_at as Date,
                    done: data!.done as boolean,
                    text: data!.text as string,
                },
            });
            status = 201;
            break;
        case "DELETE":
            body = await prisma.todo.delete({
                where: {
                    uid: reqEvent.params.uid,
                },
            });
            status = 200;
            break;
        case "PATCH":
            body = await prisma.todo.update({
                where: {
                    uid: reqEvent.params.uid,
                },
                data: {
                    done: data!.done as boolean,
                    text: data!.text as string,
                },
            });
            status = 200;
            break;
        default:
            break;
    }

    if (
        reqEvent.request.method.toUpperCase() !== "GET" &&
        reqEvent.request.headers.get("accept") !== "application/json"
    ) {
        return {
            status: 303,
            headers: {
                location: "/",
            },
        };
    }

    return {
        status,
        body,
    };
};
