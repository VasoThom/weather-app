import "./App.css";
import Footer from "./components/Footer";
import Input from "./components/Input";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
       <Navbar />
       <Input />
       <div>
       <Footer />
       </div>
    </div>
  );
}

export default App;
