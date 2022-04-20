import { httpClient } from "../../shared/services/http-client";
import { useState } from "react";
import { Socio } from "../../shared/services/http-client";
import { useEffect } from "react";

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

  return (
    <div>
      <table>
        <tr>
          <th>ID</th>
          <th>IMAGEN</th>
          <th>NOMBRE</th>
          <th>APELLIDO</th>
          <th>DNI</th>
          <th>N° SOCIO</th>
          <th>FECHA NACIMIENTO</th>
          <th>GENERO</th>
          <th>NACIONALIDAD</th>
          <th>EMAIL</th>
        </tr>
      </table>
    </div>
  );
};
