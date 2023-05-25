import { BrowserRouter, Route, Routes } from "react-router-dom";
import routesConfig from "./configs/routesConfig";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {routesConfig.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
