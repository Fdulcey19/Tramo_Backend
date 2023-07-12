import Conductores from "../models/Conductores.js";
import ClienteNatural from "../models/ClienteNatural.js";
import cloudinary from 'cloudinary';

export const verUsuarioNatural = async (req, res) => {
  try {
    const usuario = req.idUsuario;
    const usuarioNaturalFound = await ClienteNatural.findById(usuario, {
      tipoDocumentoPNA: 0,
      nroDocumentoPNA: 0,
      contrasenaPNA: 0,
      "perfil.idfotoPerfilPNA": 0,
    });
    if (!usuarioNaturalFound) {
      return res.status(400).json(" !Cliente Natural no existente! ");
    }
    res.status(200).json(usuarioNaturalFound);
  } catch (error) {
    console.log(error);
    return res.status(500).json(" !Error en el servidor! ");
  }
};

export const actualizarUsuarioNatural = async (req, res) => {
  try {
    const requestBody = JSON.parse(req.body.body);
    const { id } = req.params;
    const { nombrePNA, apellidoPNA, DireccionPNA, nroTelefonoPNA  } = requestBody;
    if (!nombrePNA || !apellidoPNA || !DireccionPNA || !nroTelefonoPNA) {
      return res.status(400).json("Todos los datos son requeridos");
    }

    let idImgUsuario;
    let urlImgUsuario;

    if (req.files.perfilImgNT) {
      const result = await cloudinary.uploader.upload(
        req.files.perfilImgNT[0].path
      );
      idImgUsuario = result.public_id;
      urlImgUsuario = result.secure_url;
    }else{
      return res.status(400).json("La imagen de perfil es requerida");
    }

    const updateData = {
      nombrePNA: nombrePNA,
      apellidoPNA: apellidoPNA,
      DireccionPNA: DireccionPNA,
      nroTelefonoPNA: nroTelefonoPNA,
      perfil: {
        idfotoPerfilPNA: idImgUsuario,
        fotoPerfilPNA: urlImgUsuario,
      },
    };



    await ClienteNatural.findByIdAndUpdate(id, updateData);

    res.status(200).json("Usuario Actualizado Correctamente");

  } catch (error) {
    console.log(error);
    return res.status(500).json(" !Error en el servidor! ");
  }
};

export const verDisponibles = async (req, res) => {
  try {
    const disponibles = await Conductores.find({
      "estadoCON.IngresoCON": true,
      "estadoCON.habilitadoCON": true,
      "estadoCON.conectadoCON": true,
      "estadoCON.disponibilidadCON": true,
    }).lean();

    if (!disponibles) {
      return res
        .status(400)
        .json("!No se pudo traer los conductores disponibles!");
    }

    res.status(200).json(disponibles);
  } catch (error) {
    console.log(error);
    return res.status(500).json("!Error en el servidor!");
  }
};
