import {Schema,model} from 'mongoose';


const ObjectId = Schema.ObjectId;

const datosTenedorSchema = new Schema({
    nombreTE:{type:String,required:true},
        apellidoTE:{type:String,required:true},
        NroDocumentoTE:{type:String, required:true},
        DireccionResidenciaTE:{type:String,required:true},
        ciudadTE:{type:String,required:true},
        NroTelefonoTE:{type:String , required:true},
        
        idVehiculoTE:{type:ObjectId,required:true},
},{
    timestamps: true,
    versionKey: false
});



export default model('DatosTenedores',datosTenedorSchema);