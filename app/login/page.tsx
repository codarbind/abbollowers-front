"use client"

import { useState } from 'react';
import styles from '../../styles/Login.module.css';
import { LoginUser } from '@/utils/interfaces';
import { loginUser } from '@/utils/api';
import { useRouter } from 'next/navigation';


const Login = () => {
  const [formData, setFormData] = useState<LoginUser>({ email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const router = useRouter()
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
     let data = await loginUser(formData);

      alert('Login successful');
      router.push(`/account/${data.data.id}`)
    } catch (err:any) {
      setError(err.message);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Login</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={styles.input}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className={styles.input}
          placeholder="Password"
        />
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit" className={styles.button}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
