import {Image} from 'react-native-compressor';

export type ImageData = {
  cropRect: {
    height: number;
    width: number;
    x: number;
    y: number;
  };
  data: string;
  height: number;
  mime: string;
  modificationDate: string;
  path: string;
  size: number;
  width: number;
};

export const compressImage = async (image: ImageData) => {
  try{
  let value = null;
  if (image.path) {
    const result = await Image.compress(image.path, {
      compressionMethod: 'auto',
      maxWidth: 720,
      maxHeight: 720,
    });
    value = {
      uri: result,
      base64: 'data:image/*;base64,' + image.data,
      name: image.path.split('/')[image.path.split('/').length - 1],
      type: image.mime,
    };
    return value;
  }}catch(e){
    console.log(e);
  }
};