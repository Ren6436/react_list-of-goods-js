import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

const SORT_FILED_NAME = 'name';
const SORT_FILED_LENGTH = 'length';
const DEFAULT_SORT_FIELD = '';

export const App = () => {
  const [sortField, setSortField] = useState(DEFAULT_SORT_FIELD);
  const [reversed, setReversed] = useState(false);

  let visibleGoods = [...goodsFromServer];

  if (sortField) {
    visibleGoods = visibleGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_FILED_NAME:
          return good1.localeCompare(good2);
        case SORT_FILED_LENGTH:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (reversed) {
    visibleGoods = visibleGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button ${sortField === SORT_FILED_NAME ? 'is-info' : 'is-light'}`}
          onClick={() => setSortField(SORT_FILED_NAME)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button ${sortField === SORT_FILED_LENGTH ? 'is-success' : 'is-light'}`}
          onClick={() => setSortField(SORT_FILED_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button ${reversed ? 'is-warning' : 'is-light'}`}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>

        {(sortField !== DEFAULT_SORT_FIELD || reversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField(DEFAULT_SORT_FIELD);
              setReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
