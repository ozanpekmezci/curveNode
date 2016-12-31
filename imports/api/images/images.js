import {FS} from 'meteor/cfs:base-package';

const thumbs = new FS.Store.S3("thumbs");
const medium = new FS.Store.S3("medium");

const Images = new FS.Collection("images", {
  stores: [thumbs, medium],
  filter: {
    allow: {
      contentTypes: ['image/*']
    }
  }
})
export default Images;
