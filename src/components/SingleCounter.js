import React from 'react';
import {Link} from 'react-router-dom';
import TimeSince from './TimeSince';
import storage from '../utils/storage';
import './SingleCounter.css';

export
class SingleCounter extends React.Component {
  render() {
    const {counters} = this.props.storageData;
    const index = counters.findIndex(c =>
      c.id === this.props.match.params.id,
    );
    const item = counters[index];

    if (!item) {
      return <div className="SingleCounter__404">
        {`No item found with this name. `}
        <Link to="/">Go home.</Link>
      </div>;
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

    return (
      <div className="SingleCounter">
        <div className="SingleCounter__HomeLink">
          <Link to="/">Go home.</Link>
        </div>

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
    );
  }
}

export default storage.provider(SingleCounter);
