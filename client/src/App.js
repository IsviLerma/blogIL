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

    // Al cargar la aplicación, intenta obtener las entradas almacenadas localmente
    const storedEntries = JSON.parse(localStorage.getItem('offlineEntries')) || [];
    setOfflineEntries(storedEntries);

    return () => {
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOnlineStatus);
    };
  }, []);

  // Función para actualizar las entradas almacenadas localmente
  const updateOfflineEntries = (entries) => {
    localStorage.setItem('offlineEntries', JSON.stringify(entries));
    setOfflineEntries(entries);
  };

  return (
    <div>
      {online ? (
        // Mostrar la lista de entradas y permitir agregar nuevas entradas
        <BlogList
          offlineEntries={offlineEntries}
          updateOfflineEntries={updateOfflineEntries}
        />
      ) : (
        // Mostrar las entradas almacenadas localmente cuando esté offline
        <div>
          <h1>No tienes conexión a internet</h1>
          <BlogList entries={offlineEntries} />
        </div>
      )}
    </div>
  );
};

export default App;
