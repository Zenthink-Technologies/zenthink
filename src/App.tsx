import { BrowserRouter } from "react-router-dom";
import Router from "./routes/Router";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <div className="min-w-screen h-auto scroll-smooth">
          <Router />
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
