import { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes/Router";
import { Spinner } from "@heroui/react";

const App = () => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <BrowserRouter>
      <div className="min-w-screen h-auto scroll-smooth">
        {loading ? (
          <div className="fixed inset-0 flex items-center justify-center bg-black">
            <Spinner color="white" variant="gradient" />
          </div>
        ) : (
          <Router />
        )}
      </div>
    </BrowserRouter>
  );
};

export default App;
