const express = require("express");

const connectDB=require('./db')

connectDB();

const app = express();

app.use(express.json());


app.use((req,res,next)=>{
  console.log("mid1");
  next();
})
app.use((req,res,next)=>{
  console.log("mid2");
 next();
})

app.get("/", async (req, res) => {

  res.status(200).json({
    success: true,
    message: "home page",
  });
 
}

);
const port = 4000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
