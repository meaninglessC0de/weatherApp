import { useState } from "react";
import { useAuth } from "./AuthContext";


export default function Signup() {
    const { setToken } = useAuth();
    const [form, setForm] = useState({ username: "", password: "" });
    const [error, setError] = useState("");

    async function signup() {
        const res = await fetch("http://localhost:8000/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });
        if (!res.ok) {
            setError(res.status === 409 ? "username taken" : "signup failed");
            return;
        }
        const loginRes = await fetch("http://localhost:8000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });
        const data = await loginRes.json();
        setToken(data.token);
    }


  return (
    <>
    <div>Sign up</div>
    <div>
        <input value = {form.username} onChange={(e)=>setForm((prev)=>({...prev, username: e.target.value}))} placeholder = "username"/>
        <input type = "password" value = {form.password} onChange={(e)=>setForm((prev)=>({...prev, password: e.target.value}))}/>
        {error && <p>{error}</p>}
        <button onClick={signup}>Sign Up</button>

    </div>
    </>
  )
}
