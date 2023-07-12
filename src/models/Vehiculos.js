import { Schema, model } from "mongoose";
const ObjectId = Schema.ObjectId;

const vehiculoSchema = new Schema(
  {
    marca: { type: String, required: true },
    modelo: { type: String, required: true },
    numeroEjes: { type: Number, required: true },
    tipoVehiculo: { type: String, required: true },
    traccionVeh: { type: String, required: true },
    placaVehiculo: { type: String, required: true },
    placasTrailer: { type: String },
    pesoVacio: { type: Number },
    CombustibleVeh: { type: String, required: true },
    numeroLicenciaVeh: { type: String, required: true },
    numeroSOAT: { type: String, required: true },
    companiaSOAT: { type: String, required: true },
    fechavencSOAT: { type: String, required: true },
    nroPoliza_ResponCivil: { type: String, required: true },
    nroRev_TecMecanica: { type: String, required: true },
    fechaVenc_Tecno: { type: String, required: true },

    idConductorVeh: { type: ObjectId, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Vehiculos", vehiculoSchema);
