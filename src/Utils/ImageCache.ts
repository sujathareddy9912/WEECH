import {Platform} from 'react-native';
import RNFS from 'react-native-fs';
import {unique} from './unique';

const cacheImage = (uri: string) => {
  return new Promise((resolve, reject) => {
    const name = unique(uri);
    const extension = Platform.OS === 'android' ? 'file://' : '';
    const path = `${extension}${RNFS.CachesDirectoryPath}/${name}.png`;

    RNFS.exists(path).then(exists => {
      if (exists) {
       // console.log(path);
        resolve({uri: path});
      } else {
        RNFS.downloadFile({fromUrl: uri, toFile: path})
          .promise.then(() => {
            //console.log(path);
            resolve({uri: path});
          })
          .catch(error => reject(error));
      }
    });
  });
};

export default cacheImage;
