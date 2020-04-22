import React from 'react';
import styled from 'styled-components';

import { clamp } from '../utils';

import Button from './Button';
import Suggestion from './Suggestion';

const Typeahead = ({
    suggestions,
    categories,
    maxResults = 6,
    handleSelect,
}) => {
    const [value, setValue] = React.useState('');
    const [isVisible, setIsVisible] = React.useState(false);
    const [selectedSuggestionIndex, setSelectedSuggestionIndex] = React.useState(
        0
    );

    let matchedSuggestions = suggestions
        .filter(suggestion => {
            const hasEnteredEnoughCharacters = value.length >= 2;
            const includesValue = suggestion.title
                .toLowerCase()
                .includes(value.toLowerCase());

            return hasEnteredEnoughCharacters && includesValue;
        })
        .slice(0, maxResults);

    const shouldShowSuggestions = matchedSuggestions.length > 0 && isVisible;

    const selectedSuggestion = matchedSuggestions[selectedSuggestionIndex];

    return (
        <Wrapper>
            <Row>
                <Input
                    type="text"
                    value={value}
                    onChange={ev => {
                        setValue(ev.target.value);
                    }}
                    onFocus={() => {
                        setIsVisible(true);
                    }}
                    onKeyDown={ev => {
                        switch (ev.key) {
                            case 'Enter': {
                                handleSelect(selectedSuggestion);
                                return;
                            }
                            case 'Escape': {
                                setIsVisible(false);
                                return;
                            }

                            case 'ArrowUp':
                            case 'ArrowDown': {
                                ev.preventDefault();

                                if (!matchedSuggestions) {
                                    return;
                                }

                                const direction = ev.key === 'ArrowDown' ? 'down' : 'up';

                                let nextSuggestionIndex = selectedSuggestionIndex;

                                nextSuggestionIndex =
                                    direction === 'down'
                                        ? nextSuggestionIndex + 1
                                        : nextSuggestionIndex - 1;

                                nextSuggestionIndex = clamp(
                                    nextSuggestionIndex,
                                    0,
                                    matchedSuggestions.length - 1
                                );

                                setSelectedSuggestionIndex(nextSuggestionIndex);
                                return;
                            }

                            default: {
                                setIsVisible(true);
                                return;
                            }
                        }
                    }}
                    aria-expanded={isVisible}
                    aria-owns="results"
                    aria-label="Search for a book"
                    aria-describedby="typeahead-instructions"
                    aria-activedescendant={
                        selectedSuggestion ? `option-${selectedSuggestion.id}` : undefined
                    }
                />
                <ClearButton
                    onClick={() => {
                        setValue('');
                    }}
                >
                    Clear
        </ClearButton>
            </Row>
            {shouldShowSuggestions && (
                <Suggestions id="results">
                    {matchedSuggestions.map((suggestion, index) => {
                        const category = categories[suggestion.categoryId];

                        const isSelected = index === selectedSuggestionIndex;

                        return (
                            <>
                                <Suggestion
                                    key={suggestion.id}
                                    suggestion={suggestion}
                                    category={category}
                                    index={index}
                                    isSelected={isSelected}
                                    searchValue={value}
                                    onMouseEnter={() => {
                                        setSelectedSuggestionIndex(index);
                                    }}
                                    onMouseDown={() => {
                                        handleSelect(suggestion);
                                    }}
                                />
                            </>
                        );
                    })}
                </Suggestions>
            )}
            <ForScreenReaders id="typeahead-instructions">
                When autocomplete results are available use up and down arrows to review
                and enter to select. Touch device users, explore by touch or with swipe
                gestures.
      </ForScreenReaders>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    position: relative;
`;

const Row = styled.div`
    display: flex;
`;

const ClearButton = styled(Button)`
    margin-left: 10px;
`;

const Input = styled.input`
    width: 350px;
    height: 40px;
    padding: 0 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 18px;
`;

const Suggestions = styled.div`
    position: absolute;
    width: 100%;
    left: 0;
    right: 0;
    bottom: -10px;
    padding: 10px;
    border-radius: 4px;
    box-shadow: 1px 5px 10px rgba(0, 0, 0, 0.2);
    transform: translateY(100%);
`;

const ForScreenReaders = styled.span`
    display: none;
`;

export default Typeahead;
