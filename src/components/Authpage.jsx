import React, { useState } from 'react';
import { signUp, signIn } from '../auth.js';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../SupabaseClient.js';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState('login'); // 'login' or 'signup'
  const [fullName, setFullName] = useState('');

  
  const navigate = useNavigate();

    const handleSubmit = async () => {
  try {
    let userData;

    if (mode === 'login') {
      const { data, error } = await signIn(email, password);
      if (error) throw error;
      userData = data?.user;
        console.log('User signed in:', userData);
        console.log('user Id:', userData.id);
    } else {
      const { data, error } = await signUp(email, password);
      if (error) throw error;
      userData = data?.user;
        console.log('User signed up:', userData);
        console.log('user Id:', userData.id);
      await supabase.from('UserNames').insert({
        id: userData.id,
        full_name: fullName
      });
    }

    if (!userData) throw new Error('User data not returned');
    navigate('/home');
  } catch (error) {
    alert(error.message);
  }
};

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-1">
    <div className='flex flex-col gap-3 border-1 p-6 rounded-md shadow-md items-center w-80'>
      <h2 className='font-semibold'>{mode === 'login' ? 'Login' : 'Sign Up'}</h2>
      <input
        type="email"
        className='border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 w-60'
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {mode === 'signup' && (
        <input
            type="text"
            placeholder="Full Name"
            className='border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 w-60'
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
        />
      )}
      <input
        type="password"
        placeholder="Password"
        className='border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 w-60'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSubmit}
        className='bg-emerald-500 px-4 py-2 rounded-md text-white font-semibold w-60'

      >
        {mode === 'login' ? 'Login' : 'Sign Up'}
      </button>
      <p>
        {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
        <button onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
            className='text-blue-500'   
        >
          {mode === 'login' ? 'Sign Up' : 'Login'}
        </button>
      </p>
      </div>
    </div>
  );
}
