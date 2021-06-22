export async function checkLoggedIn(ctx) {
    const response = await fetch('http://localhost:3600/user', {
        method: 'GET',
        headers: {
            cookie: ctx.req.headers.cookie
        }
    });

    if (typeof window === "undefined" && response.status === 401 && ctx.req.url !== '/login') {
        ctx.res.writeHead(302, {
            Location: '/login'
        });
        ctx.res.end();
    }

    const user = await response.json();
    return user;
};