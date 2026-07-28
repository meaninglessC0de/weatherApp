import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function Signup() {
    const { user, setToken } = useAuth();
    const [form, setForm] = useState({ username: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate("/")
        }
    }, [user])

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
        navigate("/")
    }

    return (
        <div className="container" style={{ maxWidth: "400px" }}>
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title mb-3">Sign up</h4>

                        <input className="form-control mb-3" value={form.username} onChange={(e) => setForm((prev) => ({ ...prev, username: e.target.value }))} placeholder="username" />
                    <input className="form-control mb-2" type="password" value={form.password} onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))} placeholder="password" />

                    {error && <p>{error}</p>}

                    <button className="btn btn-dark w-100" onClick={signup}>Sign Up</button>

                    <p>Already have an account? <Link to="/login">Log in</Link></p>
                </div>
            </div>
        </div>
    )
}
