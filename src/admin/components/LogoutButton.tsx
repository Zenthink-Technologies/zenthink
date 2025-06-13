import { useAuth } from "../context/AuthContext";

const LogoutButton = () => {
  const { logout } = useAuth();

  return (
    <button
      onClick={logout}
      className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-200 rounded-lg transition-all duration-300"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
