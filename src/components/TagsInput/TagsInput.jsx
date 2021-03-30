/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import TagsInput from 'react-tagsinput';

const CustomTagsInput = props => {
    // Here I perform destructuring of objects to access the value using ES6 method
    const {
        handleChangeTag,
        tags,
    } = props;
    return (
        <TagsInput
            className="form-control tagInputField"
            value={tags}
            inputProps={{
                className: 'tagInput',
                placeholder: 'Tags'
            }}
            onChange={handleChangeTag}
        />
    );
};

// The propType is used to make sure the props types are the same as required
CustomTagsInput.propTypes = {
    handleChangeTag: PropTypes.func.isRequired,
    tags: PropTypes.instanceOf(Array),
};

export default CustomTagsInput;
