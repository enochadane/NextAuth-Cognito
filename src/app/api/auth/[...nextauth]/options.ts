import type { NextAuthOptions } from "next-auth";
import CognitoProvider from "next-auth/providers/cognito";

export const options: NextAuthOptions = {
  providers: [
    CognitoProvider({
      clientId: process.env.COGNITO_CLIENT_ID as string,
      clientSecret: "",
      issuer: process.env.COGNITO_ISSUER,
      httpOptions: {
        timeout: 400000,
      },
      client: {
        token_endpoint_auth_method: "none",
      },
    }),
  ],
  callbacks: {
    async signIn({
      user,
      account,
      profile,
      email,
      credentials,
    }): Promise<boolean> {
      user.name = (profile as { "cognito:username": string })[
        "cognito:username"
      ];
      console.log(user, account, profile, "signIn callaback called");
      if (!user) {
        return false;
      }
      return true;
    },
    async redirect({ url, baseUrl }) {
      console.log(url, baseUrl, "redirect callback called");
      return baseUrl;
    },
    async session({ session, user, token }) {
      if (token.accessToken) {
        session.accessToken = token.accessToken as string;
      }
      console.log(session, token, "session callback called");
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      token.accessToken = account?.access_token;
      console.log(token, account, "jwt callback called");
      return token;
    },
  },
};
