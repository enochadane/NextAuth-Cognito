import type { NextAuthOptions } from "next-auth";
import CognitoProvider from "next-auth/providers/cognito";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
  providers: [
    CognitoProvider({
      clientId: process.env.COGNITO_CLIENT_ID as string,
      clientSecret: "",
      issuer: process.env.COGNITO_ISSUER,
    }),
    // CredentialsProvider({
    //   name: "Credentials",
    //   credentials: {
    //     username: {
    //       label: "Username",
    //       type: "text",
    //       placeholder: "username",
    //     },
    //     password: {
    //       label: "Password",
    //       type: "password",
    //       placeholder: "password",
    //     },
    //   },
    //   async authorize(credentials) {
    //     const user = { id: 42, name: "Enoch", passowrd: "nextauth" };
    //     if (
    //       credentials?.username === user.name &&
    //       credentials.password === user.passowrd
    //     ) {
    //       return user;
    //     } else {
    //       return null;
    //     }
    //   },
    // }),
  ],
};
