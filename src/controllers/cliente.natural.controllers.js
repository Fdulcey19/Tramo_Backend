import cloudinary from "cloudinary";
import ClienteNatural from "../models/ClienteNatural.js";

export const registroClienteNatural = async (req, res) => {
  try {

    const requestBody = JSON.parse(req.body.body);

    let idImgPNT;
    let urlImgPNT;

    if (req.files.perfilImgNT) {
      const imagePersonaNT = await cloudinary.uploader.upload(
        req.files.perfilImgNT[0].path
      );
      idImgPNT = imagePersonaNT.public_id;
      urlImgPNT = imagePersonaNT.secure_url;
    }

    const documentoNaturalFound = await ClienteNatural.findOne({nroDocumentoPNA: requestBody.nroDocumentoPNA});
    const correoNaturalFound = await ClienteNatural.findOne({correoElectronicoPNA: requestBody.correoElectronicoPNA});
    if(documentoNaturalFound){
        res.status(400).json("Número identidad ya registrado y en uso en la app TRAMO");
    }else if(correoNaturalFound){
        res.status(400).json("Correo electrónico ya registrado y en uso en la app TRAMO");
    }

    const modelPersonaNatural = new ClienteNatural(requestBody);
    modelPersonaNatural.perfil.idfotoPerfilPNA = idImgPNT;
    modelPersonaNatural.perfil.fotoPerfilPNA = urlImgPNT;
    modelPersonaNatural.contrasenaPNA = await modelPersonaNatural.encryptPassword(
        requestBody.contrasena
    );

    modelPersonaNatural.save();

    res.status(200).json(" !Cliente Natural Registrado Correctamente! ");
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const verClienteNaturalHabilitado = async(req, res)=>{
    try {
        const clienteNaturalHB = await ClienteNatural.find({ "estadoCLN.habilitadoPNA": true, "estadoCLN.motivoInhabilitadoPNA": null});

        res.status(200).json(clienteNaturalHB);

    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

export const inhabilitarClienteNatural = async(req, res)=>{
    try {
        const { id } = req.params;
        const { motivoInhabilitadoPNA } = req.body;
        if(!motivoInhabilitadoPNA){
            return res.status(400).json(' !Se requiere un motivo para inhabilitar al cliente! ');
        }

        const inhabilitarClienteNT = await ClienteNatural.findByIdAndUpdate(id, { "estadoCLN.habilitadoPNA": false, "estadoCLN.motivoInhabilitadoPNA": motivoInhabilitadoPNA });

        res.status(200).json(inhabilitarClienteNT);
        
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

//Clientes inhabilitados
export const verClienteNaturalInhabilitado = async(req, res)=>{
    try {
        const clienteNaturalIN = await ClienteNatural.find({ "estadoCLN.habilitadoPNA": false, "estadoCLN.motivoInhabilitadoPNA": { $ne: null }});

        res.status(200).json(clienteNaturalIN);

    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

export const habilitarClienteNatural = async(req, res)=>{
    try {
        const { id } = req.params;
        const habilitarClienteNT = await ClienteNatural.findByIdAndUpdate(id, { "estadoCLN.habilitadoPNA": true, "estadoCLN.motivoInhabilitadoPNA": null });

        res.status(200).json(habilitarClienteNT);
        
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}