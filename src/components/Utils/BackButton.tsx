import React from 'react';
import styled from 'styled-components';
import { LeftOutlined } from '@ant-design/icons';

function BackButton(props: any){
    return(
        <Header>
            <ArrowBack onClick={props.handleBack}>
                <LeftOutlined />
            </ArrowBack>
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

const ArrowBack = styled.button`
  background: transparent;
  border: 0;
  padding: 0px 5px;
  cursor: pointer;
  &:hover{
    background: #fff;
  }
`;

export default BackButton;