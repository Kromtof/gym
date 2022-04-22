import { httpClient } from "../../shared/services/http-client";
import { useState } from "react";
import { Socio } from "../../shared/services/http-client";
import { useEffect } from "react";
import "./SociosListPage.css";
import { useNavigate } from "react-router-dom";

export const SociosListPage = () => {
  const LoadSocios = () => {
    setIsLoading(true);
    const prom = httpClient.get("socios");
    prom.then((data) => {
      setIsLoading(false);
      setSocios(data);
    });
  };

  const [isLoading, setIsLoading] = useState(false);
  const [socios, setSocios] = useState<Socio[]>([]);

  useEffect(() => {
    LoadSocios();
  }, []);

  let navigate = useNavigate();

  return (
    <div>
      <div>{isLoading ? "Cargando..." : "No cargando..."}</div>
      <table id="socioslist">
        <thead>
          <tr>
            <th>IMAGEN</th>
            <th>NOMBRE</th>
            <th>DNI</th>
            <th>N° SOCIO</th>
            <th>FECHA NACIMIENTO</th>
            <th>EMAIL</th>
          </tr>
        </thead>
        <tbody>
          {socios.map((socio) => (
            <tr key={socio.id}>
              <td>
                <img
                  src={socio.imagen}
                  style={{
                    width: 50,
                    height: 50,
                    objectFit: "cover",
                    objectPosition: "center",

                    borderRadius: 10,
                  }}
                />
              </td>
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
                    const promDelete = httpClient.delete(`socios/${socio.id}`);
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
        </tbody>
      </table>
    </div>
  );
};
