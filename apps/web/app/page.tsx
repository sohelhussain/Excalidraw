"use client"
import Image, { type ImageProps } from "next/image";
import { Button } from "@repo/ui/button";
import styles from "./page.module.css";
import { useState } from "react";



export default function Home() {

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  function sendInput() {

  }

  return (
    <div>

      <div>
        <input value={name} onChange={(e) => setName(e.target.value)} style={{display: "block"}} type="text" placeholder="Enter your name" />
        <input value={email} onChange={(e) => setEmail(e.target.value)} style={{display: "block"}} type="email" placeholder="Enter your Email" id="" />
        <input value={password} onChange={(e) => setPassword(e.target.value)} style={{display: "block"}} type="password" placeholder="Enter your password" />
        <button style={{display: "block"}} onClick={() => sendInput()}>Signup</button>
        <Button className="bg-green-200 rounded-lg" appName="work">alret</Button>
        <a href="/signin" className="text-red-400">you are a already user? go to signin page</a>
      </div>
    </div>
  );
}
