"use client";

import { useSession } from "next-auth/react";

import { Amplify } from "aws-amplify";
import config from "../amplifyconfiguration.json";
Amplify.configure(config);

import {
  signUp,
  confirmSignUp,
  type ConfirmSignUpInput,
  autoSignIn,
  signIn,
  type SignInInput,
  confirmSignIn,
  signOut,
} from "aws-amplify/auth";
import { useState } from "react";

type SignUpParameters = {
  username: string;
  password: string;
  email: string;
  phone_number: string;
};

export default function App() {
  // const { data: session } = useSession();
  // const { user } = session ?? {};

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");

  async function handleSignUp({
    username,
    password,
    email,
    phone_number,
  }: SignUpParameters) {
    try {
      const { isSignUpComplete, userId, nextStep } = await signUp({
        username,
        password,
        options: {
          userAttributes: {
            email,
            phone_number, // E.164 number convention
          },
          // optional
          autoSignIn: true, // or SignInOptions e.g { authFlowType: "USER_SRP_AUTH" }
        },
      });

      console.log(userId);
    } catch (error) {
      console.log("error signing up:", error);
    }
  }

  async function handleSignUpConfirmation({
    username,
    confirmationCode,
  }: ConfirmSignUpInput) {
    try {
      const { isSignUpComplete, nextStep } = await confirmSignUp({
        username,
        confirmationCode,
      });

      console.log(isSignUpComplete, nextStep, "after sign up confirmation");
    } catch (error) {
      console.log("error confirming sign up", error);
    }
  }

  async function handleAutoSignIn() {
    try {
      const signInOutput = await autoSignIn();
      // handle sign-in steps
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSignIn({ username, password }: SignInInput) {
    try {
      const { isSignedIn, nextStep } = await signIn({ username, password });
      console.log(isSignedIn, nextStep, "after signIn");
    } catch (error) {
      console.log("error signing in", error);
    }
  }

  async function handleSignInConfirmation(otpCode: string) {
    try {
      await confirmSignIn({ challengeResponse: otpCode });
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSignOut() {
    try {
      await signOut();
    } catch (error) {
      console.log("error signing out: ", error);
    }
  }
  return (
    <>
      <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-black">Sign Up</h2>

        <div>
          <label className="block text-sm font-medium text-gray-600">
            Username:
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 p-2 w-full border rounded text-black"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Password:
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 p-2 w-full border rounded text-black"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Phone Number:
          </label>
          <input
            type="text"
            value={phone_number}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="mt-1 p-2 w-full border rounded text-black"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Email:
          </label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 p-2 w-full border rounded text-black"
          />
        </div>
        <button
          type="button"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none"
          onClick={() => {
            handleSignUp({ username, password, email, phone_number });
          }}
        >
          Sign Up
        </button>
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Confirmation code:
          </label>
          <input
            type="text"
            value={confirmationCode}
            onChange={(e) => setConfirmationCode(e.target.value)}
            className="mt-1 p-2 w-full border rounded text-black"
          />
        </div>
        <button
          type="button"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none"
          onClick={() => {
            handleSignUpConfirmation({ username, confirmationCode });
          }}
        >
          Verify Sign Up
        </button>
      </div>
      <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-black">Sign In</h2>

        <div>
          <label className="block text-sm font-medium text-gray-600">
            Username:
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 p-2 w-full border rounded text-black"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Password:
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 p-2 w-full border rounded text-black"
          />
        </div>
        <button
          type="button"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none"
          onClick={() => {
            handleSignIn({ username, password });
          }}
        >
          Sign In
        </button>
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Confirmation code:
          </label>
          <input
            type="text"
            value={confirmationCode}
            onChange={(e) => setConfirmationCode(e.target.value)}
            className="mt-1 p-2 w-full border rounded text-black"
          />
        </div>
        <button
          type="button"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none"
          onClick={() => {
            handleSignInConfirmation(confirmationCode);
          }}
        >
          Verify Sign In
        </button>
      </div>
    </>
    // <>
    //   <h1 className="text-white">Hello {'user?.name'}</h1>
    //   <button onClick={handleSignOut}>Sign out</button>
    // </>
  );
}
