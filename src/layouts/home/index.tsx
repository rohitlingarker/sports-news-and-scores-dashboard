import React from 'react';
import Navbar from './Navbar'; 
// import LiveMatches from '../../components/liveMatches';
// import Articles from '../../components/articles';
import { Outlet, useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  // Check if the user is logged in based on the presence of authToken
  const isLoggedIn = !!localStorage.getItem('authToken');
  const navigate = useNavigate();

  

  

  function handleSignOut(): void {
    navigate("/signout")
  }

  return (
      <>
      <Navbar isLoggedIn={isLoggedIn} handleSignOut={handleSignOut} />
      <main>
        <div className="mx-16 max-w-full py-6 sm:px-6 lg:px-8">
          {/* <LiveMatches/>
          <Articles/> */}
          <Outlet/>
        </div>
      </main>
    </>
  );
};

export default Home;
