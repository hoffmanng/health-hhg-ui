const baseUrl = 'http://localhost:3600/datapoints';

export const dbHelper = {
    removeDatapoint: async (id) => {
        return fetch(`${baseUrl}/${id}`, {
            method: 'DELETE',
            credentials: 'include'
        });
    },
    insertDatapoint: async (datapoint) => {
        const result = await fetch(baseUrl, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datapoint)
        });
        return result;
    },
    getDatapoints: async (dataType) => {
        const fullUrl = 
        !!dataType
        ? `${baseUrl}?dataType=${dataType}&limit=1000`
        : `${baseUrl}?limit=1000`;

        const data = await fetch(fullUrl, { credentials: 'include' });
        const json = await data.json();
        return json.resources;
    },
    checkLoggedIn: async (ctx) => {
        return await fetch('http://localhost:3600/user', {
            method: 'GET',
            headers: {
                cookie: ctx.req.headers.cookie
            }
        });
    }
};
