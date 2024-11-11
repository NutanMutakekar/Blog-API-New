const express = require("express");

const connectDB = require("./db");

const morgan = require("morgan");

connectDB();

const app = express();

app.use(morgan("dev"));

app.use(express.json());

// app.use((req,res,next)=>{
//   console.log("mid1");
//   next();
// })
// app.use((req,res,next)=>{
//   console.log("mid2");
//  next();
// })

const midd1 = (req, res, next) => {
  console.log("middleware 1");
  next();
};
const midd2 = (req, res, next) => {
  console.log("middleware 2");
  next();
};

app.use(midd2);

app.get("/", midd1, async (req, res) => {
  // res.setHeader('Cache-Control', 'no-store'); // Prevent caching

  res.status(200).json({
    success: true,
    message: "home page",
  });
});
app.get(
  "/blog",
  midd1,
  (req, res, next) => {
    console.log("middleware 3");
    next();
  },
  async (req, res) => {
    res.status(200).json({
      success: true,
      message: "blog page",
    });
  }
);
// app.get(
//   "/blog2",
//   midd1,
//   (req, res) => {
//     console.log("middleware 3");
//   },
//   async (req, res) => {
//     res.status(200).json({
//       success: true,
//       message: "home page",
//     });
//   }
// );
const port = 4000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
