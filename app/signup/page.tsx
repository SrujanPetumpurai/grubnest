"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
    const [name,setName] = useState('');
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSignup = async () => {
        const res = await fetch("/api/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password,name }),
        });

        if (res.ok) {
            router.push("/api/auth/signin");
        } else {
            alert("Signup failed");
        }
    };

    return (
        <div className="flex flex-col h-screen w-screen">
            <h1>Signup</h1>
            <label htmlFor="name">Name</label>
            <input type="text" onChange={(e)=>setName(e.target.value)} id='name' value={name} />
            <label htmlFor="email">Email</label>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password">Password</label>
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleSignup}>Signup</button>
        </div>
    );
}
