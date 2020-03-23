import {
  getLinesDataProvider,
  getLineByIdDataProvider,
  getLineSequenceByIdDataProvider,
  getStationArrivalsDataProvider
} from '../data-providers';

const getLines = (req, res, next) => {
  getLinesDataProvider().then(lines => {
    Object.assign(req.state, {
      lines: lines.reduce((memo, line) => {
        memo[line.id] = {
          id: line.id,
          name: line.display_name,
          selected: line.selected || false,
          stations: line.stations || {},
          lineStrings: []
        };
        return memo;
      }, {})
    });

    next();
  });
};

async function getLineById (req, res, next) {
  const {id} = req.params;

  const [
    sequence,
    stations
  ] = await Promise.all([
    getLineSequenceByIdDataProvider(id),
    getLineByIdDataProvider(id)
  ]);

  res.json({
    line: {
      id,
      stations: stations.reduce((memo, station) => {
      memo[station.id] = {
        id: station.id,
        lineId: id,
        name: station.display_name,
        coords: {
          lat: station.latitude,
          lon: station.longitude
        }
      }
      return memo;
    }, {}),
    lineStrings: [sequence.map(station => ([station.latitude, station.longitude]))]
    }
  });
};

const getStationArrivals = (req, res, next) => {
  const {lineId, stationId} = req.params;

  getStationArrivalsDataProvider(lineId, stationId).then(arrivals => {
    res.json({
      arrivals: arrivals
        .filter(arrival => arrival.route_id === lineId)
        .slice(0, 3)
        .map(({minutes}) => `${minutes} min`)
    });
  });
}

export {
  getLines,
  getLineById,
  getStationArrivals
};
