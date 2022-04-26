export interface Socio {
  id: number;
  imagen: string;
  nombre: string;
  apellido: string;
  dni: number;
  nroSocio: number;
  fechaNacimiento: string;
  genero: string;
  nacionalidad: string;
  email: string;
}

interface SocioAlta extends Omit<Socio, "id" | "imagen"> {
  imagen: File;
}

interface SocioModificacion extends Omit<Socio, "id" | "imagen"> {
  imagen: File | string;
}

export interface Ejercicio {
  id: number;
  imagen: any;
  nombre: string;
  gruposMusculares: string[];
}

interface EjercicioAlta extends Omit<Ejercicio, "id" | "imagen"> {
  imagen: File;
}

interface EjercicioModificacion extends Omit<Ejercicio, "id" | "imagen"> {
  imagen: File | string;
}

const dbRaw = localStorage.getItem("db");

const updateDB = () =>
  localStorage.setItem("db", JSON.stringify({ socios, ejercicios }));
let socios: Socio[] = dbRaw ? JSON.parse(dbRaw).socios : [];

let ejercicios: Ejercicio[] = dbRaw ? JSON.parse(dbRaw).ejercicios : [];

function toPromise<DataType>(data: DataType) {
  return new Promise((res) => {
    setTimeout(() => res(data), 1500);
  });
}

type Route =
  | "socios"
  | `socios/${number}`
  | "ejercicios"
  | `ejercicios/${number}`
  | `socios/${number}/rutina;`;

function post(route: "socios", socio: SocioAlta): Promise<any>;
function post(route: "ejercicios", ejercicio: EjercicioAlta): Promise<any>;
function post(route: "socios" | "ejercicios", data: SocioAlta | EjercicioAlta) {
  const dataStore = route === "socios" ? socios : ejercicios;
  dataStore.push({
    ...data,
    imagen:
      data.imagen instanceof File
        ? URL.createObjectURL(data.imagen)
        : data.imagen,
    id: Math.random(),
  } as any);
  console.log(dataStore);
  updateDB();
  return toPromise("OK");
}

function remove(route: `socios/${number}` | `ejercicios/${number}`) {
  const dataStore = route.includes("socios") ? socios : ejercicios;
  const id = Number(route.split("/")[1]);
  dataStore.splice(
    dataStore.findIndex((x) => x.id === id),
    1
  );
  console.log(socios);
  updateDB();
  return toPromise("OK");
}

function put(route: `socios/${number}`, socio: SocioModificacion): Promise<any>;
function put(
  route: `ejercicios/${number}`,
  ejercicio: EjercicioModificacion
): Promise<any>;
function put(
  route: `socios/${number}` | `ejercicios/${number}`,
  data: SocioModificacion | EjercicioModificacion
) {
  const dataStore = route.includes("socios") ? socios : ejercicios;
  const id = Number(route.split("/")[1]);
  dataStore[dataStore.findIndex((x) => x.id === id)] = {
    ...data,
    imagen:
      data.imagen instanceof File
        ? URL.createObjectURL(data.imagen)
        : data.imagen,
    id: Math.random(),
  };
  console.log(dataStore);
  updateDB();
  return toPromise("OK");
}

function get(route: "socios"): Promise<Socio[]>;
function get(route: `socios/${number}`): Promise<Socio>;
function get(route: `ejercicios`): Promise<Ejercicio[]>;
function get(route: `ejercicios/${number}`): Promise<Ejercicio>;
function get(route: Route) {
  const dataStore = route.includes("socios") ? socios : ejercicios;
  const id = Number(route.split("/")[1]);
  if (id) {
    return toPromise((dataStore as any[]).find((x) => x.id === id)!);
  }
  return toPromise(dataStore);
}

export const httpClient = {
  post,
  delete: remove,
  put,
  get,
};
