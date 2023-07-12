import { Schema, model } from 'mongoose';

const pqrsSchema = new Schema(
    {
        tipo:{
            type: String,
            required: true
        },
        motivo:{
            type: String,
            required: true
        },
        respuesta:{
            type: String,
            default: null
        },
        id_usuario:{
            type: Schema.Types.ObjectId,
            required: true
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
);

export default model("Pqrs", pqrsSchema);