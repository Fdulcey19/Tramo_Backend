import Pedido from "../models/Pedido.js";
import cloudinary from "cloudinary";
import admin from "firebase-admin";
import { CLIENTEMAIL_FBS, PRIVATEKEY_FBS, PROJECTID_FBS } from "../config.js";
import Conductores from "../models/Conductores.js";
import ClienteNatural from "../models/ClienteNatural.js";
import ClienteEmpresa from "../models/ClienteEmpresa.js";
import PropietarioVehiculos from "../models/PropietarioVehiculos.js";
import TenedorVehiculo from "../models/TenedorVehiculo.js";
import Vehiculos from "../models/Vehiculos.js";

// inicializa la app de Firebase
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: PROJECTID_FBS,
    clientEmail: CLIENTEMAIL_FBS,
    privateKey:
      "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCZ9mlWFM2AmR72\nAZ6Ho5mlCnpx1tSPSLi0ykwbz11PIBQ9wwz8QiEcxpmzL32COpeHFhFSec3CFaRN\n0sGWukpazxFQ/MQ3wWYdDMVli/3nY5PRCA0bAmIHZ2zZJNMdaVFpGLUCmZ8SlC0V\n7W7sxtrIUHAetChzHsEg0XWnDkcGFtHltaj26sL03MdURGPVdTFsfyEPX1w5hXzN\nUMQlvyIt6Jq/kW4BOKcL7NAsBSRWG+hlqdkBsmxYlbED4Vgwprpbj/RG2e+HAZY7\njxRaIpg3uV6Z2CcR2wQmTMczwpdfRkaLuTRyKTFL10pR5gYZ69GzGDbW/+JQ20Vk\nBM3FA/UDAgMBAAECggEAA9xplNaNtsFgROQSgS1Jn5ltK6irCPLWavY9xV7EZMUV\nrNzU2QihgvK6DQPOXnMwtJsJkStrzQe06Jy17R072x4hPYoxM4K+mFDnLF4/3ksh\nfFb62SgMpEnkMWfagXzQJVYQyAFpO1KK9OdQ5lAwUWCvBx4We5iUWEnYbPmPL2he\nHetIUtOrwjOcuh0FnrEFhiSe55VcWrTdaaLoaI2H2lJO6A6N2aGjXi/PsVRQxkiu\nEyzNjGSgdsnSAzSY0rK8vSSrJwDjT5e+/swpO9XGHwYJQ0lN4JG29r+aaajWurWu\nyEbODz2Bi1i4bpsrlJFiu80EBI/YS3WJoaupW6hMnQKBgQDTieeUDlTVbDzXilg/\nkwOqWQxTw4qNxLS0Bn/AKOSM01Fgg5D3aA6Nf50/7228+Kt8qI0/Sri+iJzvmYu6\nDIWgDQV9U33/xI4imZAjRhT0OFsJs4rD4XFUZi0kuz8Y88c2Qs6qg6gfum+wsMQh\nCnELs9fz4Pq3vwiS3x2LiLjbvwKBgQC6Uo16rxvzUR1WtuFbhd4j5+O5Z4QhPCkp\nlZ9lvIhGtysDWSLS8Ck+Qg+QDxtSFmrV1l1dK2HoeJ786eOX3VMc+TItewY3fg+r\nn6KRcGu6xVJLCULZC49gZNWy8OGD8SgR7TwbfLUgsz4LmUAVi1Fy3gjCcVRlKvdd\nrDA68ViHvQKBgFC7rPpAjff2GzJXxl5dCWUWHzJIyrRYgm7CnDcGZFOqwsAG9mi1\n+ffe4HDqPAOHFEu7OE0Tg3aURPDctQsIhGcVESdHmirnJSfnW69aq9yZNYV6VFd1\nzv7bEBeYrvgi8cCvtpg1LxEM4luY2wGRLpu8w4p8LrO54NfM90WtpH+ZAoGASkA9\nu2dvJw7rNzRYKIX3ma1+ldNH14rHCJhk1kFEuZGjJYlvFEq61OG0m/85LwRZ/O+Z\nc1inguIW0clPdqSvy3sPYQqG1rR5ADb0rSr085BRFDAToLU3pP1qIA5YgKEpC8PT\n0UxoTijAEBU5cZx8j98l9H7/V/XAcGb/LW4ijq0CgYARLP3pgwqZB63Y8OWHEMh/\nECvQZGfMTzUqVhKmWnBeUNZAwmkKi5fzh3BBex/VjYqREQxmdQGloYx8s0ApD1Nl\nK6tEG+Ud7lScSEc5Ucc+LlcQpH9nyYcfkDg+Tw0oYM4Z+cPjAcDxqLdgVWlzXhNi\n5BdD2Kzhfy4yrZhx6cQn1A==\n-----END PRIVATE KEY-----\n",
  }),
});

