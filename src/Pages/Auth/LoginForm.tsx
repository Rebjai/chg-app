import { FormEvent, useState } from 'react';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e);
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
    <form
      className="bg-white p-6 rounded-lg shadow-xl"
      onSubmit={handleSubmit}
    >
      <div className="mb-4">
        <label
          className="block text-gray-700 font-medium mb-2"
          htmlFor="username"
        >
          Username:
        </label>
        <input
          className="w-full border border-gray-400 p-2"
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 font-medium mb-2"
          htmlFor="password"
        >
          Password:
        </label>
        <input
          className="w-full border border-gray-400 p-2"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button
        className="bg-purple-500 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded"
        type="submit"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
