export const enhance = (form: HTMLFormElement, {
    result, error
}: Result) => {
    async function handleSubmit(event: Event) {
        event.preventDefault();

        try {
            const body = new FormData(form);

            if (body.get("text") as string === "") {
                error("Cannot create an empty todo!");
                throw new Error("Empty todo!");
            } 

            const response = await fetch(form.action, {
                method: form.method,
                headers: {
                    accept: "application/json"
                },
                body
            });

            if (response.ok) {
                result(response, form);
            } else {
                error();
                throw new Error(`API response not recieved: ${await response.text()}`);
            }
        } catch (err) {
            console.error(`Failed to submit form: ${err}`);
        }
    }

    form.addEventListener("submit", handleSubmit);

    return {
       destroy() {
           form.removeEventListener("submit", handleSubmit)
       } 
    }
}