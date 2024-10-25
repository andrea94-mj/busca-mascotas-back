import mongoose from 'mongoose';
import { mongodbUri } from '../config';

//conexión con la DB

const connectDB = async () =>{
    try{
        await mongoose.connect(mongodbUri);
        console.log("MongoDB conectado correctamente");
    }catch (e){
        console.log("Error conexion a MongoBD: ", e.message);
        process.exit(1);
    }
}

export {connectDB}
