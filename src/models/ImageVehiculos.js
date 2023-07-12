import {Schema,model} from 'mongoose';

const ObjectId = Schema.ObjectId;

const fotosVehiculoSchema = new Schema({
        idFotoFrontal :{type:String,required:true},
        FotoFrontal :{type:String,required:true},
        idFotoVolco :{type:String,required:true},
        FotoVolco :{type:String,required:true},
        idFotolateral_Izq :{type:String,required:true},
        Fotolateral_Izq :{type:String,required:true},
        idFotolateral_Der :{type:String,required:true},
        Fotolateral_Der :{type:String,required:true},
        idFotolateral_IzqTrailer :{type:String, default:null} ,
        Fotolateral_IzqTrailer :{type:String, default:null} ,
        idFotolateral_DerTrailer:{type:String, default:null}  ,
        Fotolateral_DerTrailer:{type:String, default:null}  ,
        idFotoVolco_Trailer :{type:String, default:null} ,
        FotoVolco_Trailer :{type:String, default:null} ,
        
        idVehiculoFotos:{type:ObjectId,required:true}
},{
    timestamps: true,
    versionKey: false
});


export default model('FotosVehiculos',fotosVehiculoSchema);