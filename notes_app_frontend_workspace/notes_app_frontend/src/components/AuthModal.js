import React, { useState, useEffect, useRef } from "react";

// PUBLIC_INTERFACE
/**
 * AuthModal - Simple authentication (local, modal)
 * @param {Object} props
 * @param {boolean} props.open
 * @param {function} props.onLogin
 * @param {boolean} [props.requireAuth]
 * @param {boolean} [props.show]
 */
function AuthModal({ open, onLogin, requireAuth, show }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const ref = useRef(null);

  useEffect(() => {
    if (open && ref.current) ref.current.focus();
    setErr("");
  }, [open]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setErr("Username and password required");
      return;
    }
    onLogin(username.trim(), password);
    setUsername("");
    setPassword("");
    setErr("");
  };

  if (!(requireAuth || show)) return null;

  return (
    <>
      <div className="auth-modal-backdrop" />
      <div className="auth-modal" role="dialog" aria-modal="true" tabIndex={-1}>
        <div className="auth-title">Welcome to NoteNest</div>
        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            ref={ref}
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Username"
            required
            autoComplete="username"
          />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            required
            autoComplete="current-password"
          />
          <button type="submit">Sign In</button>
          {err && <div className="auth-error" role="alert">{err}</div>}
        </form>
      </div>
    </>
  );
}

export default AuthModal;
