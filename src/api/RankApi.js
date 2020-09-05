const baseUrl = 'http://192.168.0.22:5000';

async function validateImage(imageUrl) {
    var isValid = false;

}

async function get(endpoint, bearerToken = "") {
    var hasError = false;
    var jsonResponse;

    try {
        var response = await fetch(baseUrl + endpoint, );
    } catch (e) {
        hasError = true;
        jsonResponse = e;
    }

    return [hasError, jsonResponse];
}