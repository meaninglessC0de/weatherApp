import { createContext, useContext, useState, useEffect } from "react";
const AuthContext = createContext(null);
export function AuthProvider({ children }) {
    const [token, setToken] = useState(()=>localStorage.getItem("token")); //initialise once on startup
    const [user, setUser] = useState(null);
    useEffect(() => {
        if (!token) {
        setUser(null);
        return;
        }
        fetch("http://localhost:8000/current", { headers: { token } })
        .then((r) => (r.ok ? r.json() : Promise.reject()))
        .then((d) => setUser(d.username))
    }, [token]);
    useEffect(()=>{
        if (token){
            localStorage.setItem("token", token);
        } else {
            localStorage.removeItem("token")
        }
    })
    async function logout() {
        if (token) {
        await fetch("http://localhost:8000/logout", {
            method: "POST",
            headers: { token },
            });
        }
        setToken(null);
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ token, setToken, user, setUser, logout }}>
        {children}
        </AuthContext.Provider>
        );
    }

export function useAuth() {
  return useContext(AuthContext);
}