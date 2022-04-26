import { useEffect, useState } from "react";
import { httpClient, Socio } from "../../shared/services/http-client";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export const ModificarSocioPage = () => {
  const [idstate, setIdState] = useState<number>(0);
  const [imgstate, setImgState] = useState<File | string>();
  const [nombrestate, setNombreState] = useState<string>("");
  const [apellidostate, setApellidoState] = useState<string>("");
  const [dnistate, setDniState] = useState<number>(0);
  const [nrosociostate, setnroSocioState] = useState<number>(0);
  const [birthstate, setBirthState] = useState<string>("");
  const [genderstate, setGenderState] = useState<string>("");
  const [countrystate, setCountryState] = useState<string>("");
  const [mailstate, setMailState] = useState<string>("");

  const params = useParams();
  const [socio, setSocio] = useState<Socio>();

  useEffect(() => {
    const prom = httpClient.get(`socios/${Number(params.id)}`);
    prom.then((data) => {
      setSocio(data);
      setIdState(data.id);
      setImgState(data.imagen);
      setNombreState(data.nombre);
      setApellidoState(data.apellido);
      setDniState(data.dni);
      setnroSocioState(data.nroSocio);
      setBirthState(data.fechaNacimiento);
      setGenderState(data.genero);
      setCountryState(data.nacionalidad);
      setMailState(data.email);
    });
  }, []);

  let navigate = useNavigate();
  console.log(birthstate);

  return (
    <div>
      <h1>REGISTRO A Modificar usuario:</h1>
      <div className="user-form">
        <h1>
          {idstate}-"{nombrestate} {apellidostate}"
        </h1>
        <form
          className="form-edit"
          onSubmit={(event: React.FormEvent): void => {
            event.preventDefault();
            const promAdd = httpClient.put(`socios/${socio!.id}`, {
              imagen: imgstate!,
              nombre: nombrestate,
              apellido: apellidostate,
              dni: dnistate,
              nroSocio: nrosociostate,
              fechaNacimiento: birthstate,
              genero: genderstate,
              nacionalidad: countrystate,
              email: mailstate,
            });
            promAdd.then(() => {
              navigate("../listasocios", { replace: true });
            });
          }}
        >
          {typeof imgstate === "string" ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img
                src={imgstate}
                style={{
                  width: 100,
                  height: 100,
                  objectFit: "cover",
                  objectPosition: "center",
                  marginBottom: 20,
                  borderRadius: 10,
                }}
              />
              <button onClick={() => setImgState(undefined)}>
                Cambiar Imagen
              </button>
            </div>
          ) : (
            <div className="form-row">
              <label>imagen</label>
              <input
                type="file"
                name="imagen"
                onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
                  setImgState(ev.target.value)
                }
              />
            </div>
          )}

          <div className="form-row">
            <label>Nombre</label>
            <input
              type="text"
              value={nombrestate}
              name="nombre"
              onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
                setNombreState(ev.target.value)
              }
            />
          </div>
          <div className="form-row">
            <label>Apellido</label>
            <input
              type="text"
              value={apellidostate}
              name="apellido"
              onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
                setApellidoState(ev.target.value)
              }
            />
          </div>

          <div className="form-row">
            <div className="form-row">
              <label>DNI</label>
              <input
                type="number"
                value={dnistate.toString()}
                name="dni"
                onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
                  setDniState(parseInt(ev.target.value))
                }
              />
            </div>
            <div className="form-row">
              <label>nroSocio</label>
              <input
                type="number"
                value={nrosociostate.toString()}
                name="nroSocio"
                onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
                  setnroSocioState(parseInt(ev.target.value))
                }
              />
            </div>
            <div className="form-row">
              <label>fechaNacimiento</label>

              <input
                type="date"
                defaultValue={birthstate}
                name="fechaNacimiento"
                onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
                  setBirthState(ev.target.value)
                }
              />
            </div>
            <div>Género:</div>
            <div className="radio-genero">
              <input
                className="circulito"
                type="radio"
                name="radio_genero"
                id="M"
                value="Masculino"
                checked={genderstate === "Masculino"}
                onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
                  setGenderState(ev.target.value)
                }
              />
              <label htmlFor="M"> Masculino </label>
              <input
                className="circulito"
                type="radio"
                name="radio_genero"
                id="F"
                value="Femenino"
                checked={genderstate === "Femenino"}
                onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
                  setGenderState(ev.target.value)
                }
              />
              <label htmlFor="F">Femenino</label>
              <input
                type="radio"
                name="radio_genero"
                id="O"
                value="Otro"
                checked={genderstate === "Otro"}
                onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
                  setGenderState(ev.target.value)
                }
              />
              <label htmlFor="O">Otro</label>
            </div>

            <div className="form-row">
              Nacionalidad: &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <select
                value={countrystate}
                name="nacionalidad"
                id="nacionalidad"
                onChange={(ev: React.ChangeEvent<HTMLSelectElement>): void =>
                  setCountryState(ev.target.value)
                }
              >
                <option value="null">...</option>
                <option value="Argentino">Argentino</option>
                <option value="Boliviano">Boliviano</option>
                <option value="Colombiano">Colombiano</option>
                <option value="Paraguayo">Paraguayo</option>
                <option value="Uruguayo">Uruguayo</option>
                <option value="Venezolano">Venezolano</option>
              </select>
            </div>
            <div className="form-row">
              <label>Email</label>
              <input
                type="text"
                value={mailstate}
                name="email"
                onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
                  setMailState(ev.target.value)
                }
              />
            </div>

            <button>Update user</button>
          </div>
        </form>
      </div>
    </div>
  );
};
