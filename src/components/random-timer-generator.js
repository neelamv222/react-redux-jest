import React from "react";
import ReactInterval from "react-interval";
import { number, string } from "prop-types";

import { STOP_RANDOM_RATING } from "../constants";

const RandomTimerGenerator = ({ randomTime, randomItemName, text, randomRating, generateTimer }) => {
    return (
        <div>
            <ReactInterval
                timeout={randomTime * 1000}
                enabled={text === STOP_RANDOM_RATING}
                callback={generateTimer}
            />

            {/*Display the random rating, random item name and random time when clicked on random rating button */}
            {
                text === STOP_RANDOM_RATING && (
                    <React.Fragment>
                        <p> The random time interval is <b>{randomTime}</b></p>
                        {
                            randomRating && randomItemName && (
                                <p>The random rating <b>{randomRating}</b> is assigned to the random item
                                    <b> {randomItemName ? randomItemName.name : ""}</b>
                                </p>
                            )
                        }
                    </React.Fragment>
                )

            }
        </div>
    )

}

RandomTimerGenerator.propTypes = {
    randomTime: number,
    randomItemName: string,
    text: string,
    randomRating: number,
    generateTimer: number
};

export default RandomTimerGenerator;
