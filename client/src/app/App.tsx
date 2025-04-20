import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.scss";

import Paint from "@widgets/paint/ui/Paint";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:id" element={<Paint />} />
        <Route
          path="/"
          element={
            <>
              <Paint />
              <Navigate to={`/f${new Date().toISOString()}`} replace />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
