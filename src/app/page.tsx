"use client";

import { useSession } from "next-auth/react";

export default function App() {
  const { data: session } = useSession();
  const { user } = session ?? {};
  console.log(session, 'session')

  return (
    <>
      <h1>Hello {user?.name}</h1>
      <button onClick={(signOut) => {}}>Sign out</button>
    </>
  );
}
