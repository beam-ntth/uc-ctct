import nextConnect from 'next-connect';
import setup from '../../api-lib/auth/passportSetup'

// Test endpoint for seeing google user data. Route strictly for debugging. 
const handler = nextConnect();
handler.use(...setup);
handler.get((req, res) => {
  console.log(`User has logged in and is using cookies`, req.user);
});

export default handler;