import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import storage from '../utils/storage';
import './CounterTypes.css';

export
class CounterTypes extends React.Component {
  static propTypes = {
    setStorage: PropTypes.func,
    storageData: PropTypes.shape({
      counters: PropTypes.array,
    }),
    onNewCounter: PropTypes.func,
  };

  render() {
    const prevent = (e) => {
      e.stopPropagation();
      e.preventDefault();
    };

    return (
      <div className="CounterTypes">
        {this.props.storageData.counters.map((counter, i) => {
          return (
            <div className="CounterTypes__Counter" key={counter.id}>
              <Link to={`/counter/${counter.id}`}>
                <div
                  className="CounterTypes__Counter__Name"
                  onClick={prevent}
                >
                  <input
                    type="text"
                    value={counter.name}
                    onChange={(e) => {
                      const counters = this.props.storageData.counters.slice();
                      counters[i] = {...counter, name: e.target.value};
                      this.props.setStorage({
                        ...this.props.storageData,
                        counters,
                      });
                    }}
                  />
                </div>
                <div className="CounterTypes__Counter__Items">
                  <strong>Items</strong>: {counter.points.length}
                </div>
              </Link>
            </div>
          );
        })}
        <div
          className="CounterTypes__Counter CounterTypes__Counter--new"
          onClick={this.props.onNewCounter}
        >
          Add new counter
        </div>
      </div>
    );
  }
}

export default storage.provider(CounterTypes);
