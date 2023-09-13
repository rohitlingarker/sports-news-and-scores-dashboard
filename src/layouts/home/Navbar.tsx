import { Link } from "react-router-dom"; // If you're using React Router
import Preferences from "../../components/preferences";

interface NavbarProps {
  isLoggedIn: boolean;
  handleSignOut: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isLoggedIn, handleSignOut }) => {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="text-xl">
        <Link to="/">Sports Bulletin</Link>
      </div>
      <div className="space-x-4">
        {isLoggedIn ? (
          <div className="flex items-center gap-2">
            {/* <Link to="/preferences">Preferences</Link> */}
            <div className="">
              <Preferences />
            </div>
            <button
              className="px-3 py-1 rounded bg-red-500 hover:bg-red-600"
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          </div>
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
