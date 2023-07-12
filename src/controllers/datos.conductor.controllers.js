import Conductores from "../models/Conductores.js";
import ContactorEmergencia from "../models/ContactorEmergencia.js";
import Vehiculos from "../models/Vehiculos.js";
import ImageVehiculos from "../models/ImageVehiculos.js";
import PropietarioVehiculos from "../models/PropietarioVehiculos.js";
import TenedorVehiculo from "../models/TenedorVehiculo.js";

//Conductores habilitados
export const conductoresHabilitados = async (req, res) => {
  try {
    const conductoresHabilitados = await Conductores.find({
      "estadoCON.IngresoCON": true,
      "estadoCON.habilitadoCON": true,
      motivoInhabilitadoCON: null,
      motivoRechazoCON: null,
    });

    const conductoresConVehiculosHabiliados = [];
    for (const conductor of conductoresHabilitados) {
      const vehiculoSolicitud = await Vehiculos.findOne({
        idConductorVeh: conductor._id,
      });
      if (vehiculoSolicitud) {
        const conductorConVehiculo = { conductor, vehiculoSolicitud };
        conductoresConVehiculosHabiliados.push(conductorConVehiculo);
      }
    }

    res.status(200).json(conductoresConVehiculosHabiliados);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const verUnicoConductorHabilitado = async (req, res) => {
  try {
    const conductorHailitadoFind = [];

    const { id } = req.params;
    const unicoConductor = await Conductores.findById(id);
    const contactoEmergencia = await ContactorEmergencia.findOne({
      idConductorCEM: unicoConductor._id,
    });
    const vehiculo = await Vehiculos.findOne({
      idConductorVeh: unicoConductor._id,
    });
    const imagenes = await ImageVehiculos.findOne({
      idVehiculoFotos: vehiculo._id,
    });
    const propietario = await PropietarioVehiculos.findOne({
      idVehiculoPRO: vehiculo._id,
    });
    const tenedor = await TenedorVehiculo.findOne({
      idVehiculoTE: vehiculo._id,
    });

    const conductor = {
      unicoConductor,
      contactoEmergencia,
      vehiculo,
      imagenes,
      propietario,
      tenedor,
    };

    conductorHailitadoFind.push(conductor);

    res.status(200).json(conductorHailitadoFind);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const inhabilitarConductor = async (req, res) => {
  try {
    const { id } = req.params;
    const { motivoInhabilitadoCON } = req.body;
    if (!motivoInhabilitadoCON) {
      return res.status(400).json(" !Se requiere un motivo de ihabilitación! ");
    }
    const inhabilitacionConductor = await Conductores.findByIdAndUpdate(id, {
      motivoInhabilitadoCON,
      "estadoCON.habilitadoCON": false
    });
    if (!inhabilitacionConductor) {
      return res.status(400).json(" !No se pudo Inhabilitar al Conductor!");
    }
    res.status(200).json(" !Solicitud Rechazada Correctamente! ");
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

//Conductores inhabilitados
export const conductoresInhabilitados = async (req, res) => {
  try {
    const conductoresInhabilitados = await Conductores.find({
      "estadoCON.IngresoCON": true,
      "estadoCON.habilitadoCON": false,
      motivoInhabilitadoCON: { $ne: null },
      motivoRechazoCON: null,
    });

    const conductoresConVehiculosInhabilitados = [];
    for (const conductor of conductoresInhabilitados) {
      const vehiculoSolicitud = await Vehiculos.findOne({
        idConductorVeh: conductor._id,
      });
      if (vehiculoSolicitud) {
        const conductorConVehiculo = { conductor, vehiculoSolicitud };
        conductoresConVehiculosInhabilitados.push(conductorConVehiculo);
      }
    }

    res.status(200).json(conductoresConVehiculosInhabilitados);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const verUnicoConductorInhabilitado = async (req, res) => {
  try {
    const conductorInhabilitado = [];

    const { id } = req.params;
    const unicoConductorInhabilitado = await Conductores.findById(id);
    const contactoEmergenciaInhabilitado = await ContactorEmergencia.findOne({
      idConductorCEM: unicoConductorInhabilitado._id,
    });
    const vehiculoInhabilitado = await Vehiculos.findOne({
      idConductorVeh: unicoConductorInhabilitado._id,
    });
    const imagenesInhabilitado = await ImageVehiculos.findOne({
      idVehiculoFotos: vehiculoInhabilitado._id,
    });
    const propietarioInhabilitado = await PropietarioVehiculos.findOne({
      idVehiculoPRO: vehiculoInhabilitado._id,
    });
    const tenedorInhabilitado = await TenedorVehiculo.findOne({
      idVehiculoTE: vehiculoInhabilitado._id,
    });

    const conductor = {
      unicoConductorInhabilitado,
      contactoEmergenciaInhabilitado,
      vehiculoInhabilitado,
      imagenesInhabilitado,
      propietarioInhabilitado,
      tenedorInhabilitado,
    };

    conductorInhabilitado.push(conductor);

    res.status(200).json(conductorInhabilitado);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const habilitarConductor = async (req, res) => {
  try {
    const { id } = req.params;
    const habilitadoConductor = await Conductores.findByIdAndUpdate(id, {
      motivoInhabilitadoCON: null,
      "estadoCON.habilitadoCON": true,
    });
    if (!habilitadoConductor) {
      return res.status(400).json(" !No se pudo habilitar al Conductor!");
    }
    res.status(200).json(" !Solicitud Rechazada Correctamente! ");
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
