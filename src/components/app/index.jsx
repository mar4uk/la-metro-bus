import React from 'react';
import {connect} from 'react-redux';
import Map from '../map';
import Select from 'react-select';
import b_ from 'b_';

import {
    loadLineData,
    toggleLine,
} from '../../actions/line';

import {
    loadStationData,
    toggleStation,
    deselectStations
} from '../../actions/stations';

require('./index.scss');

const b = b_.lock('app');

class App extends React.Component {
    constructor(props) {
        super(props);

        this._onLineChange = this._onLineChange.bind(this);
        this._onStationClick = this._onStationClick.bind(this);
        this._onMapClick = this._onMapClick.bind(this);

        this.state = {};
    }

    componentDidMount() {
        this.setState({
            isSelectorVisible: true
        });
    }

    static formatArrivals(arrivals = []) {
        return arrivals.join(', ')
    }

    render() {
        const {lines} = this.props;
        const selectedLineId = Object.keys(lines).find(id => lines[id].selected);
        let lineStrings = [];
        let lineStations = [];
        let selectedStation;

        if (selectedLineId) {
            lineStrings = lines[selectedLineId].lineStrings || [];
            lineStations = lines[selectedLineId].stations || {};

            selectedStation = Object.values(lineStations).find(station => station.selected);
        }

        return (
            <div className={b('wrapper')}>
                <div className={b('selector-container', {visible: this.state.isSelectorVisible})}>
                    {this.renderSelect()}
                </div>
                <div className={b('map-container')}>
                    <Map
                        lineStrings={lineStrings}
                        stations={Object.values(lineStations)}
                        onStationClick={this._onStationClick}
                        onMapClick={this._onMapClick}
                    />
                    {this.renderStationPopup(selectedStation)}
                </div>
            </div>
        );
    }

    renderStationPopup(selectedStation) {
        if (!selectedStation) {
            return null;
        }

        const {arrivals} = selectedStation;

        return (
            <div className={b('station-info-popup')}>
                <h3 className={b('station-title')}>{selectedStation.name}</h3>
                {
                    arrivals && <div className={b('station-info')}>
                        <p>arrivals: {App.formatArrivals(arrivals)}</p>
                    </div>
                }
            </div>
        );
    }

    renderSelect() {
        const {lines} = this.props;
        const selectedLine = Object.values(lines).find(line => line.selected);
        let selectedOption = null;

        if (selectedLine) {
            selectedOption = {
                value: selectedLine.id,
                label: selectedLine.name
            };
        }

        const options = Object.keys(lines).map(lineId => {
            return {
                value: lineId,
                label: lines[lineId].name
            };
        });

        return (
            <Select
                value={selectedOption}
                onChange={this._onLineChange}
                options={options}
                instanceId="line-selector"
            />
        );
    }

    _onLineChange(selectedOption) {
        const {
            value: lineId
        } = selectedOption;

        this.props.dispatch(loadLineData(lineId));
        this.props.dispatch(toggleLine(lineId));
    }

    _onStationClick(evt, {lineId, stationId}) {
        this.props.dispatch(loadStationData(lineId, stationId));
        this.props.dispatch(toggleStation(lineId, stationId));
    }

    _onMapClick(evt) {
        this.props.dispatch(deselectStations());
    }
}

function mapStateToProps(state) {
    return {
        lines: state.lines
    }
}

export default connect(mapStateToProps)(App);
