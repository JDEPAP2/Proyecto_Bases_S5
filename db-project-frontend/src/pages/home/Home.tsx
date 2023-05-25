import { useEffect, useState } from "react";
import Contenedor from "../../components/Contenedor";
import Contenedor2 from "../../components/Contenedor2";
import { cantidadCursos, dataEmpleados } from "./store/homeSlice";

const Home = () => {
  const [dataEmpleadoss, setDataEmpleados] = useState([]);
  const [dataCursoss, setDataCursos] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const dataFetch = await dispatch(dataEmpleados());
      setDataEmpleados(dataFetch.payload);
      const dataFetch2 = await dispatch(cantidadCursos());
      setDataCursos(dataFetch2.payload);

    }
    fetchData();
  }, []);

  return (
    <>
      <div className="flex justify-center">
        <p className="text-7xl font-extrabold mt-10">Celsia Stats</p>
      </div>
      <p className="text-3xl font-extrabold mt-10 text-center">
        Cantidad de cursos:
      </p>
      <div className="flex justify-center gap-5 mt-5">
        <Contenedor title="ingles" />
        <Contenedor title="español" />
        <Contenedor title="holandes" />
        <Contenedor title="frances" />
      </div>
      {/* <p className="text-3xl font-extrabold mt-10 text-center">Promedios:</p>
      <div className="flex justify-center gap-5 mt-5">
        <Contenedor2 title="Panama" />
        <Contenedor2 title="costa rica" />
        <Contenedor2 title="holandes" />
        <Contenedor2 title="frances" />
      </div> */}
    </>
  );
};

export default Home;
