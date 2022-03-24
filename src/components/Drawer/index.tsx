import React from 'react';
import styled from 'styled-components';
import { Drawer } from 'antd';

type Props = {
    title: string;
    loading: boolean;
    visible: boolean;
    handleCancel: Function;
    children: React.ReactNode;
}

function ModalDrawer(props: Props){
    return(
        <Drawer
            title={props.title}
            width={720}
            onClose={() => props.handleCancel()}
            visible={props.visible}
            bodyStyle={{ paddingBottom: 80 }}>
                {
                    props.loading ?
                        <Loading>
                            <div className="loading"></div>
                            <Feedback>Por favor espere...</Feedback>
                        </Loading> :
                        props.children
                }
            </Drawer>
    )
}

const Loading = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #ffffffb0;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const Feedback = styled.strong`
    color: #909094;
    display: block;
    margin-top: 15px;
`;

export default ModalDrawer;