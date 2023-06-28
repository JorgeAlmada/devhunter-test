function handleErrors(response) {
    console.log(response)
    if (!response.ok) {
        throw Error(response.message ? response.message : response.statusText);
    }
    return response;
}

module.exports = {handleErrors}