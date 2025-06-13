import { createContext, useContext, useEffect, useState } from "react";
import { auth, googleProvider } from "../firebase/config";
import { signInWithPopup, signOut, User } from "firebase/auth";

interface AuthContextType {
  currentUser: User | null;
  logout: () => Promise<void>;
  googleLogin: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  function googleLogin() {
    return signInWithPopup(auth, googleProvider).then((result) => {
      setCurrentUser(result.user);
    });
  }

  function logout() {
    return signOut(auth).then(() => {
      setCurrentUser(null);
      localStorage.removeItem("isLoggedIn");
    });
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    logout,
    googleLogin,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
