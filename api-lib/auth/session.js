import nextSession from "next-session";

// const getSession = nextSession(options);

// export default async function session(req, res, next) {
//   await getSession(req, res);
//   next();
// }

export const getSession = nextSession(options);