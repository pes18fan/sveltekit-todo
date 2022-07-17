import type { RequestHandler } from "@sveltejs/kit";
import { api } from "./_api";

export const get: RequestHandler = (reqEvent) => {
    return api(reqEvent);
};

export const post: RequestHandler = async (reqEvent) => {
    const formData = await reqEvent.request.formData();

    return api(reqEvent, {
        created_at: new Date(),
        text: formData.get("text") as string,
        done: false
    })
};
