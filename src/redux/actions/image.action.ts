//  api
const api = require('apis/image.api');

export const actDeleteImage = async (filename: string) => {
  try {
    const res: any = await api.deleteImage(filename);
  } catch (error: any) {
    console.log(error);
  }
};
