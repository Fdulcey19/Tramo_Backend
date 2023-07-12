import Conductores from "../models/Conductores.js";
import cloudinary from 'cloudinary';

export const verConductor = async (req, res) => {
  try {
    const usuario = req.idUsuario;
    const conductorFound = await Conductores.findById(usuario);
    if (!conductorFound) {
      return res.status(400).json(" !Conductor no existente! ");
    }

    res.status(200).json(conductorFound);
  } catch (error) {
    console.log(error);
    return res.status(500).json(" !Error en el servidor! ");
  }
};

export const actualizarDatosConductor = async (req, res) => {
  try {
    const requestBody = JSON.parse(req.body.body);
    const { id } = req.params;

    const { nombreCON, apellidoCON, DireccionResidenciaCON, nroTelefonoCON } = requestBody;
    if(!nombreCON || !apellidoCON || !DireccionResidenciaCON || !nroTelefonoCON){
      return res.status(400).json("Todos los datos son requeridos")
    }

    let idImgUsuario;
    let urlImgUsuario;

    if (req.files.perfilImgCon) {
      const result = await cloudinary.uploader.upload(
        req.files.perfilImgCon[0].path
      );
      idImgUsuario = result.public_id;
      urlImgUsuario = result.secure_url;
    }else{
      return res.status(400).json("La imagen de perfil es requerida");
    }

    const updateData = {
      nombreCON: nombreCON,
      apellidoCON: apellidoCON,
      DireccionResidenciaCON: DireccionResidenciaCON,
      nroTelefonoCON: nroTelefonoCON,
      perfil: {
        idfotoperfilCON: idImgUsuario,
        fotoperfilCON: urlImgUsuario,
      },
    };

    const conductorActualizado = await Conductores.findByIdAndUpdate(
      id,
      updateData
    );
    if (!conductorActualizado) {
      return res.status(400).json(" !No se pudo Actualizar el usuario! ");
    }

    res.status(200).json(" !Cliente Empresa Actualizado Correctamente! ");
  } catch (error) {
    console.log(error);
    return res.status(500).json(" !Error en el servidor! ");
  }
};
