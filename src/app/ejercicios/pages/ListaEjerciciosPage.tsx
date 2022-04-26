import { useState, useEffect } from "react";
import { Ejercicio, httpClient } from "../../shared/services/http-client";
import { useNavigate } from "react-router-dom";

export const ListaEjerciciosPage = () => {
  const LoadEjercicios = () => {
    setIsLoading(true);
    const prom = httpClient.get("ejercicios");
    prom.then((data) => {
      setIsLoading(false);
      setEjercicios(data);
    });
  };

  const [isLoading, setIsLoading] = useState(false);
  const [ejercicios, setEjercicios] = useState<Ejercicio[]>([]);

  useEffect(() => {
    LoadEjercicios();
  }, []);

  let navigate = useNavigate();

  function emprolijararray(arraydegruposmusculares: string[]) {
    return arraydegruposmusculares.join(", ");
  }

  return (
    <div>
      <div>{isLoading ? "Cargando..." : "No cargando..."}</div>
      <table id="socioslist">
        <thead>
          <tr>
            <th>IMAGEN</th>
            <th>NOMBRE</th>
            <th>GRUPOS MUSCULARES</th>
          </tr>
        </thead>
        <tbody>
          {ejercicios.map((ejercicio) => (
            <tr key={ejercicio.id}>
              <td>
                <img
                  src={ejercicio.imagen}
                  style={{
                    width: 50,
                    height: 50,
                    objectFit: "cover",
                    objectPosition: "center",

                    borderRadius: 10,
                  }}
                />
              </td>
              <td>{ejercicio.nombre}</td>
              <td>{emprolijararray(ejercicio.gruposMusculares)}</td>
              <td>
                <button
                  onClick={() => {
                    console.log(ejercicio.id);
                    const promDelete = httpClient.delete(
                      `ejercicios/${ejercicio.id}`
                    );
                    promDelete.then(() => {
                      LoadEjercicios();
                    });
                  }}
                >
                  Eliminar
                </button>
                <button
                  onClick={() => {
                    navigate("/modificarejercicio/" + ejercicio.id);
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
