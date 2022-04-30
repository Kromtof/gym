import { hover } from "@testing-library/user-event/dist/hover";
import React, { useState, useEffect } from "react";
import { Ejercicio } from "../../shared/services/http-client";
import { httpClient } from "../../shared/services/http-client";

type Props = {};

const styles: { [key: string]: any } = {
  container: {
    margin: "30px auto",

    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    alignItems: "center",
  },
};

export const CreateRutinaPage = (props: Props) => {
  const LoadEjercicios = () => {
    const prom = httpClient.get("ejercicios");
    prom.then((data) => {
      setEjercicios(data);
    });
  };

  const LoadSeries = () => {};

  const [ejercicios, setEjercicios] = useState<Ejercicio[]>([]);
  const [series, setSeries] = useState<
    {
      serieid: number;
      ejercicioId: number | undefined;
      cantRep: number;
      cantCiclos: number;
      estaconfirmado: boolean;
    }[]
  >([]);

  useEffect(() => {
    LoadEjercicios();
  }, []);

  return (
    <div className="App">
      <h3>Nueva Rutina</h3>
      {series.map((serie, index) => (
        <div style={styles.container} key={serie.serieid}>
          <select
            disabled={serie.estaconfirmado}
            style={{ width: 200 }}
            value={serie.ejercicioId}
            onChange={(ev) => {
              let nuevasSeries = series;
              nuevasSeries[index]!.ejercicioId = Number(ev.target.value);
              setSeries([...nuevasSeries]);
            }}
          >
            <option value={-1}>...</option>
            {ejercicios.map((ejercicio) => (
              <option key={ejercicio.id} value={ejercicio.id}>
                {ejercicio.nombre}
              </option>
            ))}
          </select>
          <input
            disabled={serie.estaconfirmado}
            style={{ width: 90 }}
            placeholder="Cant rep"
            // value={series[index].cantRep}
            onChange={(ev) => {
              let nuevasSeries = series;
              nuevasSeries[index]!.cantRep = Number(ev.target.value);
              setSeries([...nuevasSeries]);
            }}
          />
          <input
            disabled={serie.estaconfirmado}
            style={{ width: 90 }}
            placeholder="Cant ciclos"
            type="number"
            //value={serie.cantCiclos}
            onChange={(ev) => {
              let nuevasSeries = series;
              nuevasSeries[index]!.cantCiclos = Number(ev.target.value);
              setSeries([...nuevasSeries]);
            }}
          />
          <button
            onClick={() => {
              series.splice(index, 1);
              setSeries([...series]);
            }}
          >
            Borrar
          </button>
          <button
            title="cuidado, no hay vuelta atras"
            onClick={() => {
              let nuevasSeries = series;
              nuevasSeries[index]!.estaconfirmado = true;
              setSeries([...nuevasSeries]);
            }}
          >
            ✓
          </button>
        </div>
      ))}
      <button
        style={{ marginLeft: 555 }}
        onClick={() => {
          const nuevasSeries = series;
          nuevasSeries.push({
            serieid: Math.random(),
            ejercicioId: -1,
            cantRep: 0,
            cantCiclos: 0,
            estaconfirmado: false,
          });
          console.log(series);
          setSeries([...nuevasSeries]);
        }}
      >
        +
      </button>
    </div>
  );
};

export default CreateRutinaPage;
