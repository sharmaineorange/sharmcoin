import { useEffect } from "react";
import "./App.css";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { ContractAddress } from "./components/ContractAddress";
import { Footer } from "./components/Footer";
import { site } from "./config/site";

function App() {
  useEffect(() => {
    document.title = site.tokenTicker
      ? `${site.projectName} (${site.tokenTicker})`
      : site.projectName;
  }, []);

  return (
    <div className="page">
      <Header />
      <main className="page__main">
        <Hero />
        <ContractAddress />
      </main>
      <Footer />
    </div>
  );
}

export default App;
