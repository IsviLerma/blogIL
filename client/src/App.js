// src/App.js
import React from 'react';
import BlogList from './components/BlogList';

function App() {
  return (
    <div className="App" style={{ backgroundColor: '#f9f9fe', minHeight: '100vh' }}>
      <header className="App-header">
        <BlogList />
      </header>
    </div>
  );
}

export default App;
