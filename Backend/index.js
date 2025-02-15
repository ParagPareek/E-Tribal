import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRoute from './Routes/userRoute.js'
import productRoute from './Routes/ProductRoute.js'
import addressRoute from './Routes/AddressRoute.js'
import orderRoute from './Routes/OrderRoute.js'
import cartRoute from './Routes/CartRoutes.js'
import cors from 'cors'

dotenv.config()
const app = express();

const port = process.env.PORT || 3000;
const MONGOURL = process.env.MONGOURL

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/auth',userRoute)
app.use('/product',productRoute)
app.use('/address',addressRoute)
app.use('/order',orderRoute)
app.use('/cart',cartRoute)


mongoose.connect(MONGOURL)
.then(()=>{
    console.log("connected to mongo",MONGOURL);
})
.catch((error)=>{
    console.log("errro when connecting to mongo",error)
})

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
    
})