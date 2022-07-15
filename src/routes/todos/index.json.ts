import type { RequestHandler } from "@sveltejs/kit";
import { api } from "./_api";

export const get: RequestHandler = (request) => {
    return api(request);
};

export const post: RequestHandler = async (reqEvent) => {
    const formData = await reqEvent.request.formData();

    return api(reqEvent, {
        uid: `${Date.now()}`, // TODO: replace with uid from db
        created_at: new Date(),
        text: formData.get("text") as string,
        done: false
    })
};
