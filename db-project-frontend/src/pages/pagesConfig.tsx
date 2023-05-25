import Home from "./home/Home";


export const pagesConfig = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "*",
    element: <h1>Not Found</h1>,
  },
];

export const navigationConfig = [
  {
    id: "home",
    path: "/",
    name: "Inicio",
  },
];
