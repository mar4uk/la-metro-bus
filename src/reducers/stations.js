import update from 'immutability-helper';
import {
  LOAD_STATION_DATA,
  SELECT_STATION,
  DESELECT_STATION,
  DESELECT_STATIONS
} from '../actions/stations';

export default function stations(state = {}, action) {
  switch (action.type) {
    case LOAD_STATION_DATA:
      if (action.meta.status === 'done') {
        const {stationId, arrivals} = action.payload;

        return update(state, {
          [stationId]: {
            arrivals: {$set: arrivals}
          }
        });

      } else {
        return state;
      }
    case SELECT_STATION:
      return Object.keys(state).reduce((memo, stationId) => {
        memo[stationId] = {
          ...state[stationId],
          selected: stationId === action.payload.stationId
        }
        return memo;
      }, {});

    case DESELECT_STATION:
      return update(state, {
        [action.payload.stationId]: {
          selected: {$set: false}
        }
      });

    case DESELECT_STATIONS:
      return Object.keys(state).reduce((memo, stationId) => {
        memo[stationId] = {
          ...state[stationId],
          selected: false
        }
        return memo;
      }, {});

    default:
      return state;
  }
};
