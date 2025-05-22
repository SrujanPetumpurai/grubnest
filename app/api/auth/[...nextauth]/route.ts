import NextAuth from "next-auth";
import { NEXT_AUTH_CONFIG } from '../../../lib/auth' // your config file

const handler = NextAuth(NEXT_AUTH_CONFIG);
export { handler as GET, handler as POST };
