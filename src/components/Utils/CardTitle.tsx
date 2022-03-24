import React from 'react';
import styled from 'styled-components';

type Props = {
    title: string;
}

function CardTitle(props: Props){
    return(
        <Header>
            <Title>{props.title}</Title>
        </Header>
    )
}

const Header = styled.div`
  flex-direction: row;
  align-items: center;
`;

const Title = styled.span`
  color: #000;
  padding-left: 5px;
  font-weight: 400;
  font-size: 16px;
`;

export default CardTitle;