
const baseUrl = "http://192.168.0.22:5000";
//const baseUrl = "https://rank-ten-api.herokuapp.com";
export async function validateImage(imageUrl) {
    var isValid = false;
    try {
        var response = await fetch(imageUrl);
        console.log(response.headers);
        isValid = response.ok && response.headers["Content-Type"].includes("image");
    } catch (e) {
        console.log(e);
        return false;
    }

    return isValid;
}

export async function get(endpoint, bearerToken = "") {
    var hasError = false;
    var jsonResponse = null;
    console.log(getHeaders(bearerToken));

    try {
        jsonResponse = await parseResponse(
            await fetch(baseUrl + endpoint, {
                method: "GET",
                headers: getHeaders(bearerToken),
            })
        );
    } catch (e) {
        hasError = true;
        jsonResponse = e.message;
    }

    return [hasError, jsonResponse];
}

export async function post(endpoint, bearerToken = "", body = {}) {
    var hasError = false;
    var jsonResponse = null;

    try {
        jsonResponse = await parseResponse(
            await fetch(baseUrl + endpoint, {
                method: "POST",
                body: JSON.stringify(body),
                headers: getHeaders(bearerToken),
            })
        );
    } catch (e) {
        hasError = true;
        jsonResponse = e.message;
    }

    return [hasError, jsonResponse];
}

export async function put(endpoint, bearerToken = "", body = {}) {
    var hasError = false;
    var jsonResponse = null;

    try {
        jsonResponse = await parseResponse(
            await fetch(baseUrl + endpoint, {
                method: "PUT",
                body: JSON.stringify(body),
                headers: getHeaders(bearerToken),
            })
        );
    } catch (e) {
        hasError = true;
        jsonResponse = e.message;
    }

    return [hasError, jsonResponse];
}

export async function del(endpoint, bearerToken = "") {
    var hasError = false;
    var jsonResponse;

    try {
        jsonResponse = await parseResponse(
            await fetch(baseUrl + endpoint, {
                method: "DELETE",
                headers: getHeaders(bearerToken),
            })
        );
    } catch (e) {
        hasError = true;
        jsonResponse = e.message;
    }

    return [hasError, jsonResponse];
}

function getHeaders(bearerToken = "") {
    return bearerToken === ""
        ? {
              Accept: "application/json",
              "Content-Type": "application/json",
          }
        : {
              Authorization: `Bearer ${bearerToken}`,
              Accept: "application/json",
              "Content-Type": "application/json",
          };
}

async function parseResponse(response) {
    var parsed;
    switch (response.status) {
        case 200:
            parsed = await response.json();
            return parsed;
        case 400:
            parsed = await response.json();
            if (parsed.message.includes("page")) {
                throw new Error("Page does not exist");
            } else {
                throw new Error("Bad request");
            }
        case 401:
            throw new Error("Authentication error");
        case 403:
            throw new Error("Unauthorized");
        default:
            throw new Error("Something went wrong");
    }
}
