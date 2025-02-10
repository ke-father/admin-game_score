import React, {useEffect, useState} from 'react';
import {Layout, Popover, Avatar, Flex} from 'antd';
import {UserOutlined, PoweroffOutlined} from '@ant-design/icons';
import {useNavigate, Outlet, useLocation} from 'react-router-dom';
import {useAppDispatch} from '@/store';
import {logout} from '@/store/slices/authSlice.ts';
import './MainLayout.scss';

const {Header, Content, Footer} = Layout;

const avatarPopover = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleLogout = () => {
        console.log('logout')
        if (1) return
        dispatch(logout());
        navigate('/login');
    };
    return (
        <Flex vertical align="center" className="userHandler">
            {/*个人中心*/}
            <div className="userHandler-item">
                <UserOutlined/>
                <span>个人中心</span>
            </div>

            {/*退出登录*/}
            <div className="userHandler-item" onClick={handleLogout}>
                <PoweroffOutlined/>
                <span>退出登录</span>
            </div>
        </Flex>
    )
}

const MainLayout: React.FC = () => {
    const showFooterWhiteList = ['/']
    const showHeaderWhiteList = ['/']
    // const {user} = useAppSelector(state => state.auth);
    // 脚部展示状态
    const [showHeader, setShowHeader] = useState(false)
    const [showFooter, setShowFooter] = useState(false)

    // 监听路由
    const location = useLocation()
    useEffect(() => {
        let headerStatus = showHeaderWhiteList.includes(location.pathname)
        let footerStatus = showFooterWhiteList.includes(location.pathname)

        setShowHeader(() => headerStatus)
        setShowFooter(() => footerStatus)
    }, [location])

    return (
        <Layout className="main-layout">
            {/*头部*/}
            {
                showHeader
                    ? <Header className="header">
                        <div className="header-left"></div>

                        {/*头部右侧*/}
                        <div className="header-right">
                            {/*头像*/}
                            <Popover content={avatarPopover} trigger="hover">
                                <Avatar size={40} icon={<UserOutlined/>}/>
                            </Popover>
                        </div>
                    </Header>
                    : null
            }

            {/*内容*/}
            <Content className="content">
                <Outlet/>
            </Content>

            {/*脚部*/}
            {
                showFooter
                    ? <Footer className="footer"><p>© 2024 我的 React 应用</p></Footer>
                    : null
            }
        </Layout>
    );
};

export default MainLayout;
