const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { descriptors, places } = require("./seedHelpers");

mongoose.connect("mongodb://localhost:27017/campr");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 30; i++) {
    const random1000 = Math.floor(Math.random() * 1000) + 1;
    const randomNum = Math.floor(Math.random() * 30) + 10;
    const camp = new Campground({
      title: `${sample(descriptors)} ${sample(places)}`,
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      image: `https://source.unsplash.com/random/400x300/?camping,${i}`,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni recusandae mollitia rerum distinctio expedita, enim dolorem ex perferendis facilis cumque exercitationem suscipit, consequatur quibusdam temporibus, aspernatur incidunt quod veniam eius!",
      price: randomNum,
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
