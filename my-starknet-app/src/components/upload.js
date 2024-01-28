import * as IPFS from "ipfs-core";
// const create = require("ipfs-core");
import fs from "fs";

export const uploadToIPFS = async (file) => {
  const gateway = "https://ipfs.io/ipfs/";

  try {
    const ipfs = await IPFS.create();
    // const buffer = fs.readFileSync("./upload/1.jpg");
    const result = await ipfs.add(file);
    console.log(result);
    console.log(gateway+result.path);

    return result.path;

  } catch (error) {
    console.error("Error uploading to IPFS:", error);
    throw error;
  }
};
