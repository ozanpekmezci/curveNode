import {FS} from 'meteor/cfs:base-package';
import {gm} from 'meteor/cfs:graphicsmagick';

let medium = new FS.Store.S3("medium", {
  accessKeyId: "AKIAJLEWAN37NTYHR2WQ",
  secretAccessKey: "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",
  bucket: "curve-node",
  region: "eu-central-1",
  folder: "medium",
  transformWrite: function(fileObj, readStream, writeStream) {
    gm(readStream, fileObj.name()).resize('800', '800').stream().pipe(writeStream)
  }
})

let thumbs = new FS.Store.S3("thumbs", {
  accessKeyId: "AKIAJLEWAN37NTYHR2WQ",
  secretAccessKey: "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",
  bucket: "curve-node",
  region: "eu-central-1",
  folder: "thumbs",
  transformWrite: function(fileObj, readStream, writeStream) {
    gm(readStream, fileObj.name()).resize('256', '256').stream().pipe(writeStream)
  }
})


const Images = new FS.Collection("images", {
  stores: [thumbs, medium],
  filter: {
    allow: {
      contentTypes: ['image/*']
    }
  }
})
export default Images;
