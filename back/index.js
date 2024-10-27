import express from 'express';
// import mongoRoutes from './routes/mongodb.routes';

const router = express();

router.use(express.json());
router.use(express.urlencoded({extended:true}));

// router.use('/api/v1/', mongoRoutes);

router.listen(3000, ()=>{
    console.log("Servidor 3000 corriendo")
})