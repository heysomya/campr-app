const mongoose = require('mongoose');
const Review = require('./review');
const { Schema } = mongoose;

const { cloudinary } = require('../cloudinary');

const ImageSchema = new Schema({
  url: String,
  filename: String,
});

const opts = { toJSON: { virtuals: true } };

ImageSchema.virtual('thumbnail').get(function () {
  return this.url.replace('/upload', '/upload/w_200');
});

const CampgroundSchema = new Schema(
  {
    title: String,
    images: [ImageSchema],
    geometry: {
      type: {
        type: String,
        enum: ['Point'],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    price: Number,
    description: String,
    location: String,
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Review',
      },
    ],
  },
  opts
);

CampgroundSchema.virtual('properties.popUpMarkup').get(function () {
  return `<strong><a href="/campgrounds/${this._id}">${this.title}</a></strong><p>${this.location}</p>`;
});

CampgroundSchema.post('findOneAndDelete', async function (campground) {
  if (campground.reviews) {
    await Review.deleteMany({
      _id: {
        $in: campground.reviews,
      },
    });
  }
  if (campground.images) {
    for (const img of campground.images) {
      await cloudinary.uploader.destroy(img.filename);
    }
  }
});

module.exports = mongoose.model('Campground', CampgroundSchema);
