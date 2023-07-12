import { Schema, model } from "mongoose";
import bcryptjs from "bcryptjs";

const personaNaturalSchema = new Schema(
  {
    nombrePNA: { type: String, required: true },
    apellidoPNA: { type: String, required: true },
    tipoDocumentoPNA: { type: String, required: true },
    nroDocumentoPNA: { type: String, required: true, unique:true },
    DireccionPNA: { type: String, required: true },
    nroTelefonoPNA: { type: String, required: true },
    correoElectronicoPNA: { type: String, required: true, unique:true },
    contrasenaPNA: { type: String, required: true },

    calificacionPNA: { type: Number, default: 5 },
    numeroPedidosPNA: { type: Number, default: 0 },

    perfil: {
      idfotoPerfilPNA: { type: String, default: null },
      fotoPerfilPNA: { type: String, default: null },
    },

    estadoCLN: {
      habilitadoPNA: { type: Boolean, default: true },
      motivoInhabilitadoPNA: { type: String, default: null },
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

personaNaturalSchema.methods.encryptPassword = async (contrasena) => {
  return bcryptjs.hash(contrasena, 10);
};

personaNaturalSchema.statics.comparePassword = async function (contrasena, contrasenaUsuarioFound) {
  return await bcryptjs.compare(contrasena, contrasenaUsuarioFound);
};

export default model("PersonaNatural", personaNaturalSchema);
