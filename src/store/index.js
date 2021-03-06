import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import moment from 'moment-timezone';
moment.tz.setDefault('UTC');

import Axios from 'axios';

export default new Vuex.Store({
  state: {
    currentYear: 2018,
    currentMonth: 8,
    eventFormPosX: 0,
    eventFormPosY: 0,
    eventFormActive: false,
    eventFormDate: moment(),
    events: [],
  },
  mutations: {
    setCurrentMonth(state, payload){
      state.currentMonth = payload;
    },
    setCurrentYear(state, payload){
      state.currentYear = payload;
    },
    setEventFormPos(state, payload){
      state.eventFormPosX = payload.x;
      state.eventFormPosY = payload.y;
    },
    setEventFormActive(state, payload){
      state.eventFormActive = payload;
    },
    setEventFormDate(state, payload){
      state.eventFormDate = payload;
    },
    
    addEvent(state, payload){
      state.events.push(payload);
    },
  },
  
  actions: {
    addEvent(context, payload) {
      return new Promise((resolve, reject) => {
        let obj = {
          description: payload,
          date: context.state.eventFormDate
        };
        Axios.post('/add_event', obj).then(response => {
          if (response.status === 200) {
            context.commit('addEvent', obj);
            resolve();
          } else {
            reject();
          }
        });
      });
    }
  }
});