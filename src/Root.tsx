import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { App } from "./App";
import { HomePage } from "./pages/Homepage/HomePage";
import { WorkspacePage } from "./pages/WorkspacePage/WorkspacePage";
import { BtcTrackerPage } from "./pages/BtcTrackerPage/BtcTrackerPage";
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage";

export const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="workspace" element={<WorkspacePage />} />
          <Route path="btc-tracker" element={<BtcTrackerPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
};
