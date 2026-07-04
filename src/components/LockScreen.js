"use client";

import { useState, useEffect } from "react";

export default function LockScreen({ onUnlock }) {
  // Starts null so the server-rendered markup and the first client render match;
  // the real clock only kicks in once mounted, avoiding a hydration mismatch.
  const [time, setTime] = useState(null);
  const [password, setPassword] = useState("");
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    // Deliberately setting state on mount (rather than a lazy initializer) so the
    // real clock only ever renders on the client, keeping the SSR/hydration output stable.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTime(new Date());
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onUnlock();
    }
  };

  const formattedTime = time ? time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';
  const formattedDate = time ? time.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' }) : '';

  if (showLogin) {
    return (
      <div 
        className="animate-fade-in"
        style={{
          width: '100%', height: '100%',
          backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)',
          background: 'rgba(0, 0, 0, 0.4)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          position: 'absolute', top: 0, left: 0, zIndex: 100
        }}
      >
        <div style={{
          width: 150, height: 150, borderRadius: '50%',
          background: 'linear-gradient(135deg, #ef4444, #7c3aed)', display: 'flex',
          alignItems: 'center', justifyContent: 'center', marginBottom: 20
        }}>
          <img src="/maya-logo.svg" alt="" width={70} height={70} style={{ filter: 'invert(1)' }} />
        </div>
        <h2 style={{ fontSize: 32, marginBottom: 20, fontWeight: 600 }}>Manas Yadav</h2>
        <img src="/lockscreepad.svg" alt="lockpad" style={{ marginBottom: 20, width: 60 }} />
        <h3 style={{ fontSize: 20, marginBottom: 20, fontWeight: 200 }}>Enter your PIN</h3>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Password"
          autoFocus
          style={{
            padding: '10px 16px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.5)',
            borderBottomColor : '#3ca7f1',
            borderBottomStyle: 'solid',
            borderBottomWidth: '2px',
            background: 'rgba(0,0,0,0.5)', color: 'white', fontSize: 16, width: 280,
            outline: 'none', transition: 'border-color 0.2s'
          }}
        />
        <p style={{ marginTop: 10, fontSize: 12, color: 'rgba(255,255,255,0.5)', textAlign: 'center' }}>
          Hint: type anything
        </p>
        <button
          onClick={() => setShowLogin(false)}
          style={{
            marginTop: 20, background: 'transparent', border: 'none',
            color: 'rgba(255,255,255,0.7)', cursor: 'pointer', fontSize: 14
          }}
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <div 
      onClick={() => setShowLogin(true)}
      style={{
        width: '100%', height: '100%', position: 'absolute', 
        top: 0, left: 0, zIndex: 100,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', paddingTop: '10%',
        cursor: 'pointer'
      }}
    >
      <h1 style={{ fontSize: 96, fontWeight: 600, textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
        {formattedTime}
      </h1>
      <h2 style={{ fontSize: 24, fontWeight: 400, textShadow: '0 2px 5px rgba(0,0,0,0.5)' }}>
        {formattedDate}
      </h2>
    </div>
  );
}
