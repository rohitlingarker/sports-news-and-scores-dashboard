import { Link } from 'react-router-dom'; // If you're using React Router

interface NavbarProps {
    isLoggedIn: boolean;
    handleSignOut: () => void;
  }

const Navbar: React.FC<NavbarProps> = ({ isLoggedIn, handleSignOut }) => {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="text-xl">
        <Link to="/">Sports Dashboard</Link>
      </div>
      <div className="space-x-4">
        {isLoggedIn ? (
          <>
            <Link to="/preferences">Preferences</Link>
            <button
              className="px-3 py-1 rounded bg-red-500 hover:bg-red-600"
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          </>
        ) : (
          <>
            <Link to="/signin">Sign In</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
