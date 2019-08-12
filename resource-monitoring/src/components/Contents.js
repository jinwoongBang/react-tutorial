import React, { Component } from 'react';
import styled from 'styled-components';

const ContentsContainer = styled.div`
    border: 1px solid tomato;
    height: 100%;
`

class Contents extends Component {
    render() {
        return (
            <ContentsContainer>
                <h1>contents</h1>
            </ContentsContainer>
        );
    }
}

export default Contents;
