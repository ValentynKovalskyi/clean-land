import { useFetch } from "@/composables/useFetch";

/**
 * @param {{userName: "string", email: "string", password: "string"}} data
*/
export async function register (data) {
    const { post, response, responseData } = useFetch();
    await post("http://localhost:5000/api/Users/register", data, true);
    return {
        response,
        responseData
    }
}

/**
 * @param {{userName: "string", password: "string"}} data
*/
export async function login (data) {
    const { post, response, responseData } = useFetch();
    await post("http://localhost:5000/api/Users/login", data, true);
    return {
        response,
        responseData
    }
}