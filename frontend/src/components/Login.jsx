import { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
export default function Login() {
  const { token, user, setToken, logout } = useAuth();
  const [form, setForm] = useState({username: "", password: ""})
  const [error, setError] = useState("")

  async function login() {
    const res = await fetch("http://localhost:8000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (!res.ok) {
      setError(res.status === 409 ? "invalid credentials" : "login failed");
      return;
    }

    const data = await res.json();
    setToken(data.token);
  }

  if (user){
    return (
      <div>
        <p>Current user: {user}</p>
        <button onClick = {logout}>Log out</button>
      </div>
    )
  }

  return (
    <>
      <div>Login</div>
      <div>
        <input value = {form.username} onChange={(e)=>setForm((prev)=>({...prev, username: e.target.value}))} placeholder = "username"/>
        <input type = "password" value = {form.password} onChange={(e)=>setForm((prev)=>({...prev, password: e.target.value}))}/>
        {error && <p>{error}</p>}
        <button onClick={login}>Log In</button>
      </div>
    </>
    
  )
}
