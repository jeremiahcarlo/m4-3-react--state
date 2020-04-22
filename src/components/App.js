import React from 'react';
import styled from 'styled-components';

import data from '../data';

import GlobalStyles from './GlobalStyles';
import Typeahead from './Typeahead';

function App(props) {
    return (
        <>
            <GlobalStyles />
            <Wrapper>
                <Typeahead
                    suggestions={data.books}
                    categories={data.categories}
                    handleSelect={item => alert('Selected: ' + item.title)}
                />
            </Wrapper>
        </>
    );
}

const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
    display: grid;
    place-content: center;
`;

export default App;