export const crearPedido = async (req, res) => {
  try {
    const requestBody = JSON.parse(req.body.body);

    let idImgPedido = null;
    let urlImgPedido = null;

    if (req.files.imgPedido) {
      const imagePedido = await cloudinary.uploader.upload(
        req.files.imgPedido[0].path
      );
      idImgPedido = imagePedido.public_id;
      urlImgPedido = imagePedido.secure_url;
    }

    const {
      latitudRE,
      longitudRE,
      latitudDE,
      longitudDE,
      tipoDES,
      tipoIdentificacionDES,
      numeroIdentificacionDES,
      nombreEntidadDES,
      razonSocialDES,
      tipoCarga,
      producto,
      empaque,
      riesgo,
      cantidadAproximada,
      cuidadoCarga,
    } = requestBody;

    const pedidoModel = new Pedido(requestBody);
    pedidoModel.imagePedido.idImg = idImgPedido;
    pedidoModel.imagePedido.urlImg = urlImgPedido;
    pedidoModel.recogida.latitud = latitudRE;
    pedidoModel.recogida.longitud = longitudRE;
    pedidoModel.destino.latitud = latitudDE;
    pedidoModel.destino.longitud = longitudDE;
    pedidoModel.destinatario.tipo = tipoDES;
    pedidoModel.destinatario.tipoIdentificacion = tipoIdentificacionDES;
    pedidoModel.destinatario.numeroIdentificacion = numeroIdentificacionDES;
    pedidoModel.destinatario.nombreEntidad = nombreEntidadDES;
    pedidoModel.destinatario.razonSocial = razonSocialDES;
    pedidoModel.carga.tipoCarga = tipoCarga;
    pedidoModel.carga.producto = producto;
    pedidoModel.carga.empaque = empaque;
    pedidoModel.carga.riesgo = riesgo;
    pedidoModel.carga.cantidadAproximada = cantidadAproximada;
    pedidoModel.carga.cuidadoCarga = cuidadoCarga;
    pedidoModel.carga.cuidadoCarga = cuidadoCarga;

    const pedidoSave = await pedidoModel.save();

    const conductorFound = await Conductores.findById(pedidoSave.id_conductor);
    const usuarioNatural = await ClienteNatural.findById(pedidoSave.id_usuario);

    if (usuarioNatural) {
      const { token_fbs } = conductorFound;

      var imgPerfilUsuario = usuarioNatural.perfil.fotoPerfilPNA;
      var nombre = usuarioNatural.nombrePNA;
      var telefono = usuarioNatural.nroTelefonoPNA;
      var calificacion = usuarioNatural.calificacionPNA;

      const message = {
        notification: {
          title: "Nuevo pedido",
          body: " !Tienes una nueva solicitud de pedido! ",
        },
        data: {
          // tipo de datos para validacion
          tipo: "pedido",
          // usuario
          imgPerfil: imgPerfilUsuario.toString(),
          nombre: nombre.toString(),
          telefono: telefono.toString(),
          calificacion: calificacion.toString(),
          // pedido
          idPedido: pedidoSave._id.toString(),
          imgPedido: pedidoSave.imagePedido.urlImg.toString(),
          riegoCarga: pedidoSave.carga.riesgo.toString(),
          cantidadCarga: pedidoSave.carga.cantidadAproximada.toString(),
          producto: pedidoSave.carga.producto.toString(),
          cuidadoCarga: pedidoSave.carga.cuidadoCarga.toString(),
          pagoCarga: pedidoSave.pagoCarga.toString(),
          pagoDescarge: pedidoSave.pagoDescarge.toString(),

          latitudInicial: pedidoSave.recogida.latitud.toString(),
          longitudInicial: pedidoSave.recogida.longitud.toString(),

          latitudFinal: pedidoSave.destino.latitud.toString(),
          longitudFinal: pedidoSave.destino.longitud.toString(),

          precioCarga: pedidoSave.costosViaje.toString(),
          addressInicial: pedidoSave.addressInicial.toString(),
          addressFinal: pedidoSave.addressFinal.toString(),
        },
        token: token_fbs,
      };

      const response = await admin.messaging().send(message);
      console.log("Mensaje enviado:", response);

    } else if (!usuarioNatural) {
      const { token_fbs } = conductorFound;
      const usuarioEmpresa = await ClienteEmpresa.findById(
        pedidoSave.id_usuario
      );
      var nombre = usuarioEmpresa.nombreEmpresa;
      var telefono = usuarioEmpresa.nroTelefonoPJU;
      var imgPerfilUsuario =
        "https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png";
      var calificacion = usuarioEmpresa.calificacionPJU;

      const message = {
        notification: {
          title: "Nuevo pedido",
          body: " !Tienes una nueva solicitud de pedido! ",
        },
        data: {
          // tipo de datos para validacion
          tipo: "pedido",
          // usuario
          imgPerfil: imgPerfilUsuario.toString(),
          nombre: nombre.toString(),
          telefono: telefono.toString(),
          calificacion: calificacion.toString(),
          // pedido
          idPedido: pedidoSave._id.toString(),
          imgPedido: pedidoSave.imagePedido.urlImg.toString(),
          riegoCarga: pedidoSave.carga.riesgo.toString(),
          cantidadCarga: pedidoSave.carga.cantidadAproximada.toString(),
          producto: pedidoSave.carga.producto.toString(),
          cuidadoCarga: pedidoSave.carga.cuidadoCarga.toString(),

          latitudInicial: pedidoSave.recogida.latitud.toString(),
          longitudInicial: pedidoSave.recogida.longitud.toString(),

          latitudFinal: pedidoSave.destino.latitud.toString(),
          longitudFinal: pedidoSave.destino.longitud.toString(),

          precioCarga: pedidoSave.costosViaje.toString(),
          addressInicial: pedidoSave.addressInicial.toString(),
          addressFinal: pedidoSave.addressFinal.toString(),
        },
        token: token_fbs,
      };

      const response = await admin.messaging().send(message);
      console.log("Mensaje enviado:", response);
    }

    res.status(200).json({
      id_pedido: pedidoSave._id,
      messagge: "Pedido en proceso de aceptación",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(" !Error en el servidor! ");
  }
};

export const aceptarPedido = async (req, res) => {
  try {
    const { id } = req.params;

    const pedidoAceptado = await Pedido.findByIdAndUpdate(id, {
      "estado.enEspera": false,
      "estado.atendiendo": true,
      "estado.terminado": false,
    });

    await Conductores.findByIdAndUpdate(pedidoAceptado.id_conductor, {
      "estadoCON.disponibilidadCON": false
    })

    if (!pedidoAceptado) {
      return res.status(400).json("! No se pudo aceptar el pedido!");
    }

    const usuarioNatural = await ClienteNatural.findById(
      pedidoAceptado.id_usuario
    );
    if (usuarioNatural) {
      const { token_fbs } = usuarioNatural;
      const message = {
        notification: {
          title: "TRAMO",
          body: " !Tu Pedido a sido Aceptado! ",
        },
        token: token_fbs,
      };

      const response = await admin.messaging().send(message);
      console.log("Mensaje enviado:", response);

    } else if (!usuarioNatural) {
      const usuarioEmpresa = await ClienteEmpresa.findById(
        pedidoAceptado.id_usuario
      );
      const { token_fbs } = usuarioEmpresa;
      const message = {
        notification: {
          title: "TRAMO",
          body: " !Tu Pedido a sido Aceptado! ",
        },
        token: token_fbs,
      };

      const response = await admin.messaging().send(message);
      console.log("Mensaje enviado:", response);
    }

    res.status(200).json("Pedido aceptado");
  } catch (error) {
    console.log(error);
    return res.status(500).json(" !Error en el servidor! ");
  }
};

export const rechazarPedido = async (req, res) => {
  try {
    const { id } = req.params;
    const pedidoRechazado = await Pedido.findByIdAndUpdate(id, {
      "estado.enEspera": true,
      "estado.atendiendo": false,
      "estado.terminado": false
    });

    if (!pedidoRechazado) {
      return res.status(400).json("! No se pudo rechazar el pedido!");
    }

    const usuarioNatural = await ClienteNatural.findById(
      pedidoRechazado.id_usuario
    );
    if (usuarioNatural) {
      const { token_fbs } = usuarioNatural;
      const message = {
        notification: {
          title: "TRAMO",
          body: " !Tu Pedido a sido Rechazado! ",
        },
        token: token_fbs,
      };

      const response = await admin.messaging().send(message);
      console.log("Mensaje enviado:", response);
      
    } else if (!usuarioNatural) {
      const usuarioEmpresa = await ClienteEmpresa.findById(
        pedidoRechazado.id_usuario
      );
      const { token_fbs } = usuarioEmpresa;
      const message = {
        notification: {
          title: "TRAMO",
          body: " !Tu Pedido a sido Rechazado! ",
        },
        token: token_fbs,
      };

      const response = await admin.messaging().send(message);
      console.log("Mensaje enviado:", response);
    }

    res.status(200).json("Pedido Rechazado");
  } catch (error) {
    console.log(error);
    return res.status(500).json(" !Error en el servidor! ");
  }
};

export const verEstadoPedido = async (req, res) => {
  try {
    const pedido = await Pedido.find().lean();
    if (!pedido) {
      return res.status(400).json("! No se pudo rechazar el pedido!");
    }
    res.status(200).json(pedido);
  } catch (error) {
    console.log(error);
    return res.status(500).json(" !Error en el servidor! ");
  }
};

export const pedidoEnEspera = async (req, res) => {
  try {
    const pedidoEnEspera = await Pedido.find({
      "estado.enEspera": true,
    }).lean();
    if (!pedidoEnEspera) {
      return res.status(400).json("Error al traer los pedidos en espera");
    }
    res.status(200).json(pedidoEnEspera);
  } catch (error) {
    console.log(error);
    return res.status(500).json(" !Error en el servidor! ");
  }
};

export const terminarPedido = async (req, res) => {
  try {
    const { id } = req.params;
    // const pedidoFound = await Pedido.findById(id).lean();
    // if (pedidoFound.estado.terminado === true) {
    //   return res.status(400).json("El pedido ya a sido terminado");
    // } else if (pedidoFound.estado.atendiendo === false) {
    //   return res.status(400).json("El pedido no a sido atendido");
    // }

    const pedidoTerminado = await Pedido.findByIdAndUpdate(id, {
      "estado.enEspera": false,
      "estado.atendiendo": false,
      "estado.terminado": true,
    });

    if (!pedidoTerminado) {
      return res.status(400).json("! No se pudo terminar el pedido!");
    }

    const usuarioNatural = await ClienteNatural.findById(
      pedidoTerminado.id_usuario
    );
    if (usuarioNatural) {
      const { token_fbs } = usuarioNatural;
      const message = {
        notification: {
          title: "Pedido Finalizado",
          body: " !Tu pedido a sido transportado correctamente a su destino! ",
        },
        token: token_fbs,
      };

      const response = await admin.messaging().send(message);
      console.log("Mensaje enviado:", response);

    } else if (!usuarioNatural) {
      const usuarioEmpresa = await ClienteEmpresa.findById(
        pedidoTerminado.id_usuario
      );
      const { token_fbs } = usuarioEmpresa;

      const message = {
        notification: {
          title: "Pedido Finalizado",
          body: " !Tu pedido a sido transportado correctamente a su destino! ",
        },
        token: token_fbs,
      };

      const response = await admin.messaging().send(message);
      console.log("Mensaje enviado:", response);

    }

    res.status(200).json("Pedido Terminado");

  } catch (error) {
    console.log(error);
    return res.status(500).json(" !Error en el servidor! ");
  }
};

export const calificacionPedido = async (req, res) => {
  try {
    const { id } = req.params;
    const { calificacionCONServis, calificacionSEVServis } = req.body;
    if (!calificacionCONServis || !calificacionSEVServis) {
      return res.status(400).json("Las calificaciones son requeridas");
    }
    const pedidoCalificado = await Pedido.findByIdAndUpdate(id, {
      calificacionConductorPED: calificacionCONServis,
      calificacionServicioPED: calificacionSEVServis,
    });
    if (!pedidoCalificado) {
      return res
        .status(400)
        .json("No se pudo calificar el conductor y servicio");
    } 

    const conductorFound = await Conductores.findById(pedidoCalificado.id_conductor)

    var newCalificacion = (parseFloat(conductorFound.calificacionCON) + parseFloat(calificacionCONServis)) / 2 
    var newCantificacionpedido = (parseInt(conductorFound.numeroViajesCON) + 1)

    const conductorCalificacionUpdate = await Conductores.findByIdAndUpdate(conductorFound._id,{
      calificacionCON: newCalificacion,
      numeroViajesCON: newCantificacionpedido
    })

    if(!conductorCalificacionUpdate){
      return res
      .status(400)
      .json("Error al actualizar los datos de calificación");
    }

  

    res.status(200).json("Pedido Calificado");
  } catch (error) {
    console.log(error);
    return res.status(500).json(" !Error en el servidor! ");
  }
};


export const calificacionUsuarioPedido = async(req, res)=>{
  try {
    const { id } = req.params;
    const { calificacionUsuario } = req.body;

    console.log(req.params)
    console.log(req.body)
    if (!calificacionUsuario) {
      return res.status(400).json("La calificacion del usuario es requerida");
    }

    const clienteNaturalFound = await ClienteNatural.findById(id)
    if(clienteNaturalFound){
      var newCalificacionNatural = (parseFloat(clienteNaturalFound.calificacionPNA) + parseFloat(calificacionUsuario)) / 2 
      await ClienteNatural.findByIdAndUpdate(clienteNaturalFound._id,{
        calificacionPNA: newCalificacionNatural,
      })
    }else if(!clienteNaturalFound){
      const clienteEmpresaFound = await ClienteEmpresa.findById(id)
      var newCalificacionEmpresa = (parseFloat(clienteEmpresaFound.calificacionPJU) + parseFloat(calificacionUsuario)) / 2 
      await ClienteEmpresa.findByIdAndUpdate(clienteEmpresaFound._id,{
        calificacionPJU: newCalificacionEmpresa,
      })
    }  

    res.status(200).json("Usuario Calificado");

  } catch (error) {
    console.log(error);
    return res.status(500).json(" !Error en el servidor! ");
  }
}

export const verHistoriales = async (req, res) => {
  try {
    const pedidosManifestos = await Pedido.find({
      "estado.enEspera": false
    }).populate("id_conductor");

    const historial = [];
    await Promise.all(
      pedidosManifestos.map(async (pedidoManifesto) => {
        const usuarioNatural = await ClienteNatural.findById(
          pedidoManifesto.id_usuario
        );
        const usuarioEmpresa = await ClienteEmpresa.findById(
          pedidoManifesto.id_usuario
        );
        if (usuarioEmpresa) {
          const usuarioPedido = { pedidoManifesto, usuario: usuarioEmpresa };
          historial.push(usuarioPedido);
        } else if (usuarioNatural) {
          const usuarioPedido = { pedidoManifesto, usuario: usuarioNatural };
          historial.push(usuarioPedido);
        }
      })
    );

    if (historial.length === 0) {
      return res.status(400).json("No existen pedidos");
    }

    res.status(200).json(historial);
  } catch (error) {
    console.log(error);
    return res.status(500).json(" !Error en el servidor! ");
  }
};

export const verManifiesto = async (req, res) => {
  try {
    const { id } = req.params;
    const pedido = await Pedido.findById(id).populate("id_conductor");
    if (!pedido) {
      return res
        .status(400)
        .json("No existen un pedido con los datos suministrados");
    }
    const vehiculo = await Vehiculos.findOne({
      idConductorVeh: pedido.id_conductor._id,
    });
    if (!vehiculo) {
      return res
        .status(400)
        .json("No existen un vehiculo con los datos suministrados");
    }
    const propietario = await PropietarioVehiculos.findOne({
      idVehiculoPRO: vehiculo._id,
    });
    if (!propietario) {
      return res
        .status(400)
        .json("No existen un propietario con los datos suministrados");
    }
    const tenedor = await TenedorVehiculo.findOne({
      idVehiculoTE: vehiculo._id,
    });
    if (!tenedor) {
      return res
        .status(400)
        .json("No existen un tenedor con los datos suministrados");
    }
    const usuarioNatural = await ClienteNatural.findById(pedido.id_usuario);
    const usuarioEmpresa = await ClienteEmpresa.findById(pedido.id_usuario);
    if (usuarioEmpresa) {
      var manifiestoModel = {
        pedido,
        vehiculo,
        propietario,
        tenedor,
        usuario: usuarioEmpresa,
      };
    } else if (usuarioNatural) {
      var manifiestoModel = {
        pedido,
        vehiculo,
        propietario,
        tenedor,
        usuario: usuarioNatural,
      };
    }

    res.status(200).json(manifiestoModel);
  } catch (error) {
    console.log(error);
    return res.status(500).json(" !Error en el servidor! ");
  }
};

export const dataPedido = async (req, res) => {
  try {
    const { id } = req.params;
    const pedidoFound = await Pedido.findById(id).populate("id_conductor");
    const usuarioNatural = await ClienteNatural.findById(
      pedidoFound.id_usuario
    );

    const { token_fbs } = pedidoFound.id_conductor;

    if (usuarioNatural) {
      var imgPerfilUsuario = usuarioNatural.perfil.fotoPerfilPNA;
      var nombre = usuarioNatural.nombrePNA;
      var telefono = usuarioNatural.nroTelefonoPNA;
      var calificacion = usuarioNatural.calificacionPNA;

      const message = {
        notification: {
          title: "Nuevo pedido",
          body: " !Tienes una nueva solicitud de pedido! ",
        },
        data: {
          // tipo de datos para validacion
          tipo: "pedido",
          // usuario
          imgPerfil: imgPerfilUsuario.toString(),
          nombre: nombre.toString(),
          telefono: telefono.toString(),
          calificacion: calificacion.toString(),  
          // pedido
          idPedido: pedidoFound._id.toString(),
          imgPedido: pedidoFound.imagePedido.urlImg.toString(),
          riegoCarga: pedidoFound.carga.riesgo.toString(),
          cantidadCarga: pedidoFound.carga.cantidadAproximada.toString(),
          producto: pedidoFound.carga.producto.toString(),
          cuidadoCarga: pedidoFound.carga.cuidadoCarga.toString(),
          pagoCarga: pedidoFound.pagoCarga.toString(),
          pagoDescarge: pedidoFound.pagoDescarge.toString(),

          latitudInicial: pedidoFound.recogida.latitud.toString(),
          longitudInicial: pedidoFound.recogida.longitud.toString(),

          latitudFinal: pedidoFound.destino.latitud.toString(),
          longitudFinal: pedidoFound.destino.longitud.toString(),

          precioCarga: pedidoFound.costosViaje.toString(),
          addressInicial: pedidoFound.addressInicial.toString(),
          addressFinal: pedidoFound.addressFinal.toString(),
        },
        token: token_fbs,
      };

      const response = await admin.messaging().send(message);
      console.log("Mensaje enviado:", response);

    } else if (!usuarioNatural) {
      const usuarioEmpresa = await ClienteEmpresa.findById(
        pedidoFound.id_usuario
      );

      var imgPerfilUsuario = "https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png";
      var nombre = usuarioEmpresa.nombreEmpresa;
      var telefono = usuarioEmpresa.nroTelefonoPJU;
      var calificacion = usuarioEmpresa.calificacionPJU;

      const message = {
        notification: {
          title: "Nuevo pedido",
          body: " !Tienes una nueva solicitud de pedido! ",
        },
        data: {
          // tipo de datos para validacion
          tipo: "pedido",
          // usuario
          imgPerfil: imgPerfilUsuario.toString(),
          nombre: nombre.toString(),
          telefono: telefono.toString(),
          calificacion: calificacion.toString(),
          // pedido
          idPedido: pedidoFound._id.toString(),
          imgPedido: pedidoFound.imagePedido.urlImg.toString(),
          riegoCarga: pedidoFound.carga.riesgo.toString(),
          cantidadCarga: pedidoFound.carga.cantidadAproximada.toString(),
          producto: pedidoFound.carga.producto.toString(),
          cuidadoCarga: pedidoFound.carga.cuidadoCarga.toString(),
          pagoCarga: pedidoFound.pagoCarga.toString(),
          pagoDescarge: pedidoFound.pagoDescarge.toString(),

          latitudInicial: pedidoFound.recogida.latitud.toString(),
          longitudInicial: pedidoFound.recogida.longitud.toString(),

          latitudFinal: pedidoFound.destino.latitud.toString(),
          longitudFinal: pedidoFound.destino.longitud.toString(),

          precioCarga: pedidoFound.costosViaje.toString(),
          addressInicial: pedidoFound.addressInicial.toString(),
          addressFinal: pedidoFound.addressFinal.toString(),
        },
        token: token_fbs,
      };

      const response = await admin.messaging().send(message);
      console.log("Mensaje enviado:", response);

    }

    res.status(200).json("Notificacion dos enviada");
  } catch (error) {
    console.log(error);
    return res.status(500).json(" !Error en el servidor! ");
  }
};

/*
  params id de conductor para actualizar y el id del pedido
  busco el pedido correspondiente y le asigno el nuevo conductor y cambio su estado a en espera 
  y mando la notificacion de pedido al nuevo condcutor correspondiente y la data requerida para dicha notificacion
*/
export const seleccionarNuevoConductor = async (req, res) => {
  try {
    const { id_pedido } = req.params;
    const { id_conductor } = req.params;

    const pedidoFound = await Pedido.findById(id_pedido).lean();
    if (!pedidoFound) {
      return res
        .status(400)
        .json("No existe un pedido relacionado con el id suministrado");
    }
    const updatePedido = await Pedido.findByIdAndUpdate(
      id_pedido,
      {
        id_conductor: id_conductor,
        "estado.enEspera": true,
        "estado.atendiendo": false,
        "estado.terminado": false,
      },
      { new: true }
    );

    const conductorFound = await Conductores.findById(
      updatePedido.id_conductor
    );
    const usuarioNatural = await ClienteNatural.findById(
      updatePedido.id_usuario
    );
    if (usuarioNatural) {
      const { token_fbs } = conductorFound;
      var imgPerfilUsuario = usuarioNatural.perfil.fotoPerfilPNA;
      var nombre = usuarioNatural.nombrePNA;
      var telefono = usuarioNatural.nroTelefonoPNA;
      var calificacion = usuarioNatural.calificacionPNA;

      const message = {
        notification: {
          title: "Nuevo pedido",
          body: " !Tienes una nueva solicitud de pedido! ",
        },
        data: {
          // tipo de datos para validacion
          tipo: "pedido",
          // usuario
          imgPerfil: imgPerfilUsuario.toString(),
          nombre: nombre.toString(),
          telefono: telefono.toString(),
          calificacion: calificacion.toString(),
          // pedido
          idPedido: pedidoFound._id.toString(),
          imgPedido: pedidoFound.imagePedido.urlImg.toString(),
          riegoCarga: pedidoFound.carga.riesgo.toString(),
          cantidadCarga: pedidoFound.carga.cantidadAproximada.toString(),
          producto: pedidoFound.carga.producto.toString(),
          cuidadoCarga: pedidoFound.carga.cuidadoCarga.toString(),
          pagoCarga: pedidoFound.pagoCarga.toString(),
          pagoDescarge: pedidoFound.pagoDescarge.toString(),

          latitudInicial: pedidoFound.recogida.latitud.toString(),
          longitudInicial: pedidoFound.recogida.longitud.toString(),

          latitudFinal: pedidoFound.destino.latitud.toString(),
          longitudFinal: pedidoFound.destino.longitud.toString(),

          precioCarga: pedidoFound.costosViaje.toString(),
          addressInicial: pedidoFound.addressInicial.toString(),
          addressFinal: pedidoFound.addressFinal.toString(),
        },
        token: token_fbs,
      };

      const response = await admin.messaging().send(message);
      console.log("Mensaje enviado:", response);

    } else if (!usuarioNatural) {

      const { token_fbs } = conductorFound;
      const usuarioEmpresa = await ClienteEmpresa.findById(
        updatePedido.id_usuario
      );

      var imgPerfilUsuario = "https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png";
      var nombre = usuarioEmpresa.nombreEmpresa;
      var telefono = usuarioEmpresa.nroTelefonoPJU;
      var calificacion = usuarioEmpresa.calificacionPJU;

      const message = {
        notification: {
          title: "Nuevo pedido",
          body: " !Tienes una nueva solicitud de pedido! ",
        },
        data: {
          // tipo de datos para validacion
          tipo: "pedido",
          // usuario
          imgPerfil: imgPerfilUsuario.toString(),
          nombre: nombre.toString(),
          telefono: telefono.toString(),
          calificacion: calificacion.toString(),
          // pedido
          idPedido: pedidoFound._id.toString(),
          imgPedido: pedidoFound.imagePedido.urlImg.toString(),
          riegoCarga: pedidoFound.carga.riesgo.toString(),
          cantidadCarga: pedidoFound.carga.cantidadAproximada.toString(),
          producto: pedidoFound.carga.producto.toString(),
          cuidadoCarga: pedidoFound.carga.cuidadoCarga.toString(),
          pagoCarga: pedidoFound.pagoCarga.toString(),
          pagoDescarge: pedidoFound.pagoDescarge.toString(),

          latitudInicial: pedidoFound.recogida.latitud.toString(),
          longitudInicial: pedidoFound.recogida.longitud.toString(),

          latitudFinal: pedidoFound.destino.latitud.toString(),
          longitudFinal: pedidoFound.destino.longitud.toString(),

          precioCarga: pedidoFound.costosViaje.toString(),
          addressInicial: pedidoFound.addressInicial.toString(),
          addressFinal: pedidoFound.addressFinal.toString(),
        },
        token: token_fbs,
      };

      const response = await admin.messaging().send(message);
      console.log("Mensaje enviado:", response);

    }
    res.status(200).json({
      id_pedido: updatePedido._id,
      messagge: "Pedido en proceso de aceptación",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(" !Error en el servidor! ");
  }
};


export const pedidoUsuarios = async (req, res) => {
  try {
    const { id } = req.params;

    let query = {};

    const usuarioNaturalFound = await ClienteNatural.findById(id).lean();
    const usuarioEmpresaFound = await ClienteEmpresa.findById(id).lean();
    const conductorFound = await Conductores.findById(id).lean();
    console.log(usuarioEmpresaFound)
    console.log(usuarioNaturalFound)
    console.log(conductorFound)

    if (usuarioNaturalFound || usuarioEmpresaFound) {
      query = { id_usuario: id };
    } else {
      query = { id_conductor: id };
    }

    const pedidos = await Pedido.find({
      ...query,
      "estado.enEspera": false,
      "estado.atendiendo": false,
      "estado.terminado": true
    }).lean();

    res.status(200).json(pedidos);
  } catch (error) {
    console.log(error);
    return res.status(500).json(" !Error en el servidor! ");
  }
};

export const verPedidoUnique = async(req ,res)=>{
  try {
    const { id } = req.params;
    const pedido = await Pedido.findById(id).lean();
    if(!pedido){
      return res.status(400).json("No existe un pedido con el id suministrado");
    }

    res.status(200).json(pedido)

  } catch (error) {
    console.log(error);
    return res.status(500).json(" !Error en el servidor! ");
  }
}

// Utilidades
export const notificacionLlegada = async(req, res)=>{
  try {
    const { id } = req.params;

    const pedidosFound = await Pedido.findById(id);

    if (!pedidosFound) {
      return res.status(400).json("! No se pudo terminar el pedido!");
    }

    const usuarioNatural = await ClienteNatural.findById(
      pedidosFound.id_usuario
    );
    if (usuarioNatural) {
      const { token_fbs } = usuarioNatural;
      const message = {
        notification: {
          title: "El Conductor a llegado",
          body: " !El Conductor al llegado al punto de requecogida! ",
        },
        token: token_fbs,
      };

      const response = await admin.messaging().send(message);
      console.log("Mensaje enviado:", response);

    } else if (!usuarioNatural) {
      const usuarioEmpresa = await ClienteEmpresa.findById(
        pedidosFound.id_usuario
      );
      const { token_fbs } = usuarioEmpresa;

      const message = {
        notification: {
          title: "El Conductor a llegado",
          body: " !El Conductor al llegado al punto de requecogida! ",
        },
        token: token_fbs,
      };

      const response = await admin.messaging().send(message);
      console.log("Mensaje enviado:", response);

    }

    res.status(200).json("Notificación Enviada");
  } catch (error) {
    console.log(error);
    return res.status(500).json(" !Error en el servidor! ");
  }
}

export const verRemesa = async (req, res) => {
  try {
    const { id } = req.params;
    let remesa = {};
    
    const pedidoFound = await Pedido.findById(id);
    
    const clienteNaturalFound = await ClienteNatural.findById(pedidoFound.id_usuario);
    const conductorFound = await Conductores.findById(pedidoFound.id_conductor);
    const vehiculoFound = await Vehiculos.findOne({ "idConductorVeh": conductorFound._id });
    
    if (clienteNaturalFound) {
      remesa = { pedidoFound, cliente: clienteNaturalFound, conductorFound, vehiculoFound };
    } else {
      const clienteEmpresaFound = await ClienteEmpresa.findById(pedidoFound.id_usuario);
      remesa = { pedidoFound, cliente: clienteEmpresaFound, conductorFound, vehiculoFound };
    }
    
    res.status(200).json(remesa);

  } catch (error) {
    console.log(error);
    return res.status(500).json("error en el servidor");
  }
};