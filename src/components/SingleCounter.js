import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import TimeSince from './TimeSince';
import storage from '../utils/storage';
import './SingleCounter.css';

export
class SingleCounter extends React.Component {
  static propTypes = {
    storageData: PropTypes.object,
    open: PropTypes.bool,
  };
  render() {
    const {counters} = this.props.storageData;
    const hasMatch = !!this.props.match;

    if (!hasMatch) return this.renderShell();

    const index = counters.findIndex(c =>
      c.id === this.props.match.params.id,
    );
    const item = counters[index];

    if (!item) {
      return this.renderShell(true);
    }

    const handleAdd = () => {
      const newPoint = {date: Date.now()};
      const newPoints = item.points.concat([newPoint]);
      const newCounter = {...item, points: newPoints};
      const newCounters = counters.slice();
      newCounters[index] = newCounter;
      this.props.setStorage({
        ...this.props.storageData,
        counters: newCounters,
      });
    };

    const newest = item.points[item.points.length - 1];

    let className = `SingleCounter`;
    if (open) {
      className = `${className} SingleCounter--open`;
    } else {
      className = `${className} SingleCounter--closed`;
    }

    return (
      <div className={className}>
        <div className="SingleCounter__HomeLink">
          <Link to="/">Go home.</Link>
        </div>

        <div className="SingleCounter__AboutPanel">
          <h1>{item.name}</h1>
          <button
            className="SingleCounter__Add"
            onClick={handleAdd}
          >
            Add Count
          </button>

          <div>
            <strong>Last point: </strong><TimeSince time={newest.date} />
          </div>
        </div>

        <div className="SingleCounter__GraphPanel">
          TODO
        </div>

        <div className="SingleCounter__PointsPanel">
          <ul>
            {item.points.slice().reverse().map(({date}) => {
              return (
                <li key={date}>
                  {new Date(date).toString()}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }

  renderShell(is404) {
    return (
      <div className="SingleCounter SingleCounter--closed">
        <div className="SingleCounter__AboutPanel" />
        <div className="SingleCounter__GraphPanel" />
        <div className="SingleCounter__PointsPanel" />
      </div>
    );
  }
}

export default storage.provider(SingleCounter);
