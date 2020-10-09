import {Empresa} from "../entity/Empresa";
import {buscarEmpresaId, guardarEmpresa} from "../models/empresa.model";
import {respuesta, status} from "../helpers/funcionesGenerales";
import {Usuario} from "../entity/Usuario";
import {guardarUsuario} from "../models/usuario.model";
import * as bcrypt from "bcrypt";
import {buscarRol} from "../models/rol.model";

export async function crearEmpresa(request, response) {
    const empresa = new Empresa(request.body)
    try {
        const empresaCreada = await guardarEmpresa(empresa)
        return respuesta(response, status.created, "La nueva empresa se creo con exito", {empresa: empresaCreada})
    } catch (e) {
        return respuesta(response, status.error, "Oops!, esto no deberia de pasar, no se pudo guardar la empresa", {error: e.toString()})
    }
}

export async function agregarUsuarioEmpresa(request, response) {
    const usuario = new Usuario(request.body)
    usuario.empresa = await buscarEmpresaId(request.empresaID)
    usuario.password = await bcrypt.hash(usuario.password, 10)
    usuario.rol = [await buscarRol(3)]
    try {
        const usuarioCreado = await guardarUsuario(usuario)
        delete usuarioCreado.password
        return respuesta(response, status.created, 'Usuario creado con exito!', {usuario: usuarioCreado})
    } catch (e) {
        e.toString().includes('correo') ?
            respuesta(response, status.bad, 'El email ya fue registrado en otro usuario', {error: e.toString()})
            :
            respuesta(response, status.error, 'Oops!, esto no deberia de pasar, no se pudo guardar el usuario', {error: e.toString()})
    }
}
