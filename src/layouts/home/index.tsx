import React from 'react';
import Navbar from './Navbar'; 
import LiveMatches from '../../components/liveMatches';
import Articles from '../../components/articles';

const Home: React.FC = () => {
  // Check if the user is logged in based on the presence of authToken
  const isLoggedIn = !!localStorage.getItem('authToken');

  const handleSignOut = () => {
    // Handle sign out logic, e.g., remove authToken from localStorage
    localStorage.removeItem('authToken');
    // Perform any other necessary cleanup or redirection
  };

  return (
      <>
      <Navbar isLoggedIn={isLoggedIn} handleSignOut={handleSignOut} />
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <LiveMatches/>
          <Articles/>
        </div>
      </main>
    </>
  );
};

export default Home;
