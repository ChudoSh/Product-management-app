// src/components/Auth/Register.tsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import userService from '../../services/userService';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userService.register(name, email, password);
      navigate('/login');
    } catch (err) {
      console.log(err);
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      maxWidth: '400px',
      margin: '0 auto'
    }}>
      <h2 style={{
        color: 'white',
        fontSize: '24px',
        marginBottom: '20px',
        textAlign: 'center'
      }}>Register</h2>
      
      {error && (
        <div style={{color: '#ff6b6b', marginBottom: '20px'}}>{error}</div>
      )}
      
      <form onSubmit={handleSubmit} style={{width: '100%'}}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '15px',
            background: 'transparent',
            border: '1px solid #333',
            color: 'white',
            fontSize: '16px',
            boxSizing: 'border-box'
          }}
          required
        />
        
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '15px',
            background: 'transparent',
            border: '1px solid #333',
            color: 'white',
            fontSize: '16px',
            boxSizing: 'border-box'
          }}
          required
        />
        
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '15px',
            background: 'transparent',
            border: '1px solid #333',
            color: 'white',
            fontSize: '16px',
            boxSizing: 'border-box'
          }}
          required
        />
        
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '10px',
            marginTop: '10px',
            background: 'transparent',
            border: '1px solid #333',
            color: 'white',
            fontSize: '16px',
            cursor: 'pointer'
          }}
        >
          Register
        </button>
      </form>
      
      <div style={{
        marginTop: '20px',
        textAlign: 'center'
      }}>
        <Link to="/login" style={{
          color: '#4d4dff',
          textDecoration: 'none'
        }}>
          Already have an account? Login
        </Link>
      </div>
    </div>
  );
};

export default Register;