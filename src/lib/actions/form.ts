interface EnhanceResult {
    result: Function;
}

export const enhance = (form: HTMLFormElement, {
    result
}: EnhanceResult) => {
    async function handleSubmit(event: Event) {
        event.preventDefault();

        try {
            const body = new FormData(form);
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