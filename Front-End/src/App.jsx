import { Routes, Route } from "react-router-dom";
import AboutUs from "./pages/aboutUs/AboutUs";
import AllReviews from "./pages/allReviews/AllReviews";
import TrendingSpots from "./pages/trendingSpots/TrendingSpots";
import StudentPicks from "./pages/studentPicks/StudentPicks";
import Contact from "./pages/contact/Contact";
import Layout from "./components/layout/Layout";
import Homepage from "./pages/homepage/Homepage";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/all-reviews" element={<AllReviews />} />
        <Route path="/trending-spots" element={<TrendingSpots />} />
        <Route path="/student-picks" element={<StudentPicks />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Layout>
  );
}

export default App;
