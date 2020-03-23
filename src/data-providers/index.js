import axios from 'axios';

const api = 'http://api.metro.net';

async function getLinesDataProvider() {
  try {
    const data = await axios(`${api}/agencies/lametro/routes`);
    return data.data.items;
  } catch (error) {
    console.error(error);
  }
}

async function getLineSequenceByIdDataProvider(id) {
  try {
    const data = await axios(`${api}/agencies/lametro/routes/${id}/sequence`);
    return data.data.items;
  } catch (error) {
    console.error(error);
  }
}

async function getLineByIdDataProvider(id) {
  try {
    const data = await axios(`${api}/agencies/lametro/routes/${id}/stops`);
    return data.data.items;
  } catch (error) {
    console.error(error);
  }
}

async function getStationArrivalsDataProvider(lineId, stationId) {
  try {
    const data = await axios(`${api}/agencies/lametro/stops/${stationId}/predictions`);
    return data.data.items;
  } catch (error) {
    console.error(error);
  }
}

export {
  getLinesDataProvider,
  getLineByIdDataProvider,
  getStationArrivalsDataProvider,
  getLineSequenceByIdDataProvider
}
