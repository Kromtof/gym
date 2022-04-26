import React, { useState } from 'react'
import { Ejercicio } from '../../shared/services/http-client';

type Props = {}

const CreateRutinaPage = (props: Props) => {
    const [ejercicios, setEjercicios] = useState<Ejercicio[]>([]);
    const [series, setSeries] = useState<{ ejercicioId: number | undefined, cantRep: number, cantCiclos: number }[]>([]);

    return (
        <div className="App">
            {series.map((serie, index) => (
                <div>
                    <select value={serie.ejercicioId}>
                        {ejercicios.map((ejercicio) => (
                            <option value={ejercicio.id}>{ejercicio.nombre}</option>
                        ))}
                    </select>
                    <input placeholder="Cant rep" value={serie.cantRep}
                        onChange={ev => {
                            let nuevasSeries = series
                            nuevasSeries[index]!.cantRep = Number(ev.target.value)
                            setSeries(nuevasSeries)
                        }}
                    />
                    <input placeholder="Cant ciclos" value={serie.cantCiclos} />
                    <button onClick={() => {
                        const nuevasSeries = series.splice(index, 1)
                        setSeries(nuevasSeries)
                    }}>Borrar</button>
                </div>
            ))}
            <button
                onClick={() => {
                    const nuevasSeries = series;
                    nuevasSeries.push({
                        ejercicioId: undefined,
                        cantRep: 0,
                        cantCiclos: 0
                    });
                    setSeries(nuevasSeries);
                }}
            >
                Agregar
            </button>
        </div>
    );
}

export default CreateRutinaPage
