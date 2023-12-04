import {statusCodes} from '@react-native-google-signin/google-signin';
import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import AllBoys from './AllBoys';
import AllGirls from './AllGirls';
import {connect, useSelector} from 'react-redux';
import CommonActions from '../../../Store/Common/Actions';
import AsyncStorage from '@react-native-async-storage/async-storage';

let filterdata = null;

const data = [
  {
    id: 1,
    name: 'Aleena Gates',
    age: 23,
    country: 'England',
    rate: 8000,
    image: require('../../../Assets/Images/photo(1).jpg'),
  },
  {
    id: 2,
    name: 'Aleena Gates',
    age: 23,
    country: 'England',
    rate: 8000,
    image: require('../../../Assets/Images/photo(2).jpg'),
  },
  {
    id: 3,
    name: 'Aleena Gates',
    age: 23,
    country: 'England',
    rate: 8000,
    image: require('../../../Assets/Images/photo(3).jpg'),
  },
  {
    id: 4,
    name: 'Aleena Gates',
    age: 23,
    country: 'England',
    rate: 8000,
    image: require('../../../Assets/Images/photo(4).jpg'),
  },
  {
    id: 5,
    name: 'Aleena Gates',
    age: 23,
    country: 'England',
    rate: 8000,
    image: require('../../../Assets/Images/photo(5).jpg'),
  },
  {
    id: 6,
    name: 'Aleena Gates',
    age: 23,
    country: 'England',
    rate: 8000,
    image: require('../../../Assets/Images/photo(6).jpg'),
  },
  {
    id: 7,
    name: 'Aleena Gates',
    age: 23,
    country: 'England',
    rate: 8000,
    image: require('../../../Assets/Images/photo(7).jpg'),
  },
  {
    id: 8,
    name: 'Aleena Gates',
    age: 23,
    country: 'England',
    rate: 8000,
    image: require('../../../Assets/Images/photo(8).jpg'),
  },
  {
    id: 9,
    name: 'Aleena Gates',
    age: 23,
    country: 'England',
    rate: 8000,
    image: require('../../../Assets/Images/photo(9).jpg'),
  },
  {
    id: 10,
    name: 'Aleena Gates',
    age: 23,
    country: 'England',
    rate: 8000,
    image: require('../../../Assets/Images/photo(10).jpg'),
  },
];

const index = props => {
  const state = useSelector(state => {
    return state;
  });

  const {userLoginList} = state.authReducer;

  const getFilter = async () => {
    let a = await props.getUserFilter();
  };
  useEffect(() => {
    getFilter();
  }, []);

  useEffect(async () => {
    filterdata = props.getUserFilterList?.user?.data;
    setGender(await AsyncStorage.getItem('gender'));
  }, [props.getUserFilterList]);

  const [gender, setGender] = React.useState('');

  return (
    <View>
      {userLoginList?.user.gender !== 'male' ? (
        <AllGirls
          {...props}
          // data={props.getUserFilterList?.user?.data}
          data={data}
        />
      ) : (
        <AllBoys
          {...props}
          data={data}
          // data={props.getUserFilterList?.user?.data}
        />
      )}
    </View>
  );
};

// export default index

const mapStateToProps = state => ({
  getUserFilterLoading: state.common.getUserFilterLoading,
  getUserFilterList: state.common.getUserFilterList,
});

const mapDispatchToProps = dispatch => ({
  getUserFilter: () => {
    dispatch(CommonActions.getUserFilter());
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(index);
