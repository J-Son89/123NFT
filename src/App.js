import "./App.css";
import { HomePage } from "./Pages/HomePage/HomePage";
import { SuccessPage } from "./Pages/SuccessPage/SuccessPage";
import { DataReviewPage } from "./Pages/DataReviewPage/DataReviewPage";
import { PricesPage } from "./Pages/PricesPage/PricesPage";
import { AboutPage } from "./Pages/AboutPage/AboutPage";

import { Header } from "./Components/Header/Header";
import { Footer } from "./Components/Footer/Footer";
import { MetadataPage } from "./Pages/MetadataPage/MetadataPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Modal from 'react-modal';
Modal.setAppElement('#root');

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="" element={<HomePage />} />
          <Route path="getStarted" element={<MetadataPage />} />
          <Route path="success" element={<SuccessPage />} />
          <Route path="dataReview" element={<DataReviewPage />} />
          <Route path="prices" element={<PricesPage />} />
          <Route path="about" element={<AboutPage />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
