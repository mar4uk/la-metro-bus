import path from 'path';
import express from 'express';
import webpack from 'webpack';

import handleRender from './lib/render';
import {
    prepareState
} from './middlewares';

import {
    getLines,
    getLineById,
    getStationArrivals
} from './controllers';

const port = process.env.PORT || 8080;
const app = express();

app.set('views', './src/layouts');
app.set('view engine', 'hbs');

app.use('/dist', express.static('dist', {
    fallthrough: false
}));

app.use(prepareState);

app.get('/', getLines);
app.get('/line/:id', getLineById);
app.get('/line/:lineId/station/:stationId/arrivals', getStationArrivals);

app.use(handleRender);

app.listen(port, function () {
    console.log(`Example app listening on port http://localhost:${port}!\n`);
});
