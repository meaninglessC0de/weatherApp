import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function Login() {
  const { user, setToken, logout } = useAuth();
  const [form, setForm] = useState({ username: "", password: "" })
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

  if (user) {
    return (
      <div className="container" style={{ maxWidth: "400px" }}>
        <div className="card shadow-sm">
          <div className="card-body text-center">
            <p className="mb-3">Current user: <strong>{user}</strong></p>
            <button className="btn btn-outline-dark" onClick={logout}>Log out</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container" style={{ maxWidth: "400px" }}>
      <div className="card">
        <div className="card-body">
          <h4 className="card-title mb-3">Login</h4>

          <input className="form-control mb-3" value={form.username} onChange={(e) => setForm((prev) => ({ ...prev, username: e.target.value }))} placeholder="username" />
          <input className="form-control mb-3" type="password" value={form.password} onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))} placeholder="password" />

          {error && <p>{error}</p>}

          <button className="btn btn-dark w-100" onClick={login}>Log In</button>

          <p>No account? <Link to="/signup">Sign up</Link></p>
        </div>
      </div>
    </div>
  )
}
