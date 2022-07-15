export const handle: Handle = async ({ event, resolve }) => {
    if (event.url.searchParams.has("_method")) {
        event.method = event.url.searchParams.get("_method").toUpperCase();
    }

    const response = await resolve(event);

    return response;
}