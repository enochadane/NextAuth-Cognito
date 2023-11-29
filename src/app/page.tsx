"use client";

export default function App() {
  return (
    <>
      <h1>Hello {"user?.username"}</h1>
      <button onClick={(signOut) => {}}>Sign out</button>
    </>
  );
}
