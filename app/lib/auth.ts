import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";
import { Users } from "./models/user";
import { connectToDB } from "./db";
import bcrypt from "bcryptjs";

export const NEXT_AUTH_CONFIG: NextAuthOptions = {
providers:[
    CredentialsProvider({
        name:"Credentials",
        credentials:{
            username:{label:'email',type:'text',placeholder:''},
            password:{label:'password',type:'password',placeholder:''},
        },
        async authorize(credentials:any){
            console.log(credentials)
          connectToDB();
            let user = await Users.findOne({
               email:credentials.username,
            })
            if (!user) {
                console.log("User not found");
                return null;
            }
            const isMatch = await bcrypt.compare(credentials.password, user.password);
            if (!isMatch) return null;

            return { id: user._id.toString(), name: user.name };
            
        }
    })
],
secret:process.env.NEXTAUTH_SECRET,
callbacks: {
    jwt: async ({ token, user }:any) => {
        if (user) {
            token.uid = user.id;
        }        return token;
    },
    session: async ({ session, token }:any) => {
        if (session.user) {
            session.user.id = token.uid
        }        return session;
    },
    redirect: async ({ url, baseUrl,token }:any) => {
        if(token?.uid){
            return `${baseUrl}/order/${token.uid}`;
        }else
        return `${baseUrl}/spaceJam`
        
    },
},

}
