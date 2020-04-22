import React from 'react';
import styled from 'styled-components';

const Suggestion = ({
    searchValue,
    suggestion,
    category,
    index,
    isSelected,
    ...delegated
}) => {
    // Let's say the user has typed "Dea", and one of our matches is
    // "Dear Girls". Here's what we want to do:
    // - Wrap "Dea" in a span with no styling
    // - Wrap "r Girls" in a span with strong styling
    //
    // To do this we need to find the index where the two should be
    // split, to create two individual strings
    const matchIndex = suggestion.title
        .toLowerCase()
        .indexOf(searchValue.toLowerCase());
    const matchEnd = matchIndex + searchValue.length;

    const firstHalf = suggestion.title.slice(0, matchEnd);
    const secondHalf = suggestion.title.slice(matchEnd);

    return (
        <Wrapper
            className={isSelected ? 'selected' : undefined}
            id={`option-${suggestion.id}`}
            // These settings are important for accessibility
            role="option"
            aria-selected={isSelected}
            tabindex={-1}
            {...delegated}
        >
            {firstHalf}
            <Prediction>{secondHalf}</Prediction>{' '}
            <Caption>
                in <CategoryName>{category.name}</CategoryName>
            </Caption>
        </Wrapper>
    );
};

const Wrapper = styled.li`
    display: block;
    width: 100%;
    padding: 10px;
    font-size: 18px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    text-decoration: none;
    color: black;
    line-height: 1.25;
    border: none;
    background: transparent;
    text-align: left;
    cursor: pointer;

    &:last-of-type {
        border-bottom: none;
        margin-bottom: 0;
    }

    &.selected {
        background: hsla(50deg, 100%, 80%, 0.25);
    }
`;

const Prediction = styled.span`
    font-weight: bold;
`;

const CategoryName = styled.span`
    color: purple;
`;

const Caption = styled.em`
    opacity: 0.75;
    font-size: 0.8em;
`;

export default Suggestion;
