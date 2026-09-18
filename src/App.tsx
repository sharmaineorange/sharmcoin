import { useEffect } from "react";
import "./App.css";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { ContractAddress } from "./components/ContractAddress";
import { Footer } from "./components/Footer";
import { LoadingScreen } from "./components/LoadingScreen";
import { BackgroundFlow } from "./components/BackgroundFlow";
import { site } from "./config/site";

function App() {
  useEffect(() => {
    document.title = site.tokenTicker
      ? `${site.projectName} (${site.tokenTicker})`
      : site.projectName;
  }, []);

  return (
    <>
      <LoadingScreen />
      <div className="page">
        <BackgroundFlow />
        <div className="page__content">
          <Header />
          <main className="page__main">
            <Hero />
            <ContractAddress />
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
