export const validaCamposPedido = (req, res, next) => {

  const requestBody = JSON.parse(req.body.body);

  const {
    latitudRE,
    longitudRE,
    latitudDE,
    longitudDE,
    descripcionUbicacion,
    tipoDES,
    tipoIdentificacionDES,
    numeroIdentificacionDES,
    nombreEntidadDES,
    razonSocialDES,
    pagoCarga,
    pagoDescarge,
    tipoCarga,
    producto,
    empaque,
    riesgo,
    cantidadAproximada,
    cuidadoCarga,
    costosViaje,
    metodoPago,
    id_usuario,
    id_conductor,
    addressInicial,
    addressFinal
  } = requestBody;

  if (
    !latitudRE ||
    !longitudRE ||
    !latitudDE ||
    !longitudDE ||
    !descripcionUbicacion ||
    !tipoDES ||
    !tipoIdentificacionDES ||
    !numeroIdentificacionDES ||
    !nombreEntidadDES ||
    !razonSocialDES ||
    !pagoCarga ||
    !pagoDescarge ||
    !tipoCarga ||
    !producto ||
    !empaque ||
    !riesgo ||
    !cantidadAproximada ||
    !cuidadoCarga ||
    !costosViaje ||
    !metodoPago ||
    !id_usuario ||
    !id_conductor ||
    !addressInicial ||
    !addressFinal
  ) {
    return res.status(400).json("Todos los datos son requeridos");
  }

  next();
};
