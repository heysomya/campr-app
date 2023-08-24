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
  for (let i = 0; i < 400; i++) {
    const random1000 = Math.floor(Math.random() * 1000) + 1;
    const randomNum = Math.floor(Math.random() * 30) + 10;
    const camp = new Campground({
      author: '64e0719499719a97db46d1af',
      title: `${sample(descriptors)} ${sample(places)}`,
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      geometry: {
        type: 'Point',
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: 'https://res.cloudinary.com/douxf2mme/image/upload/v1692693323/Campr/i0ezlhxda2whptjnqoic.jpg',
          filename: 'Campr/i0ezlhxda2whptjnqoic',
        },
        {
          url: 'https://res.cloudinary.com/douxf2mme/image/upload/v1692881548/Campr/gdtvi6hg0mahepbgthc9.jpg',
          filename: 'Campr/gdtvi6hg0mahepbgthc9.jpg',
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
