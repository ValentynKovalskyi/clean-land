import Cookies from "universal-cookie";

export function useCookie() {
    const cookies = new Cookies(null, { path: '/'})

    function set(name, value, options={}) {
        cookies.set(name, value, options)
    }

    function get(name, options={}) {
        return cookies.get(name, options)
    }

    function remove(name, options={}) {
        cookies.remove(name, options)
    }

    return {
        set,
        get,
        remove
    }
}