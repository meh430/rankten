const baseUrl = "http://192.168.0.22:5000";

export async function validateImage(imageUrl) {
    var isValid = false;
    try {
        var response = await fetch(imageUrl);
        isValid = response.ok && response.headers["Content-Type"].includes("image");
    } catch (e) {
        return false;
    }

    return isValid;
}

export async function get(endpoint, bearerToken = "") {
    var hasError = false;
    var jsonResponse;

    try {
        var jsonResponse = parseResponse(await fetch(baseUrl + endpoint, {
            method: 'GET',
            headers: getHeaders(bearerToken)
        }));
    } catch (e) {
        hasError = true;
        jsonResponse = e;
    }

    return [hasError, jsonResponse];
}

export async function post(endpoint, body, bearerToken = "") {
    if (!body) {
        body = {};
    }

    var hasError = false;
    var jsonResponse;

    try {
        var jsonResponse = parseResponse(await fetch(baseUrl + endpoint, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: getHeaders(bearerToken)
        }));
    } catch (e) {
        hasError = true;
        jsonResponse = e;
    }

    return [hasError, jsonResponse];
}

export async function put(endpoint, body, bearerToken = "") {
    if (!body) {
        body = {};
    }

    var hasError = false;
    var jsonResponse;

    try {
        var jsonResponse = parseResponse(await fetch(baseUrl + endpoint, {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: getHeaders(bearerToken)
        }));
    } catch (e) {
        hasError = true;
        jsonResponse = e;
    }

    return [hasError, jsonResponse];
}

export async function del(endpoint, bearerToken = "") {
    var hasError = false;
    var jsonResponse;

    try {
        var jsonResponse = parseResponse(await fetch(baseUrl + endpoint, {
            method: 'DELETE',
            headers: getHeaders(bearerToken)
        }));
    } catch (e) {
        hasError = true;
        jsonResponse = e;
    }

    return [hasError, jsonResponse];
}

function getHeaders(bearerToken = "") {
    return bearerToken == "" ?
        {
            Accept: "application/json",
            "Content-Type": "application/json",
        } :
        {
            Authorization: "Bearer $bearerToken",
            Accept: "application/json",
            "Content-Type": "application/json",
        };
}

function parseResponse(response) {
    switch (response.status) {
        case 200:
            var parsed = await response.json();
            return parsed;
        case 400:
            var parsed = await response.json();
            if (parsed.message.includes("page")) {
                throw "Page does not exist";
            } else {
                throw "Bad request";
            }
            case 401:
                throw "Authentication error";
            case 403:
                throw "Unauthorized";
            default:
                throw "Something went wrong";
    }
}