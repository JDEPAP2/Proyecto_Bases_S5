import axios from "axios";
import React, { useEffect, useState } from "react";
// import { cursosPorIdioma } from "../pages/home/store/homeSlice";
import { useDispatch } from "react-redux";

const Contenedor = (props) => {
  const { title } = props;
  const dispatch = useDispatch();

  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const dataFetch = async () => {
        const response = await axios.get(
          `https://pqxb3e-3000.csb.app/api/empleados/prom-country/`,
          { country: title.toLowerCase() }
        );
        console.log("responseeeeeee2222222222", response);
        setData(response.data.data.count);
      };
      dataFetch();
    }
    fetchData();
  }, []);

  return (
    <div className="p-5 shadow-lg rounded-3xl text-center">
      <p className="text-2xl font-semibold">{title}</p>
      <p>{data?.count}</p>
    </div>
  );
};

export default Contenedor;
