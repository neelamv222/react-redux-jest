import React from "react";
import { func, array, string } from "prop-types";

import Collection from "./collection";


const Collections = ({ data, onStarClick, randomItem }) => {

    //It will display the list of collections.
    const displayCollectionList = () => (
        data.map(elem => (<Collection key={elem.id} item={elem} onStarClick={onStarClick} randomItem={randomItem} />))
    );

    return (
        <ul className="list-group">
            {data && displayCollectionList()}
        </ul>
    );
}

Collections.propTypes = {
    data: array,
    onStarClick: func,
    randomItem: string
};

export default Collections;
