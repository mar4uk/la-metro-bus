import React from 'react';
import PropTypes from 'prop-types';
import loadScript from 'load-script';

import isEqual from 'lodash/isEqual'

require('./index.scss');

class Map extends React.Component {
    constructor(props) {
        super(props);

        this._onGeoObjectClick = this._onGeoObjectClick.bind(this);
        this._onMapLoad = this._onMapLoad.bind(this);
        this._onMapClick = this._onMapClick.bind(this);
    }

    componentDidMount() {
        this._loadMap()
    }

    render() {
        return (
            <div id="map" className="map"></div>
        );
    }

    componentDidUpdate(prevProps) {
        if (
            !isEqual(this.props.lineCoords, prevProps.lineCoords) ||
            !isEqual(this.props.stations, prevProps.stations)
        ) {
            this._resetMap(this.props.lineCoords);
        }
    }

    _loadMap() {
        loadScript('https://api-maps.yandex.ru/2.1/?lang=en_US', this._onMapLoad);
    }

    _onMapLoad(err) {
        if (err) {
            console.log(err);
        } else {
            window.ymaps.ready(() => {
                this._showMap();
            })
        }
    }

    _showMap() {
        const {
            lineCoords,
            stations
        } = this.props;

        this._map = new ymaps.Map('map', {
            center: [34.052235, -118.243683],
            controls: ['zoomControl', 'geolocationControl'],
            zoom: 10
        });

        this._map.geoObjects.events.add('click', this._onGeoObjectClick);
        this._map.events.add('click', this._onMapClick);

    }

    _resetMap() {
        const {
            lineCoords
        } = this.props;

        this._map.geoObjects.removeAll();

        this._createLine();
        this._createStations();
        this.forceUpdate();
    }

    _createLine() {
        const {
            lineStrings
        } = this.props;

        if (lineStrings.length) {
            lineStrings.forEach(lineString => {
                console.log(lineString);
                const myPolyline = new ymaps.Polyline(lineString, {},

                {
                    strokeWidth: 6,
                    strokeColor: '#0000FF'
                });

                this._map.geoObjects.add(myPolyline);
            });
        }
    }

    _createStations() {
        const {
            stations
        } = this.props;

        const options = {
            iconShape: {
                type: 'Circle',
                coordinates: [0, 0],
                radius: 15
            }
        };

        const myCollection = new ymaps.GeoObjectCollection();

        stations.forEach(station => {
            const mark = new ymaps.Placemark([
                station.coords.lat,
                station.coords.lon
            ], {
                stationId: station.id,
                lineId: station.lineId,
                type: 'station'
            }, options);

            myCollection.add(mark);
        });

        this._map.geoObjects.add(myCollection);
    }

    _onGeoObjectClick(evt) {
        const props = evt.get('target').properties;

        if (props && props.get('type') === 'station') {
            this.props.onStationClick(evt, {lineId: props.get('lineId'), stationId: props.get('stationId')});
        }
    }

    _onMapClick(evt) {
        this.props.onMapClick(evt);
    }
}

Map.defaultProps = {
    onStationClick: () => {},
    onMapClick: () => {}
}

Map.propTypes = {
    stations: PropTypes.array,
    lineStrings: PropTypes.array,
    onStationClick: PropTypes.func,
    onMapClick: PropTypes.func
}

export default Map;
