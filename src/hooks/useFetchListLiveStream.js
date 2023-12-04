import database from '@react-native-firebase/database';

export default function useFetchListLiveStream(item) {
  return new Promise((resolve, reject) => {
    try {
      database()
        .ref(`liveRoom`)
        .child(item?.liveName)
        .on('value', value => {
          resolve({...value.val()});
        });
    } catch (err) {
      reject(err);
    }
  });
}

// import React from 'react';
// import {firebase} from '@react-native-firebase/database';

// export default function useFetchListLiveStream(item) {

//     const [liveRoomData, UpdateLiveRoomData] = useState()

//     const liveRoomFirebaseNode = firebase
//     .database()
//     .ref(`${FirebaseNode.BidInfo}/${id}`);

//     useLayoutEffect(() => {
//         const listener = liveRoomFirebaseNode.on('value', (snapshot) => {
//           const roomData = snapshot.val();

//           if (!roomData) {
//             return;
//           }

//         });

//         return () => {
//             liveRoomFirebaseNode.off('value', listener);
//         };
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//       }, []);

//   return {liveRoomData};
// }
