import React from 'react';
import Footer from './Footer';

function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        {children}
      </main>
   
    </div>
  );
}

export default Layout;