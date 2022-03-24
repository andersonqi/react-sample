import React from 'react';
import { Layout} from "antd";
import { useSelector } from "react-redux";

import Sidebar from "./Sidebar";
import { Store } from '../../types/state';

const { Header, Footer, Content } = Layout;

type Props = {
    children: React.ReactNode;
}

function LayoutApp(props: Props) {

    const state = useSelector((store: Store) => {
        return {
            property: store.auth.user
        }
    });

    return (
        <Layout>
            <Header className={`app-header`} style={{ backgroundColor: '#102934' }}>
                <div className={`app-header-wrapper`}>
                    <div className="logo logo_admin" style={{ width: '250px', textAlign: 'left' }}>
                        <img src="/logo_white.png" alt="App" />
                    </div>
                    <div className="nav" style={{ width: `calc(100% - 250px` }}>
                        <div className="nav-right">
                            <span style={{ color: '#fff' }}>Hola, {state.property?.name}</span>
                        </div>
                    </div>
                </div>
            </Header>
            <Layout className="app-container">
                <Sidebar />
                <Layout className="app-layout" style={{paddingLeft: 250}}>
                    <div className={`app-content`}>
                        <Content>
                            {props.children}
                        </Content>
                    </div>
                    <Footer />
                </Layout>
            </Layout>
        </Layout>
    )
}

export default LayoutApp;