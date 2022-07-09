import { FaUser } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect, useContext } from 'react';
import AuthContext from '@/context/AuthContext';
import Link from 'next/link';
import Layout from '@/components/Layout';
import styles from '@/styles/AuthForm.module.css';

export default function loginPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const { register, error } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      toast.error('Passwords do not match!');
      return;
    }
    register({ username, email, password });
  };

  return (
    <Layout title='User Registration'>
      <div className={styles.auth}>
        <h1>
          <FaUser /> Register
        </h1>
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='username'>Username</label>
            <input
              type='text'
              id='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor='email'>Email Address</label>
            <input
              type='text'
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor='password'>
              Confirm Password
            </label>
            <input
              type='password'
              id='password2'
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            />
          </div>

          <input
            type='submit'
            value='Register'
            className='btn'
          />
        </form>

        <p>
          Already have an account?
          <Link href='/account/login'>Login</Link>
        </p>
      </div>
    </Layout>
  );
}
