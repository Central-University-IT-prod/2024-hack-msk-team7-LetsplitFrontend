export function authHeader(code) {
    return {headers: {Authorization: "Bearer " + code, 'content-type': 'application/json'}}
}