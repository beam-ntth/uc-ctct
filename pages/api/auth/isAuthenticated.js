import nextConnect from 'next-connect';
import setup from '../../../api-lib/auth/passportSetup'

const handler = nextConnect();
handler.use(...setup);


export const isAuthenticated = (req, res) => {

}

handler.get('/api/auth/isAuthenticated', (req, res) => {
  (req.user ? res.json({ authenticated: true }) : res.json({ authenticated: false }));
});

export default handler;