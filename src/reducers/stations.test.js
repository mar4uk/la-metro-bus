import stations from './stations';
import {
    LOAD_STATION_DATA,
    SELECT_STATION,
    DESELECT_STATION,
    DESELECT_STATIONS
} from '../actions/stations';

describe('stations reducer', () => {
    it('should return the initial state', () => {
        expect(stations(undefined, {})).toEqual({})
    })

    it(`should handle ${DESELECT_STATION}`, () => {
        const prevState = {
            1: {
                id: '1',
                lineId: 'bakerloo',
                name: 'Bakerloo',
                coords: {lat: 51.50, lon: -0.11},
                selected: true
            }
        };
        const action = {
            type: DESELECT_STATION,
            payload: {
                stationId: '1'
            }
        };
        const nextState = {
            1: {
                id: '1',
                lineId: 'bakerloo',
                name: 'Bakerloo',
                coords: {lat: 51.50,lon: -0.11},
                selected: false
            }
        };

        expect(stations(prevState, action)).toEqual(nextState)
    })

    it(`should handle ${DESELECT_STATIONS}`, () => {
        const prevState = {
            1: {
                id: '1',
                lineId: 'bakerloo',
                name: 'Bakerloo',
                coords: {lat: 51.50, lon: -0.11},
                selected: true
            }
        };
        const action = {
            type: DESELECT_STATIONS
        };
        const nextState = {
            1: {
                id: '1',
                lineId: 'bakerloo',
                name: 'Bakerloo',
                coords: {lat: 51.50,lon: -0.11},
                selected: false
            }
        };

        expect(stations(prevState, action)).toEqual(nextState)
    })

    it(`should handle ${SELECT_STATION}`, () => {
        const prevState = {
            1: {
                id: '1',
                lineId: 'bakerloo',
                name: 'Bakerloo',
                coords: {lat: 51.50,lon: -0.11},
                selected: true
            },
            2: {
                id: '2',
                lineId: 'bakerloo',
                name: 'London',
                coords: {lat: 51.50, lon: -0.11},
                selected: false
            }
        };

        const action = {
            type: SELECT_STATION,
            payload: {
                stationId: '2'
            }
        };

        const nextState = {
            1: {
                id: '1',
                lineId: 'bakerloo',
                name: 'Bakerloo',
                coords: {lat: 51.50,lon: -0.11},
                selected: false
            },
            2: {
                id: '2',
                lineId: 'bakerloo',
                name: 'London',
                coords: {lat: 51.50, lon: -0.11},
                selected: true
            }
        };

        expect(stations(prevState, action)).toEqual(nextState)
    })

    it(`should handle ${LOAD_STATION_DATA}`, () => {
        const prevState = {
            1: {
                id: '1',
                lineId: 'bakerloo',
                name: 'Bakerloo',
                coords: {lat: 51.50, lon: -0.11},
                selected: true
            }
        };

        const action = {
            type: LOAD_STATION_DATA,
            meta: {
                status: 'done'
            },
            payload: {
                stationId: '1',
                arrivals: ['34 min, 50 min']
            }
        };

        const nextState = {
            1: {
                id: '1',
                lineId: 'bakerloo',
                name: 'Bakerloo',
                coords: {lat: 51.50, lon: -0.11},
                selected: true,
                arrivals: ['34 min, 50 min']
            }
        };

        expect(stations(prevState, action)).toEqual(nextState)
    })
})
