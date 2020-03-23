const LOAD_STATION_DATA = 'LOAD_STATION_DATA';
const DESELECT_STATION = 'DESELECT_STATION';
const SELECT_STATION = 'SELECT_STATION';
const DESELECT_STATIONS = 'DESELECT_STATIONS';

const loadStationData = (lineId, stationId) => {
  return (dispatch, getState) => {
    const {lines} = getState();

    if (!Object.keys(lines[lineId].stations).length) {
      return;
    }

    if (lines[lineId].stations[stationId] && lines[lineId].stations[stationId].arrivals) {
      return;
    }

    dispatch({
      type: LOAD_STATION_DATA,
      meta: {
        status: 'pending'
      }
    });

    fetch(`/line/${lineId}/station/${stationId}/arrivals`)
      .then(res => res.json())
      .then(({arrivals}) => {
        return dispatch({
          type: LOAD_STATION_DATA,
          meta: {
            status: 'done'
          },
          payload: {
            lineId,
            stationId,
            arrivals
          }
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: LOAD_STATION_DATA,
          meta: {
            status: 'fail'
          }
        });
      });
  }
};

const toggleStation = (lineId, stationId) => {
  return (dispatch, getState) => {
    const {lines} = getState();

    const isStationSelected = lines[lineId].stations[stationId].selected;

    dispatch({
      type: isStationSelected ? DESELECT_STATION : SELECT_STATION,
      payload: {
        lineId,
        stationId
      }
    });
  }
};

const deselectStations = () => {
  return (dispatch, getState) => {
    const {lines} = getState();
    const selectedLine = Object.values(lines).find(line => line.selected);

    if (selectedLine) {
      dispatch({
        type: DESELECT_STATIONS,
        payload: {
          lineId: selectedLine.id
        }
      });
    }
  }
}

export {
  LOAD_STATION_DATA,
  DESELECT_STATION,
  SELECT_STATION,
  DESELECT_STATIONS,
  loadStationData,
  toggleStation,
  deselectStations
};
