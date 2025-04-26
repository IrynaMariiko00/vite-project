type LinkItem = {
  path: string;
  text: string;
  pageTitle: string;
};

export const navLinks: LinkItem[] = [
  {
    path: "/",
    text: "Home",
    pageTitle: "Home Page",
  },
  {
    path: "/workspace",
    text: "Workspace",
    pageTitle: "Workspace Page",
  },
  {
    path: "/btc-tracker",
    text: "BTC Tracker",
    pageTitle: "BTC Tracker Page",
  },
];
