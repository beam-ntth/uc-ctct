import nextConnect from "next-connect";
import { getSession } from "./session";
import setup from "./passportSetup";
import handler from "../../pages/api/hello";
const hand = nextConnect()
handler.use(async (req, res, next) => {
  await getSession(req, res);
  next();
}).use(...setup);

export default handler;
