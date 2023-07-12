import { Schema, model } from "mongoose";
import bcryptjs from "bcryptjs";

const personaEmpresaSchema = new Schema(
  {
    nombreEmpresa: { type: String, required: true },
    razonSocialEmpresa: { type: String, required: true },
    nomRepresentanteLegal: { type: String, required: true },
    NITempresa: { type: String, required: true, unique:true },
    DireccionEmpresa: { type: String, required: true },
    nroTelefonoPJU: { type: String, required: true },
    correoElectronicoPJU: { type: String, required: true, unique:true },
    contrasenaPJU: { type: String, required: true },

    calificacionPJU: { type: Number, default: 5 },
    numeroPedidosPJU: { type: Number, default: 0 },

    estadoPJU: {
      habilitadoPJU: { type: Boolean, default: true },
      motivoInhabilitadoPJU: { type: String, default: null },
    },

    token_fbs:{
      type: String,
      default: null
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

personaEmpresaSchema.methods.encryptPassword = async (contrasena) => {
  return bcryptjs.hash(contrasena, 10);
};

personaEmpresaSchema.statics.comparePassword = async function (contrasena, contrasenaUserFound) {
  return await bcryptjs.compare(contrasena, contrasenaUserFound);
};

export default model("PersonaJuridica", personaEmpresaSchema);
