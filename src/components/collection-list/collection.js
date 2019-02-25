import React from "react";
import { func, object, string } from "prop-types";
import classNames from "classnames";

import StarRatingComponent from 'react-star-rating-component';
import { TOTAL_STAR_COUNT } from '../../constants';

const Collection = ({ item, onStarClick, randomItem }) => {
    const { name, rating, id } = item;
    const activeItem = classNames('list-group-item', 'row', { 'active-link': id === randomItem});
    return (
        <li className={activeItem}>
            <p className="collection-item col-4">{name}</p>
            <StarRatingComponent
                className="col-2"
                name={id}
                starCount={TOTAL_STAR_COUNT}
                value={rating}
                onStarClick={onStarClick}
            />
        </li>
    );
}

Collection.propTypes = {
    item: object,
    onStarClick: func,
    randomItem: string
};

export default Collection;
