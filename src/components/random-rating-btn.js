import React from "react";
import { func, string } from "prop-types";

const RandomRatingBtn = ({ toggleBtnText, onRandomRatingBtnClick }) => {
    return (
        <button type="button" className="btn btn-primary btn-lg toggle-btn" onClick={() => onRandomRatingBtnClick()}>{toggleBtnText}</button>
    )
}

RandomRatingBtn.propTypes = {
    toggleBtnText: string,
    onRandomRatingBtnClick: func
};

export default RandomRatingBtn;
