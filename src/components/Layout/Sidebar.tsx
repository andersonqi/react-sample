import React from 'react';
import { Layout, Menu } from "antd";
import { LogoutOutlined } from "@ant-design/icons"
import {Link} from "react-router-dom";
import { Scrollbars } from 'react-custom-scrollbars';
import { useHistory } from "react-router-dom"

import Icon from '../Icon';
import navigationConfig from "../../config/nav"

const { Sider } = Layout;
const { SubMenu } = Menu;

function Sidebar(props: any) {
    let history = useHistory()

    const handleLogout = async () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refresh_token');
        history.push('/');
    }

    return (
        <Sider
            className={`side-nav`}
            width={250}>
            <Scrollbars autoHide>
                <Menu
                    theme={"light"}
                    mode="inline"
                    style={{ height: "100%", borderRight: 0 }}>
                    {navigationConfig.map((menu) =>
                        menu.submenu.length > 0 ? (
                            <Menu.ItemGroup
                                key={menu.key}
                                title={menu.title}
                            >
                                {menu.submenu.map((subMenuFirst: any) =>
                                    subMenuFirst.submenu.length > 0 ? (
                                        <SubMenu
                                            icon={
                                                subMenuFirst.icon ? (
                                                    <Icon type={subMenuFirst?.icon} />
                                                ) : null
                                            }
                                            key={subMenuFirst.key}
                                            title={subMenuFirst.title}
                                        >
                                            {subMenuFirst.submenu.map((subMenuSecond: any) => (
                                                <Menu.Item key={subMenuSecond.key}>
                                                    {subMenuSecond.icon ? (
                                                        <Icon type={subMenuSecond?.icon} />
                                                    ) : null}
                                                    <span>
                                                        {subMenuSecond.title}
                                                    </span>
                                                    <Link to={subMenuSecond.path} />
                                                </Menu.Item>
                                            ))}
                                        </SubMenu>
                                    ) : (
                                        <Menu.Item key={subMenuFirst.key}>
                                            {subMenuFirst.icon ? <Icon type={subMenuFirst.icon} /> : null}
                                            <span>{subMenuFirst.title}</span>
                                            <Link to={subMenuFirst.path} />
                                        </Menu.Item>
                                    )
                                )}
                            </Menu.ItemGroup>
                        ) : (
                            <Menu.Item key={menu.key}>
                                {menu.icon ? <Icon type={menu?.icon} /> : null}
                                <span>{menu?.title}</span>
                                {menu.path ? <Link to={menu.path} /> : null}
                            </Menu.Item>
                        )
                    )}
                    <Menu.Item key="logout">
                        <LogoutOutlined />
                        <span onClick={handleLogout}>Logout</span>
                    </Menu.Item>
                </Menu>
            </Scrollbars>
        </Sider>
    )
}

export default Sidebar;