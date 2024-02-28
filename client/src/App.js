// App.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BlogList from './components/BlogList';

const App = () => {
  const [online, setOnline] = useState(navigator.onLine);
  const [offlineEntries, setOfflineEntries] = useState([]);

  useEffect(() => {
    const handleOnlineStatus = () => {
      setOnline(navigator.onLine);
    };

    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOnlineStatus);

    const storedEntries = JSON.parse(localStorage.getItem('offlineEntries')) || [];
    setOfflineEntries(storedEntries);

    return () => {
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOnlineStatus);
    };
  }, []);

  const updateOfflineEntries = (entries) => {
    localStorage.setItem('offlineEntries', JSON.stringify(entries));
    setOfflineEntries(entries);
  };

  return (
    <div>
      {online ? (
        <BlogList
          offlineEntries={offlineEntries}
          updateOfflineEntries={updateOfflineEntries}
        />
      ) : (
        <div>
          <h1>No tienes conexión a internet</h1>
          <BlogList entries={offlineEntries} />
        </div>
      )}
    </div>
  );
};

export default App;
