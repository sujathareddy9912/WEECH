import {random} from 'lodash';
import moment from 'moment';

// Treat it like a singleton class
export default class TimerManager {
  private static timer = moment();
  private static interval;
  private static syncInterval;

  private static subscriberList ={};

  static initTimerManager() {
    this.timer = moment();
    this.startTimer();
  }

  static getCurrentTime() {
    return TimerManager.timer;
  }

  private static startTimer() {
    clearInterval(this.interval);
    clearInterval(TimerManager.syncInterval);

    this.interval = setInterval(() => {
      TimerManager.timer.add(1, 's');

      for (const key in this.subscriberList) {
        this.subscriberList[key]?.(TimerManager.timer);
      }
    }, 1000);

  }


  static subscribe(callback, id) {
    const uniqueId = `${id}${new Date().valueOf()}${random() * 9999}`;
    this.subscriberList[uniqueId] = callback;
  
    // calling timer immediately so that component can receive updated timer instantently
    callback(TimerManager.timer);
  
    return uniqueId;
  }

  static unsubscribe(uniqueId) {
    delete this.subscriberList[uniqueId];
  }
}