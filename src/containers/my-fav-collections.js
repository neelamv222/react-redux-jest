import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { array, string, object, bool } from "prop-types";
import { find, random } from "lodash";

import { getCollectionData, handleToggleBtnClick, starClickAction } from "../actions/my-fav-collections-actions";
import Collections from "../components/collection-list/collections";
import RandomRatingBtn from "../components/random-rating-btn";
import RandomTimerGenerator from "../components/random-timer-generator";
import { FAV_COLLECTION, RANDOM_MIN_VAL, RANDOM_MAX_VAL, RANDOM_MAX_VAL_ID } from "../constants";

class CollectionList extends Component {

    /** 
     * When component gets loaded, depending upon the pathName, it will show the particular category of collections.
     */
    componentDidMount() {
        const pathName = this.props.location.pathname.replace("/", "") || "books";
        const item = find(FAV_COLLECTION, (o) => o === pathName);
        this.props.getCollectionData(item);
    }

    // On randomRatingBtn click, dispatch the action to change the button text and set random data. 
    onRandomRatingBtnClick = () => {
        this.props.handleToggleBtnClick();
    };

    /** 
     * Generate random id and rating for the item in the list and dispatch action to update the random
     * item with the random rating.
     */
    generateTimer = () => {
        const randomRating = random(RANDOM_MIN_VAL, RANDOM_MAX_VAL);
        const randomElement = random(RANDOM_MIN_VAL, RANDOM_MAX_VAL_ID);
        this.props.starClickAction(randomRating, randomElement);
    };

    // On star click, dispatch the action to update the rating for that particular item. 
    onStarClick = (nextValue, prevValue, name) => {
        this.props.starClickAction(nextValue, name);
    };

    //check for api success or failure scenario
    checkCollectionDataSection = () => {
        const { data, randomData } = this.props;
        const { randomItem } = randomData || {};
        return (
            this.props.isApiFail ? <p className="error-msg">Api Call Failed :-(</p> :
                <Collections
                    data={data}
                    onStarClick={this.onStarClick}
                    randomItem={randomItem}
                />
        );
    }

    render() {
        const { text, randomData, data } = this.props;
        const { randomRating, randomItem, randomTime } = randomData || {};
        const randomItemName = find(data, (el) => el.id === randomItem);
        return (
            <div className="container">

                {/* Render my fav collection data */}
                {this.checkCollectionDataSection()}
                {
                    data && (
                        <React.Fragment>
                            {/* When enabled, set the interval and call the callback when the time reach */}
                            <RandomTimerGenerator
                                randomTime={randomTime}
                                randomRating={randomRating}
                                randomItemName={randomItemName}
                                text={text}
                                generateTimer={this.generateTimer}
                            />

                            {/* Render random rating button section */}
                            <RandomRatingBtn
                                onRandomRatingBtnClick={this.onRandomRatingBtnClick}
                                toggleBtnText={text}
                            />
                        </React.Fragment>
                    )
                }

            </div>
        );
    }
}

CollectionList.propTypes = {
    data: array,
    text: string,
    randomData: object,
    isApiFail: bool
};

export const mapStateToProps = (state) => {
    return {
        data: state.collections.data,
        text: state.collections.text,
        randomData: state.collections.randomData,
        isApiFail: state.collections.isApiFail
    };
}

export const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getCollectionData, handleToggleBtnClick, starClickAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CollectionList);
