import mongoose from "mongoose";

export const dbconnect = (MONGO_URI) => {
    console.log("connecting to database!");
    console.log("MONGO URI being used:", MONGO_URI);
    mongoose
        .connect(MONGO_URI)
        .then((res) => {
            console.log("connection successful.");
            //   return res;
        })
        .catch((err) => {
            console.log(err);
            //   return err;
        });
};
