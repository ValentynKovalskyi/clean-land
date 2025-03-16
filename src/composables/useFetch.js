import { ref } from "vue";

export function useFetch() {
    const lastUrl = ref('');
    const response = ref();
    const responseData = ref()
    const error = ref()
/**
* Fetch with error handling
* @param {string} url URL for request
* @param {Object} data Object that will be sent to server
* @param {"GET"|"POST"|"PUT"|"DELETE"|"PATCH"|"OPTIONS"} method HTTP method
* @param {Object} options Object with additional options in fetch init object
* 
*/
    async function fetchWithErrorHandling (url, data, method="GET", options={}) {
        lastUrl.value = url;
        try {
            response.value = await fetch(url, { 
                ...options,
                method,
                body: JSON.stringify(data),
            })
            responseData.value = await response.value.json();
        } catch (e) {
            error.value = e.message;
            console.error("Fetch error:", e);
        }
    }

    async function post (url, data, json=true, options={}) {
        let finalOptions = {
            ...options     
        }

        if(json){
            if(!finalOptions.headers) finalOptions.headers = {}
            finalOptions.headers["Content-Type"] = "application/json"
        }

        await fetchWithErrorHandling(url, data, "POST", finalOptions)
    }

    async function put (url, data, json=true, options={}) {
        let finalOptions = {
            ...options     
        }

        if(json){
            if(!finalOptions.headers) finalOptions.headers = {}
            finalOptions.headers["Content-Type"] = "application/json"
        }

        await fetchWithErrorHandling(url, data, "PUT", finalOptions)
    }

    async function get (url, data, options={}) {
        await fetchWithErrorHandling(url, data, "GET", options)
    }

    return {
        post,
        get,
        put,
        response,
        responseData,
        lastUrl,
        error,
    }
}