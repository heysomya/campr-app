const mongoose = require('mongoose');
const Campground = require('../models/campground');
const Review = require('../models/review');
const cities = require('./cities');
const { descriptors, places } = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/campr');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connected');
});

const sample = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

const seedDB = async () => {
  await Campground.deleteMany({});
  await Review.deleteMany({});
  for (let i = 0; i < 30; i++) {
    const random1000 = Math.floor(Math.random() * 1000) + 1;
    const randomNum = Math.floor(Math.random() * 30) + 10;
    const camp = new Campground({
      author: '64e0719499719a97db46d1af',
      title: `${sample(descriptors)} ${sample(places)}`,
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      images: [
        {
          url: 'https://res.cloudinary.com/douxf2mme/image/upload/v1692694723/Campr/fjsoyiab3tw0xgaql8ui.jpg',
          filename: 'Campr/zkkbcjzv5ybftz5umfrx',
        },
        {
          url: 'https://res.cloudinary.com/douxf2mme/image/upload/v1692695263/Campr/kyogrsicv1nvlxmd3pyt.jpg',
          filename: 'Campr/izfnx7q2uxykaxlto9ag',
        },
      ],
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni recusandae mollitia rerum distinctio expedita, enim dolorem ex perferendis facilis cumque exercitationem suscipit, consequatur quibusdam temporibus, aspernatur incidunt quod veniam eius!',
      price: randomNum,
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
