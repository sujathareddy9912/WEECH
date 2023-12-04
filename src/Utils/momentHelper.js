import moment from 'moment';

export const dobFormat = date => moment(date).format('YYYY-MM-DD');

export const timeFormat = time => moment(time).format('hh:mm A');

export const dateTimeFormat = dateTime =>
  `${moment(dateTime).format('YYYY-MM-DDTHH:mm:ss.SSS')}Z`;
