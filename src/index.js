import connectDB  from "./db/index.js";
import { app } from './app.js';


connectDB()
.then(() => {
    app.on("error", (error) => {
      console.log("App.on", error);
      throw error;
    })
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server is listening on Port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("mongoDB connection failed !!!", error);
  });

