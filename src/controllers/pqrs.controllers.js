import Pqrs from '../models/Pqrs.js';
import ClienteNatural from '../models/ClienteNatural.js';
import ClienteEmpresa from '../models/ClienteEmpresa.js';
import Conductores from '../models/Conductores.js';
import admin from "firebase-admin";

export const verPqrs = async(req, res)=>{
    try {

        const pqrsFound = [];

        const pqrs = await Pqrs.find({
          respuesta:null
        }).lean();
        for (const pqrsItem of pqrs) {
          const usuarioNaturalFound = await ClienteNatural.findById(pqrsItem.id_usuario);
          if (usuarioNaturalFound) {
            pqrsFound.push({ pqrsItem, usuario: usuarioNaturalFound });
          } else {
            const usuarioEmpresaFound = await ClienteEmpresa.findById(pqrsItem.id_usuario);
            if (usuarioEmpresaFound) {
              pqrsFound.push({ pqrsItem, usuario: usuarioEmpresaFound });
            } else {
              const usuarioConductorFound = await Conductores.findById(pqrsItem.id_usuario);
              if (usuarioConductorFound) {
                pqrsFound.push({ pqrsItem, usuario: usuarioConductorFound });
              }
            }
          }
        }
    
        res.status(200).json(pqrsFound);

    } catch (error) {
        console.log(error);
        return res.status(500).json("Error en el sevidor");
    }
}

export const crearPqrs = async(req, res)=>{
    try {
        const { tipo, motivo, id_usuario } = req.body
        if(!tipo || !motivo || !id_usuario){
            return res.status(400).json("Todos los datos son requeridos")
        }
        const pqrsModel = new Pqrs(req.body)
        await pqrsModel.save()

        res.status(200).json("Pqrs Creada");

    } catch (error) {
        console.log(error);
        return res.status(500).json("Error en el sevidor");
    }
}

export const verUniquePqrs = async(req , res)=>{
    try {
        const pqrsUnique = [];
        const { id } = req.params;
        const pqrsFound = await Pqrs.findById(id).lean();
    
        const usuarioNaturalFound = await ClienteNatural.findById(pqrsFound.id_usuario);
        if (usuarioNaturalFound) {
            pqrsUnique.push(pqrsFound, usuarioNaturalFound);
        } else {
          const usuarioEmpresaFound = await ClienteEmpresa.findById(pqrsFound.id_usuario);
          if (usuarioEmpresaFound) {
            pqrsUnique.push(pqrsFound, usuarioEmpresaFound);
          } else {
            const usuarioConductorFound = await Conductores.findById(pqrsFound.id_usuario);
            if (usuarioConductorFound) {
                pqrsUnique.push(pqrsFound, usuarioConductorFound);
            }
          }
        }
    
        res.status(200).json(pqrsUnique);
        
    } catch (error) {
        console.log(error);
        return res.status(500).json("Error en el sevidor");
    }
}


export const responderPqrs = async(req, res)=>{
  try {
    const { id } = req.params;
    const { respuesta } = req.body;
    if(!respuesta){
      return res.status(400).json("Es requerida una respuesta")
    }

    var pqrsFoundResponse = await Pqrs.findByIdAndUpdate(id, {
      respuesta: respuesta
    });

    var clienteNaturalFound = await ClienteNatural.findById(pqrsFoundResponse.id_usuario)
    if(clienteNaturalFound){

      // Notificacion a cliente Natural
      const { token_fbs } = clienteNaturalFound;
      const message = {
        notification: {
          title: "TRAMO",
          body: `!Tu PQRS tipo ${pqrsFoundResponse.tipo} a sido respondida!`,
        },
        token: token_fbs,
      };

      const response = await admin.messaging().send(message);
      console.log("Mensaje enviado:", response);

    }else if(!clienteNaturalFound){
      var clienteEmpresaFound = await ClienteNatural.findById(pqrsFoundResponse.id_usuario)
      if(clienteEmpresaFound){

        // Notificacion a cliente Empresa
        const { token_fbs } = clienteEmpresaFound;
        const message = {
          notification: {
            title: "TRAMO",
            body: `!Tu PQRS tipo ${pqrsFoundResponse.tipo} a sido respondida!`,
          },
          token: token_fbs,
        };
  
        const response = await admin.messaging().send(message);
        console.log("Mensaje enviado:", response);


      }else if(!clienteEmpresaFound){
        var conductorFound = await Conductores.findById(pqrsFoundResponse.id_usuario)
        if(conductorFound){

          // Notificacion a conductor
                  // Notificacion a cliente Empresa
        const { token_fbs } = conductorFound;
        const message = {
          notification: {
            title: "TRAMO",
            body: `!Tu PQRS tipo ${pqrsFoundResponse.tipo} a sido respondida!`,
          },
          token: token_fbs,
        };
  
        const response = await admin.messaging().send(message);
        console.log("Mensaje enviado:", response);


        }
      }
    }


    res.status(200).json("Pqrs respuesta correctamente");


  } catch (error) {
    console.log(error);
    return res.status(500).json("Error en el sevidor");
  }
}

export const verMisPqrs = async(req, res)=>{
  try {
    const { id } = req.params;
    if(!id){
      return res.status(400).json("Se requiere el id del usuario")
    }
    const myPqrs = await Pqrs.find({
      id_usuario: id,
      respuesta: { $ne: null }
    })

    res.status(200).json(myPqrs)

  } catch (error) {
    console.log(error);
    return res.status(500).json("Error en el sevidor");
  }
}