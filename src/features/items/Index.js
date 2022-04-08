import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { loadItems } from './reducer';
import './index.css';

const Items = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.itemsReducer.items);

  useEffect(() => {
    dispatch(loadItems());
  }, []);

  return (
    <section>
      <h1 className="items-header">Items</h1>
      <div className="items">
        <ul className="items-container">
          {items.map((v) => (
            <li className="align" key={v.id}>
              <div>
                <Link to={`/items/${v.id}`}>
                  <img className="items-images" src={v.picture} alt={v.description} />
                </Link>
              </div>
              <p>{v.name}</p>
              <p>{v.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Items;
