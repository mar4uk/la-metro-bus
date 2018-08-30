import update from 'immutability-helper';
import stations from './stations';

import {
    LOAD_LINE_DATA,
    SELECT_LINE,
    DESELECT_LINE
} from '../actions/line';

import {
    LOAD_STATION_DATA,
    SELECT_STATION,
    DESELECT_STATION,
    DESELECT_STATIONS
} from '../actions/stations';

export default function lines(state = {}, action) {
    switch (action.type) {
        case LOAD_LINE_DATA:
            if (action.meta.status === 'done') {
                const {line} = action.payload;

                return update(state, {
                    [line.id]: {
                        stations: {$set: line.stations},
                        lineStrings: {$set: line.lineStrings}
                    }
                });

            } else {
                return state;
            }

        case SELECT_LINE:
            const lines = Object.keys(state).reduce((memo, id) => {
                memo[id] = {
                    ...state[id],
                    selected: id === action.payload.id
                }
                return memo;
            }, {});

            return update(state, {$set: lines});

        case DESELECT_LINE:
            return update(state, {
                [action.payload.id]: {
                    selected: {$set: false}
                }
            });

        case SELECT_STATION:
            return update(state, {
                [action.payload.lineId]: {
                    stations: {$set: stations(state[action.payload.lineId].stations, action)}
                }
            });

        case DESELECT_STATION:
            return update(state, {
                [action.payload.lineId]: {
                    stations: {$set: stations(state[action.payload.lineId].stations, action)}
                }
            });

        case DESELECT_STATIONS:
            return update(state, {
                [action.payload.lineId]: {
                    stations: {$set: stations(state[action.payload.lineId].stations, action)}
                }
            });

        case LOAD_STATION_DATA:
            if (action.meta.status === 'done') {
                const {lineId} = action.payload;

                return update(state, {
                    [lineId]: {
                        stations: {$set: stations(state[lineId].stations, action)}
                    }
                });
            } else {
                return state;
            }
        default:
            return state;
    }
};
