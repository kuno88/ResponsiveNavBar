export interface RegistroCanarios {
    id?: string,
    usuario: string|null|undefined,
    procedencia: string,
    codNumCriador?:string,
    nAnillo: string,
    genero: string,
    linea?: string,
    colorAnillo: string,
    estado:string,
    fechaEstado?:Date,
    observacionEstado?:string,
    idPadre?:string,
    idMadre?:string,
    observaciones?: string,
    fechaCreacion?:Date,
    fechaActualizacion:Date
    //poner un ? en el atributo pepe?:string lo hace opcional
}