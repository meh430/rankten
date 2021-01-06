import { baseUrl } from "../config";

export async function validateImage(imageUrl) {
    var isValid = false;
    try {
        var response = await fetchTimeout(imageUrl);
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

    try {
        jsonResponse = await parseResponse(
            await fetchTimeout(baseUrl + endpoint, {
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
            await fetchTimeout(baseUrl + endpoint, {
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
            await fetchTimeout(baseUrl + endpoint, {
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
            await fetchTimeout(baseUrl + endpoint, {
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
    var parsed = await response.json();
    if(response.status == 200) {
        return parsed;
    } else {
        throw new Error(parsed.message);
    }
}

async function fetchTimeout(url, options) {

    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), 6000);

    const response = await fetch(url, {
        ...options,
        signal: controller.signal,
    });
    clearTimeout(id);

    return response;
}
