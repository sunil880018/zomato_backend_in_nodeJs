import { connect } from "mongoose";

function dbConnection() {
  connect(
    process.env.DB_URL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (error) => {
      if (!error) {
        console.log("connected to the mongoDB");
      } else {
        console.log("connection to mongoDB failed \n" + error);
      }
    }
  );
}

export { dbConnection };
