const mongoose = require("mongoose");

require("dotenv").config({ path: "variables.env" });

const connectDataBase = async () => {
  try {
    await mongoose.connect(process.env.DB_MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log("Conecto correctamente");
  } catch (error) {
    console.log(error);
    process.env(1); //Detiene la app
  }
};

module.exports = connectDataBase;
