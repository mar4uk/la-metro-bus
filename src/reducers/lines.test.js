import lines from './lines';

import {
    LOAD_LINE_DATA,
    SELECT_LINE,
    DESELECT_LINE
} from '../actions/line';

describe('lines reducer', () => {
    it('should return the initial state', () => {
        expect(lines(undefined, {})).toEqual({})
    })

    it(`should handle ${DESELECT_LINE}`, () => {
        const prevState = {
            bakerloo: {
                id: 'bakerloo',
                name: 'Bakerloo',
                stations: {},
                lineStrings: [],
                selected: true
            }
        };
        const action = {
            type: DESELECT_LINE,
            payload: {
                id: 'bakerloo'
            }
        };
        const nextState = {
            bakerloo: {
                id: 'bakerloo',
                name: 'Bakerloo',
                stations: {},
                lineStrings: [],
                selected: false
            }
        };

        expect(lines(prevState, action)).toEqual(nextState)
    })

    it(`should handle ${SELECT_LINE}`, () => {
        const prevState = {
            bakerloo: {
                id: 'bakerloo',
                name: 'Bakerloo',
                stations: {},
                lineStrings: [],
                selected: false
            }
        };
        const action = {
            type: SELECT_LINE,
            payload: {
                id: 'bakerloo'
            }
        };
        const nextState = {
            bakerloo: {
                id: 'bakerloo',
                name: 'Bakerloo',
                stations: {},
                lineStrings: [],
                selected: true
            }
        };

        expect(lines(prevState, action)).toEqual(nextState)
    })

    it(`should handle ${LOAD_LINE_DATA}`, () => {
        const prevState = {
            bakerloo: {
                id: 'bakerloo',
                name: 'Bakerloo',
                stations: {},
                lineStrings: [],
                selected: false
            }
        };

        const action = {
            type: LOAD_LINE_DATA,
            meta: {
                status: 'done'
            },
            payload: {
                line: {
                    id: 'bakerloo',
                    stations: {
                        1: {
                            id: '1',
                            lineId: 'bakerloo',
                            name: 'Bakerloo',
                            coords: {lat: 51.50,lon: -0.11},
                            selected: false
                        }
                    },
                    lineStrings: [[[-0.100606,51.494536], [-0.112315,51.498808]], [[-0.11478,51.503299],[-0.122666,51.507058]]]
                }
            }
        };

        const nextState = {
            bakerloo: {
                id: 'bakerloo',
                name: 'Bakerloo',
                stations: {},
                lineStrings: [[[-0.100606,51.494536], [-0.112315,51.498808]], [[-0.11478,51.503299],[-0.122666,51.507058]]],
                selected: false,
                stations: {
                    1: {
                        id: '1',
                        lineId: 'bakerloo',
                        name: 'Bakerloo',
                        coords: {lat: 51.50,lon: -0.11},
                        selected: false
                    }
                }
            }
        };

        expect(lines(prevState, action)).toEqual(nextState)
    })
});
