import dotenv from "dotenv"
import connectDB from "./db/index.js"
import {app} from './app.js'

dotenv.config(
  {
    path: "./env"
  }
)




connectDB()
.then(()=> {
  app.listen(process.env.PORT,() => {
    console.log(`Server is running at port: ${process.env.PORT}`);
  })
})
.catch((err) => {
    console.log(`MongoDB error occured`,err);
})


/*
const app = express();
(async () => {
  try{
    await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
    app.on("error",(error) => {
       console.log("Error :",error);
       throw error
    })

    app.listen(process.env.MONGO_URI,() => {
      console.log(`App is listen on http://localhost:${process.env.MONGO_URI}`)
    })
  }
  catch(error){
      console.log("Error :",error);
      throw error
  }
})()
*/