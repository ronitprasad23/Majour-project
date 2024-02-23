const mongoose = require("mongoose");
const initData = require("./data");
const listing = require("../Models/listening");

const MONGO_DB = "mongodb://127.0.0.1:27017/VacationVilla";

main().then(() =>{
    console.log("connected to Database");
}).catch((err) => {
    console.log(err);
});

async function main() {
    await mongoose.connect(MONGO_DB);
}

const initDB = async () => {
    await listing.deleteMany({});
    await listing.insertMany(initData.data);
    console.log("Data has been initialized");
}

initDB();