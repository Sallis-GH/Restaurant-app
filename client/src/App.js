import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Layout from './components/Layout';
import About from './pages/About';
import NoPage from './pages/NoPage';

function App() {
  return (
    <Routes>
      <Route index element={<Home />} />

    <Route path="/" element={<Layout />}>
      <Route path="about" element={<About />} />
      <Route path="*" element={<NoPage />} />
    </Route>

  </Routes>
  );
}

export default App;
