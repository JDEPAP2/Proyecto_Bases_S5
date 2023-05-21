import Home from "./home/Home";
import Usuarios from "./usuarios/Usuarios";
import Cursos from "./cursos/Cursos";
import Compañias from "./compañias/Compañias";

export const pagesConfig = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "*",
    element: <h1>Not Found</h1>,
  },
  {
    path: "/usuarios",
    element: <Usuarios />,
  },
  {
    path: "/cursos",
    element: <Cursos />,
  },
  {
    path: "/compañias",
    element: <Compañias />,
  },
];

export const navigationConfig = [
  {
    id: "home",
    path: "/",
    name: "Inicio",
  },
  {
    id: "usuarios",
    path: "/usuarios",
    name: "Usuarios",
  },
  {
    id: "cursos",
    path: "/cursos",
    name: "Cursos",
  },
  {
    id: "compañias",
    path: "/compañias",
    name: "Compañias",
  },
];
