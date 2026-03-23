import '../index.css';
import React, { useState } from 'react';

function Login({ onLogin }) {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);

  const handleSubmit = async (e) => {
  e.preventDefault();
  setShowError(false);

  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: user, password: password }),
    });

    const data = await response.json();

    if (response.ok && data.success) {
      onLogin(data.userId, data.username); 
    } else {
      setShowError(true);
    }
  } catch (error) {
    console.error("Error en el login:", error);
    setShowError(true);
  }
};

  return (
    <div className="auth-container">
      {showError && (
        <div className="modal-overlay">
          <div className="error-modal">
            <h2>[ACCESO DENEGADO]</h2>
            <p>No dispones de acceso al sistema</p>
            <button 
              type="button" 
              className="btn-error-close" 
              onClick={() => setShowError(false)}
            >
              REINTENTAR
            </button>
          </div>
        </div>
      )}
      
      <h1 className="app-welcome-title">ARAL_SYSTEM</h1>
      
      <div className="auth-card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>OPERADOR</label>
            <input 
              type="text" 
              className="form-input" 
              value={user} 
              onChange={(e) => setUser(e.target.value)} 
              required
            />
          </div>
          <div className="form-group">
            <label>CÓDIGO DE ACCESO</label>
            <input 
              type="password" 
              className="form-input" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required
            />
          </div>
          <button type="submit" className="btn-primary">ACCEDER</button>
        </form>
      </div>
    </div>
  );
}

export default Login;