import ClienteEmpresa from "../models/ClienteEmpresa.js";

export const verClienteEmpresa = async (req, res) => {
  try {
    const usuario = req.idUsuario;
    const usuarioEmpresaFound = await ClienteEmpresa.findById(usuario);
    if (!usuarioEmpresaFound) {
      return res.status(400).json(" !Cliente Empresa no existente! ");
    }
    res.status(200).json(usuarioEmpresaFound);
  } catch (error) {
    console.log(error);
    return res.status(500).json(" !Error en el servidor! ");
  }
};

export const actualizarClienteEmpresa = async(req, res)=>{
    try {
        const { id } = req.params;
        const usuarioActulizado = await ClienteEmpresa.findByIdAndUpdate(id, req.body)
        if(!usuarioActulizado){
          return res.status(400).json(" !No se pudo Actualizar el usuario! ");
        }
    
        res.status(200).json(" !Cliente Empresa Actualizado Correctamente! ");
    } catch (error) {
        console.log(error);
        return res.status(500).json(" !Error en el servidor! ");
    }
}