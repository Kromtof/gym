import { useState } from "react";
import { httpClient } from "../../shared/services/http-client";
import { useNavigate } from "react-router-dom";

export const AltaPage = () => {
  const [idstate, setIdState] = useState<number>(0);
  const [imgstate, setImgState] = useState<string>();
  const [nombrestate, setNombreState] = useState<string>("");
  const [apellidostate, setApellidoState] = useState<string>("");
  const [dnistate, setDniState] = useState<number>(0);
  const [nrosociostate, setnroSocioState] = useState<number>(0);
  const [birthstate, setBdateState] = useState<string>("");
  const [genderstate, setGenderState] = useState<string>("");
  const [countrystate, setCountryState] = useState<string>("");
  const [mailstate, setMailState] = useState<string>("");

  let navigate = useNavigate();

  return (
    <div>
      <h1>REGISTRO A LB-GYM</h1>
      <div className="user-form">
        <h1>Nuevo Usuario</h1>
        <form
          className="form-edit"
          onSubmit={(event: React.FormEvent): void => {
            event.preventDefault();
            const promAdd = httpClient.post({
              id: idstate,
              imagen: imgstate,
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
          <div className="form-row">
            <label>id</label>
            <input
              type="number"
              placeholder="ingrese su id"
              name="id"
              onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
                setIdState(parseInt(ev.target.value))
              }
            />
          </div>
          <div className="form-row">
            <label>imagen</label>
            <input
              type="file"
              placeholder="ingrese su imagen"
              name="imagen"
              onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
                setImgState(ev.target.value)
              }
            />
          </div>
          <div className="form-row">
            <label>Nombre</label>
            <input
              type="text"
              placeholder="ingrese su nombre"
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
              placeholder="ingrese su apellido"
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
                placeholder="ingrese su dni"
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
                placeholder="ingrese su nroSocio"
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
                placeholder="ingrese su fecha de nacimiento"
                name="fechaNacimiento"
                onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
                  setBdateState(ev.target.value)
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
                onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
                  setGenderState(ev.target.value)
                }
              />
              <label htmlFor="O">Otro</label>
            </div>

            <div className="form-row">
              Nacionalidad:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <select
                name="nacionalidad"
                id="nacionalidad"
                onSelect={(ev: React.ChangeEvent<HTMLSelectElement>): void =>
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
                placeholder="ingrese su correo"
                name="email"
                onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
                  setMailState(ev.target.value)
                }
              />
            </div>

            <button>Add new user</button>
          </div>
        </form>
      </div>
    </div>
  );
};
