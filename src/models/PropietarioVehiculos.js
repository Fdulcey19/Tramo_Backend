import {Schema,model} from 'mongoose';

const ObjectId = Schema.ObjectId;


const datosPropietarioSchema = new Schema({

    nombrePRO:{type:String,required:true},
    apellidoPRO:{type:String,required:true},
    NroDocumentoPRO:{type:String,required:true},
    DireccionResidenciaPRO:{type:String,required:true},
    ciudadPRO:{type:String,required:true},
    NroTelefonoPRO:{type:String,required:true},
    
    idVehiculoPRO:{type:ObjectId,required:true},
},{
    timestamps: true,
    versionKey: false
});


export default model('DatosPropietarios',datosPropietarioSchema);