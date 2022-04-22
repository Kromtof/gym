import { httpClient } from "../../shared/services/http-client";
import { useState } from "react";
import { Socio } from "../../shared/services/http-client";
import { useEffect } from "react";
import "./SociosListPage.css";
import { useNavigate } from "react-router-dom";

export const SociosListPage = () => {
  const [socios, setSocios] = useState<Socio[]>([]);

  const LoadSocios = () => {
    const prom: Promise<any> = httpClient.get();
    prom.then((data) => {
      setSocios(data);
      console.log(data);
    });

    console.log(socios);
  };

  useEffect(() => {
    LoadSocios();
  }, []);

  let navigate = useNavigate();

  return (
    <div>
      <table id="socioslist">
        <tr>
          <th>ID</th>
          <th>IMAGEN</th>
          <th>NOMBRE</th>
          <th>DNI</th>
          <th>N° SOCIO</th>
          <th>FECHA NACIMIENTO</th>
          <th>EMAIL</th>
        </tr>
        {socios.map((socio) => (
          <tr key={socio.id}>
            <td>{socio.id}</td>
            <td>{socio.imagen}</td>
            <td>
              {socio.nombre} {socio.apellido}
            </td>
            <td>{socio.dni}</td>
            <td>{socio.nroSocio}</td>
            <td>{socio.fechaNacimiento}</td>
            <td>{socio.email}</td>
            <td>
              <button
                onClick={() => {
                  const promDelete = httpClient.delete(socio.id);
                  promDelete.then(() => {
                    LoadSocios();
                  });
                }}
              >
                Eliminar
              </button>
              <button
                onClick={() => {
                  navigate("/modificarsocio/" + socio.id);
                }}
              >
                Modificar
              </button>
            </td>
          </tr>
        ))}
        ;
      </table>
    </div>
  );
};
