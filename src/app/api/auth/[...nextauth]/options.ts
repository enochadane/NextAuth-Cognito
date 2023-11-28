import type { NextAuthOptions } from "next-auth";
import CognitoProvider from "next-auth/providers/cognito";
import CredentialsProvider from "next-auth/providers/credentials";

import { custom } from "openid-client";
custom.setHttpOptionsDefaults({
  timeout: 5000,
});

export const options: NextAuthOptions = {
  providers: [
    CognitoProvider({
      clientId: process.env.COGNITO_CLIENT_ID as string,
      clientSecret: "",
      issuer: process.env.COGNITO_ISSUER,
    }),
  ],
  callbacks: {
    async signIn(user: any): Promise<boolean> {
      console.log(user, "user log from signIn callback");
      const userProfile = user.profile;
      // check if user is in group
      // if (
      //   userProfile &&
      //   userProfile["cognito:groups"] &&
      //   Array.isArray(userProfile["cognito:groups"])
      // ) {
      //   // Check if the specified group name exists in the 'cognito:groups' array
      //   return userProfile["cognito:groups"].includes("superusers");
      // }
      return true;
    },
  },
};
