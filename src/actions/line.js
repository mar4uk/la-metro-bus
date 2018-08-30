const LOAD_LINE_DATA = 'LOAD_LINE_DATA';
const SELECT_LINE = 'SELECT_LINE';
const DESELECT_LINE = 'DESELECT_LINE';

const loadLineData = (id) => {
    return (dispatch, getState) => {
        const {lines} = getState();

        if (Object.keys(lines[id].stations).length) {
            return;
        }

        dispatch({
            type: LOAD_LINE_DATA,
            meta: {
                status: 'pending'
            }
        });

        fetch(`/line/${id}`)
            .then(res => res.json())
            .then(({line}) => {
                return dispatch({
                    type: LOAD_LINE_DATA,
                    meta: {
                        status: 'done'
                    },
                    payload: {
                        line
                    }
                });
            })
            .catch((error) => {
                console.log(error);
                dispatch({
                    type: LOAD_LINE_DATA,
                    meta: {
                        status: 'fail'
                    }
                });
            });
    }
};

const toggleLine = (id) => {
    return (dispatch, getState) => {
        const {lines} = getState();

        dispatch({
            type: lines[id].selected ? DESELECT_LINE : SELECT_LINE,
            payload: {
                id
            }
        });
    };
};

export {
    LOAD_LINE_DATA,
    DESELECT_LINE,
    SELECT_LINE,
    loadLineData,
    toggleLine
};
