import express, {Request} from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import need_route from "./routes/need_route";
import auth_route from "./routes/auth_route";
import error from "./middlewares/error";
import multer, {FileFilterCallback} from "multer";
import {v4} from "uuid";
import path from "path";
dotenv.config();

const PORT = process.env.PORT || 3000;

const fileStorage = multer.diskStorage({
    destination: (_req, _file, cb)=>{
        cb(null, "images");
    },
    filename: (_req, file,cb)=>{
        cb(null, `${v4()}_${file.originalname}`);
    },
});

const fileFilter = (_req: Request, file:any,cb:FileFilterCallback)=>{
    if(
        file.mimetype === "image/png"||
        file.mimetype === "image/jpg"||
        file.mimetype === "image/jpeg"
    ){
        cb(null, true);
    }else{
        cb(null, false);
    }
};

const app = express();
app.use(express.json());
app.use(multer({storage: fileStorage, fileFilter}).single("profileImage"));
app.use('/images',express.static(path.join("","images")));

app.get("/", (_req, res) => {
  res.json({ message: "Hello world" });
});

mongoose.connect(process.env.DATABASE || "").then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
  });
  app.use("/api/auth/", auth_route);
  app.use("/api/needs/", need_route);
  app.use(error);
});
