import {Schema,model} from 'mongoose';
import bcryptjs from 'bcryptjs';

const adminSchema = new Schema({

    usuario: { type: String, required: true },
    correoAdmin: { type: String, required: true },
    password: { type: String, required: true },
},{
    timestamps: true,
    versionKey: false
})

adminSchema.methods.encryptPassword = async(contrasena)=>{
    return bcryptjs.hash(contrasena, 10);
};

adminSchema.methods.comparePassword = async function(contrasena){
    return await bcryptjs.compare(contrasena, this.password);
}

export default model('Administradores', adminSchema);