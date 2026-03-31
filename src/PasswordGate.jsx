import { useState } from "react";

const PASS_KEY = "compensi_made_auth";

export default function PasswordGate({ children }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [authed, setAuthed] = useState(() => {
        try { return sessionStorage.getItem(PASS_KEY) === "1"; } catch { return false; }
    });

    if (authed) return children;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username.toLowerCase() === "debora" && password === "Password123!") {
            setAuthed(true);
            try { sessionStorage.setItem(PASS_KEY, "1"); } catch { }
        } else {
            setError(true);
            setTimeout(() => setError(false), 2000);
        }
    };

    return (
        <div style={{
            minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
            background: "linear-gradient(135deg, #0D0D0D 0%, #1a1a2e 50%, #16213e 100%)",
            fontFamily: "'DM Sans', sans-serif",
        }}>
            <form onSubmit={handleSubmit} style={{
                background: "rgba(30,30,30,0.95)", border: "1px solid #333",
                borderRadius: 16, padding: "48px 40px", textAlign: "center",
                maxWidth: 400, width: "90%", boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
            }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>🔒</div>
                <h1 style={{ color: "#fff", fontSize: 22, fontWeight: 700, margin: "0 0 8px" }}>
                    Compensi Made
                </h1>
                <p style={{ color: "#888", fontSize: 13, margin: "0 0 28px" }}>
                    Area riservata — Inserisci le credenziali per accedere
                </p>
                <input
                    type="text"
                    placeholder="Nome utente"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    autoFocus
                    style={{
                        width: "100%", padding: "14px 16px", borderRadius: 10,
                        border: error ? "2px solid #ff5252" : "1px solid #444",
                        background: "#1a1a1a", color: "#eee", fontSize: 16,
                        textAlign: "center", fontWeight: 600, boxSizing: "border-box",
                        outline: "none", transition: "border 0.2s", marginBottom: 12,
                    }}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    style={{
                        width: "100%", padding: "14px 16px", borderRadius: 10,
                        border: error ? "2px solid #ff5252" : "1px solid #444",
                        background: "#1a1a1a", color: "#eee", fontSize: 16,
                        textAlign: "center", fontWeight: 600, boxSizing: "border-box",
                        outline: "none", transition: "border 0.2s",
                    }}
                />
                {error && (
                    <p style={{ color: "#ff5252", fontSize: 13, margin: "10px 0 0", fontWeight: 600 }}>
                        ❌ Credenziali errate
                    </p>
                )}
                <button type="submit" style={{
                    marginTop: 20, width: "100%", padding: "14px", borderRadius: 10,
                    border: "none", background: "linear-gradient(135deg, #D6006E, #F5C518)",
                    color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer",
                    letterSpacing: "0.5px", transition: "opacity 0.2s",
                }}
                    onMouseEnter={e => e.target.style.opacity = "0.85"}
                    onMouseLeave={e => e.target.style.opacity = "1"}
                >
                    ACCEDI
                </button>
                <p style={{ color: "#555", fontSize: 11, margin: "20px 0 0" }}>
                    SempliCom • MADE SRL
                </p>
            </form>
        </div>
    );
}
