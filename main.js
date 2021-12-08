// Import required AWS SDK clients and commands for Node.js.
import { PutObjectCommand, CreateBucketCommand } from "@aws-sdk/client-s3";
import { s3Client } from "./client.js";

// Set the parameters
const params = {
  ACL: 'public-read',
  Bucket: "sequita-bucket-01", // The name of the bucket. For example, 'sample_bucket_101'.
  Key: "hello_sequita.txt", // The name of the object. For example, 'sample_upload.txt'.
  Body: "Hello Everyone! It is a beautiful day!", // The content of the object. For example, 'Hello world!".
  // s3: "x-amz-grant-full-control"
  // BucketPolicy: {
  //   "Version": "2012-10-17",
  //   "Statement": [
  //       {
  //           "Sid": "public-read",
  //           "Effect": "Allow",
  //           "Principal": "*",
  //           "Action": [
  //               "s3:GetObject",
  //               "s3:GetObjectVersion"
  //           ],
  //           "Resource": "arn:aws:s3:::a-very-unique-bucket-name-01/*"
  //       }]
  // }      
  
};

const run = () => {
  s3Client
    .send(new CreateBucketCommand({ Bucket: params.Bucket }))
    .then((data) => {
      console.log("Successfully created a bucket called ", data.Location);
    })
    .then(() => {
      return s3Client.send(new PutObjectCommand(params));
    })
    .then(() => {
      console.log(
        "Successfully created " +
          params.Key +
          " and uploaded it to " +
          params.Bucket +
          "/" +
          params.Key
      );
    })
    .catch((err) => {
      console.log(err);
    });
};

run();
