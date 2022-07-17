/// <reference types="@sveltejs/kit" />

type Todo = {
    uid: string;
    created_at: Date;
    text: string;
    done: boolean;
};

interface Result {
    result: Function;
    error: (message?: string) => void;
}
