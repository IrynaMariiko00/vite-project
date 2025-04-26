import "./App.scss";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { Outlet } from "react-router-dom";

export const App = () => {
  return (
    <div className="app">
      <div className="app__header">
        <Header />
      </div>

      <main className="app__main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
