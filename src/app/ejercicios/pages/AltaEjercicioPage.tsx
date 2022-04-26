import { useState } from "react";
import { httpClient } from "../../shared/services/http-client";
import { useNavigate } from "react-router-dom";
import "./AltaEjercicioPage.css";

export const AltaEjercicioPage = () => {
  const [imgState, setImgState] = useState<File>();
  const [nombreState, setNombreState] = useState<string>("");
  const [gruposMuscularesState, setGruposMuscularesState] = useState<string[]>(
    []
  );

  function addchecked(checked: boolean, value: string): void {
    let arraydeejercicios = gruposMuscularesState;
    if (checked) {
      arraydeejercicios.push(value);
      setGruposMuscularesState(arraydeejercicios);
    } else {
      arraydeejercicios = gruposMuscularesState.filter((a) => a !== value);
      setGruposMuscularesState(arraydeejercicios);
    }
  }

  const navigate = useNavigate();

  return (
    <div>
      <h1
        style={{
          objectPosition: "center",
          marginLeft: 220,
        }}
      >
        Cargar un nuevo ejercicio!
      </h1>
      <div className="user-form">
        <form
          className="form-edit"
          onSubmit={(event: React.FormEvent): void => {
            event.preventDefault();
            const promAdd = httpClient.post("ejercicios", {
              imagen: imgState!,
              nombre: nombreState,
              gruposMusculares: gruposMuscularesState,
            });
            promAdd.then(() => {
              navigate("../listaejercicios", { replace: true });
            });
          }}
        >
          <div className="form-row">
            <label>Ejercicio:</label>
            <input
              placeholder="ingrese el nombre del ejercicio"
              type="text"
              name="nombre"
              onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
                setNombreState(ev.target.value)
              }
            />
          </div>
          <div className="form-row">
            <label>Imagen:</label>
            <input
              type="file"
              placeholder="ingrese su imagen"
              name="imagen"
              onChange={(ev) => {
                console.log(ev);
                setImgState(ev.target.files![0]);
              }}
            />
          </div>
          <div className="checkboxes">
            <label>Seleccione los grupos musculares involucrados:</label>
            <div>
              <label className="container" htmlFor="espalda">
                Espalda
                <input
                  type="checkbox"
                  name="gruposmusculares"
                  id="espalda"
                  value="espalda"
                  onChange={(event) =>
                    addchecked(event.target.checked, event.target.value)
                  }
                />
              </label>
            </div>
            <div>
              <label className="container" htmlFor="pecho">
                Pecho
                <input
                  className=""
                  type="checkbox"
                  name="gruposmusculares"
                  id="pecho"
                  value="pecho"
                  onChange={(event) =>
                    addchecked(event.target.checked, event.target.value)
                  }
                />
              </label>
            </div>
            <div>
              <label className="container" htmlFor="abdominales">
                Abdominales
                <input
                  type="checkbox"
                  name="gruposmusculares"
                  id="abdominales"
                  value="abdominales"
                  onChange={(event) =>
                    addchecked(event.target.checked, event.target.value)
                  }
                />
              </label>
            </div>
            <div>
              <label className="container" htmlFor="biceps">
                Biceps
                <input
                  type="checkbox"
                  name="gruposmusculares"
                  id="biceps"
                  value="biceps"
                  onChange={(event) =>
                    addchecked(event.target.checked, event.target.value)
                  }
                />
              </label>
            </div>
            <div>
              <label className="container" htmlFor="triceps">
                Triceps
                <input
                  type="checkbox"
                  name="gruposmusculares"
                  id="triceps"
                  value="triceps"
                  onChange={(event) =>
                    addchecked(event.target.checked, event.target.value)
                  }
                />
              </label>
            </div>
            <button>Agregar Nuevo Ejercicio</button>
          </div>
        </form>
      </div>
    </div>
  );
};
