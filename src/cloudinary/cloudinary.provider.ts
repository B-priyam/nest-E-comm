// cloudinary.provider.ts

import { v2 as cloudinary } from 'cloudinary';

export const CloudinaryProvider = {
  provide: 'CLOUDINARY',
  useFactory: () => {
    return cloudinary.config({
        cloud_name: "priyam3801h",
        api_key: "171723684483845",
        api_secret:
        "_f_ogbGIp6mJoRbVybr3JTdpknE",
    });
  },
};
