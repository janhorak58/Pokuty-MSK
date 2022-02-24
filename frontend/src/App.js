import { HashRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import DetailsScreen from "screens/DetailsScreen";
import FineCreate from "screens/FineCreate";

function App() {
  return (
    <HashRouter>
      <Header />
      <main id="main-content-container">
        <Routes>
          <Route path="/" element={<HomeScreen />} exact />
          <Route path="/login" element={<LoginScreen />} exact />
          <Route path="/pridat-pokutu" element={<FineCreate />} exact />
          <Route path="/hrac/:id" element={<DetailsScreen />} exact />
        </Routes>
      </main>
      {/* <Footer /> */}
    </HashRouter>
  );
}

export default App;
