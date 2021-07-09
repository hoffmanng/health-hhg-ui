import { dbHelper } from "./DbHelper";

export async function checkLoggedIn(ctx) {
    const response = await dbHelper.checkLoggedIn(ctx);

    if (typeof window === "undefined" && response.status === 401 && ctx.req.url !== '/login') {
        ctx.res.writeHead(302, {
            Location: '/login'
        });
        ctx.res.end();
    }

    const user = await response.json();
    return user;
};