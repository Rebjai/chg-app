import { FormEvent, useEffect, useState } from 'react';
import { Form, useActionData, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Utils/UseAuth';

const LoginForm = () => {
  const navigate = useNavigate()
  const [email, setUsername] = useState('');
  const [password, setPassword] = useState('');
  let actionData = useActionData() as any;
  const { auth, login } = useAuth()
  // console.log({actionData});

  useEffect(() => {
    if (actionData?.user?.id) {
      console.log({ actionData });
      login!(actionData.user).then(() => {
        // navigate('/')

      })

    }
  }, [actionData])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    // e.preventDefault();
    console.log(e);
    console.log('Username:', email);
    console.log('Password:', password);
  };

  return (
    <Form
      className="p-6 rounded-lg"
      method='post'
      onSubmit={handleSubmit}
    >
      <div className="mb-4">
        <label
          className="block text-gray-700 font-medium mb-2"
          htmlFor="email"
        >
          Username:
        </label>
        <input
          className="w-full border border-gray-400 p-2"
          type="email"
          id="email"
          name="email"
          value={email}
          required
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
          name="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button
        className="bg-purple-500 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded"
        type="submit"
      >
        Login
      </button>
    </Form>
  );
};

export default LoginForm;
