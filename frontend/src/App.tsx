import React, { useState } from 'react';
import Auth from './components/Auth';
import TaskList from './components/TaskList';

const App: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);

  const handleLogin = (token: string) => {
    setToken(token);
  };

  return (
    <div>
      {!token ? (
        //@ts-ignore
        <Auth onLogin={handleLogin} />
      ) : (
        <TaskList token={token} />
      )}
    </div>
  );
};

export default App;

