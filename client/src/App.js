import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Layout from './components/Layout';
import About from './pages/About';
import NoPage from './pages/NoPage';
import Menu from './pages/Menu';

function App() {
  return (
    <Routes>
      <Route index element={<Home />} />

    <Route path="/" element={<Layout />}>
      <Route path="about" element={<About />} />
      <Route path="menu" element={<Menu />} />
      <Route path="*" element={<NoPage />} />
    </Route>

  </Routes>
  );
}

export default App;
