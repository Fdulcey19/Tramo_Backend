import { Schema, model } from "mongoose";
import bcryptjs from 'bcryptjs';

const registerConductorSchema = new Schema({
  nombreCON: { type: String, required: true },
  apellidoCON: { type: String, required: true },
  usuarioCON: { type: String, required: true },
  tipo_DocumentoCON: { type: String, required: true },
  nroDocumentoCON: { type: String, required: true, unique:true },
  nacionalidadCON: { type: String, required: true },
  DireccionResidenciaCON: { type: String, required: true },
  ciudadCON: { type: String, required: true },
  fechaNacimientoCON: { type: String, required: true },
  nroTelefonoCON: { type: String, required: true },
  correoElectronicoCON: { type: String, required: true, unique:true },
  correoRecuperacionCON: { type: String, required: true },
  nroLicenciaCON: { type: String, required: true },
  contrasenaCON: { type: String, required: true },
  preguntaSeguridadCON: { type: String, required: true },
  respuestaSeguridadCON: { type: String, required: true },

  calificacionCON:{ type: Number, default:5 },
  numeroViajesCON:{ type: Number, default:0 },
  

  perfil:{
    idfotoperfilCON:{ type: String, required: true },
    fotoperfilCON:{ type: String, required: true },
  },

  estadoCON:{
    IngresoCON :{ type: Boolean,default: false },
    habilitadoCON :{ type: Boolean,default: false },
    conectadoCON :{ type: Boolean,default: false },
    disponibilidadCON :{ type: Boolean,default: false },
  },

  token_fbs:{
    type: String,
    default: null
  },

  
  motivoRechazoCON :{ type: String, default: null },
  motivoInhabilitadoCON :{ type: String, default: null },


},{
    timestamps: true,
    versionKey: false
});

registerConductorSchema.methods.encryptPassword = async(contrasena)=>{
    return bcryptjs.hash(contrasena, 10);
};

registerConductorSchema.statics.comparePassword = async (contrasena, conductoresFound)=>{
    return await bcryptjs.compare(contrasena, conductoresFound);
}



export default model('Conductores', registerConductorSchema);