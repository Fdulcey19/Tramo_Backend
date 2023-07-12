import { Schema, model } from "mongoose";

const ObjectId = Schema.ObjectId;

const contactoEmergenciaSchema = new Schema(
  {
    nombreCEM: { type: String, required: true },
    apellidoCEM: { type: String, required: true },
    NroDocumentoCEM: { type: String, required: true },
    NroTelefonoCEM: { type: String, required: true },
    CorreoElectricoCEM: { type: String, required: true },
    idConductorCEM: { type: ObjectId, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("ContactoEmergencia", contactoEmergenciaSchema);