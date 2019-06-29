import fetch from 'isomorphic-fetch';

var  API_URL_BASE = 'http://localhost:3002/api';

function generateFetchConfig(method, body = null) {
    const upCasedMethod = method.toUpperCase();
    const config = {
        method: upCasedMethod,
        headers: {
        	'Content-Type': 'application/json',
        	'Accept': 'application/json'
        }
    };

    if (['POST', 'PUT'].includes(upCasedMethod)) {
        config.body = JSON.stringify(body);
    }
    return config;
}

export function fetchFiles() {
    return fetch(API_URL_BASE+'/files');
}

export function getFilesByName(fileName) {
    return fetch(API_URL_BASE+'/files/filebyname/'+fileName);
}

export function postNewFile(payload) {                    
    return fetch(API_URL_BASE+'/file/', generateFetchConfig('PUT', payload));
}

export function postSaveFile(payload) {                    
    return fetch(API_URL_BASE+'/file/', generateFetchConfig('POST', payload));
}

export function deleteile(idFile) {
    return fetch(API_URL_BASE+'/file/delete/'+idFile);
}

