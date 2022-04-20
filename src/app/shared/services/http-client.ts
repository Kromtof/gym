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

const toPromise = (data: any) =>
  new Promise((res) => {
    setTimeout(() => res(data), 1500);
  });

export const httpClient = {
  post: (socio: Socio) => {
    socios.push(socio);
    console.log(socios);
    return toPromise("OK");
  },
  delete: (id: number) => {
    socios = socios.filter((x) => x.id !== id);
    console.log(socios);
    return toPromise("OK");
  },
  put: (socio: Socio, id: number) => {
    socios = socios.map((x) => (x.id === id ? socio : x));
    console.log(socios);
    return toPromise("OK");
  },
  get: (id?: number) => {
    if (id) {
      return toPromise(socios.find((x) => x.id === id));
    }
    return toPromise(socios);
  },
};
