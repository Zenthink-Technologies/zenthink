import { BrowserRouter } from "react-router-dom";
import Router from "./routes/Router";
import { AuthProvider } from "./admin/context/AuthContext";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="min-w-screen h-auto scroll-smooth">
          <Router />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
