import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { App } from "./App";
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage";
import { BlocksProvider } from "./hooks/useBlocks";

const HomePage = lazy(() => import("./pages/Homepage/HomePage"));
const WorkspacePage = lazy(() => import("./pages/WorkspacePage/WorkspacePage"));
const BtcTrackerPage = lazy(
  () => import("./pages/BtcTrackerPage/BtcTrackerPage"),
);

export const Root = () => {
  return (
    <Router basename="/vite-project/">
      <BlocksProvider>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<HomePage />} />
              <Route path="workspace" element={<WorkspacePage />} />
              <Route path="btc-tracker" element={<BtcTrackerPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </Suspense>
      </BlocksProvider>
    </Router>
  );
};
