/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import TagsInput from 'react-tagsinput';
import Autosuggest from 'react-autosuggest';
import { asyncLocalStorage, capitalizeFirstLetter } from '../utils';


class CustomTagsInput extends React.Component {
    constructor() {
        super();
        this.state = {
            suggestionList: [],
        };
    };

    componentDidMount() {
        this.getTagsFromStorage();
    };

    getTagsFromStorage = async () => {
        try {
            const asyncData = JSON.parse(await asyncLocalStorage.getItem('boards'));

            if (asyncData?.tags) {
                const formated = asyncData?.tags.map(tag => ({ abbr: capitalizeFirstLetter(tag), name: capitalizeFirstLetter(tag) }));
                this.setState({ suggestionList: formated });
            }
        } catch (err) {
            console.error(err);
        }
    };

    render() {
        const {
            handleChangeTag,
            tags,
        } = this.props;

        const {
            suggestionList,
        } = this.state;

        function autocompleteRenderInput({ addTag, ...props }) {
            const handleOnChange = (e, { newValue, method }) => {
                if (method === 'enter') {
                    e.preventDefault()
                } else {
                    props.onChange(e)
                }
            }

            const inputValue = (props.value && props.value.trim().toLowerCase()) || ''
            const inputLength = inputValue.length

            const suggestions = suggestionList.filter((state) => {
                return state.name.toLowerCase().slice(0, inputLength) === inputValue
            })

            return (
                <Autosuggest
                    ref={props.ref}
                    suggestions={suggestions}
                    shouldRenderSuggestions={(value) => value && value.trim().length > 0}
                    getSuggestionValue={(suggestion) => suggestion.name}
                    renderSuggestion={(suggestion) => <span>{suggestion.name}</span>}
                    inputProps={{ ...props, onChange: handleOnChange }}
                    onSuggestionSelected={(e, { suggestion }) => {
                        addTag(suggestion.name)
                    }}
                    onSuggestionsClearRequested={() => { }}
                    onSuggestionsFetchRequested={() => { }}
                />
            )
        }

        return (
            <TagsInput
                className="form-control tagInputField"
                value={tags}
                inputProps={{
                    className: 'tagInput',
                    placeholder: 'Tags'
                }}
                renderInput={autocompleteRenderInput}
                onChange={handleChangeTag}
            />
        );
    }
}


// The propType is used to make sure the props types are the same as required
CustomTagsInput.propTypes = {
    handleChangeTag: PropTypes.func.isRequired,
    tags: PropTypes.instanceOf(Array),
};

export default CustomTagsInput;
