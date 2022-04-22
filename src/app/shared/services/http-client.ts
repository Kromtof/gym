export interface Socio {
  id: number;
  imagen: any;
  nombre: string;
  apellido: string;
  dni: number;
  nroSocio: number;
  fechaNacimiento: string;
  genero: string;
  nacionalidad: string;
  email: string;
}

export interface Ejercicio {
  id: number;
  imagen: any;
  nombre: string;
  gruposMusculares: string[];
}

let socios: Socio[] = [
  {
    id: 1,
    imagen: "",
    nombre: "Lucas",
    apellido: "Blanco",
    dni: 39268594,
    nroSocio: 1234,
    fechaNacimiento: "27/20/1995",
    genero: "masculino",
    nacionalidad: "Argentino",
    email: "blanco.lucas.manuel@gmail.com",
  },
];

let ejercicios: Ejercicio[] = [
  {
    id: 1,
    nombre: "Pull up",
    gruposMusculares: ["espalda", "biceps"],
    imagen: "",
  },
];

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

function post(route: "socios", socio: Socio): Promise<any>;
function post(route: "ejercicios", ejercicio: Ejercicio): Promise<any>;
function post(route: "socios" | "ejercicios", data: Socio | Ejercicio) {
  const dataStore = route === "socios" ? socios : ejercicios;
  dataStore.push(data as any);
  console.log(dataStore);
  return toPromise("OK");
}

function remove(route: `socios/${number}` | `ejercicios/${number}`) {
  const dataStore = route.includes("socios") ? socios : ejercicios;
  const id = Number(route.split("/")[1]);
  dataStore.splice(dataStore.findIndex((x) => x.id === id));
  console.log(socios);
  return toPromise("OK");
}

function put(route: `socios/${number}`, socio: Socio): Promise<any>;
function put(route: `ejercicios/${number}`, ejercicio: Ejercicio): Promise<any>;
function put(
  route: `socios/${number}` | `ejercicios/${number}`,
  data: Socio | Ejercicio
) {
  const dataStore = route.includes("socios") ? socios : ejercicios;
  const id = Number(route.split("/")[1]);
  dataStore[dataStore.findIndex((x) => x.id === id)] = data;
  console.log(dataStore);
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
