import database from '@react-native-firebase/database';

export const incomingCallQuery = userId =>
  database().ref('videoCall').child(`${userId}`);

export const disableIncomingCallQuery = (userId, type = 'value') =>
  incomingCallQuery(userId).off(type, result => {});

export const checkNodePresentOrNot = userId => {
  return new Promise((resolve, reject) => {
    database()
      .ref('videoCall')
      .child(`${userId}`)
      .once('value', snapshot => {
        if (snapshot.exists()) resolve(true);
        else resolve(false);
      });
  });
};

export const removedbNodeIfExist = async id => {
  try {
    const isPresent = await checkNodePresentOrNot(id);
    if (isPresent) incomingCallQuery(id).remove();
  } catch (error) {
    console.log('Node not present at ' + id);
  }
};
