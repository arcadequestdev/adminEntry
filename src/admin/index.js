import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Link, Route, withRouter } from 'react-router-dom'; // Import withRouter
import { Layout, Menu } from 'antd';

const { Header, Content, Footer, Sider } = Layout;

function Home() {
  return <div>Home Page</div>;
}

function About() {
  return <div>About Page</div>;
}

function Contact() {
  return <div>Contact Page</div>;
}

function UserProfile() {
  return <div>User Profile Page</div>;
}

const AppContentWithRouter = withRouter(AppContent);

function AppContent(props) {
  const { location } = props; // Access location from props
  const [activeMenuItem, setActiveMenuItem] = useState(getInitialActiveMenuItem(location.pathname));

  useEffect(() => {
    setActiveMenuItem(getInitialActiveMenuItem(location.pathname));
  }, [location.pathname]);

  function getInitialActiveMenuItem(pathname) {
    if (pathname === '/') return '1';
    if (pathname.startsWith('/about')) return '2';
    if (pathname === '/contact') return '3';
    return '';
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={200} theme="dark">
        <Menu mode="vertical" selectedKeys={[activeMenuItem]}>
          <Menu.Item key="1">
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/about">About</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/contact">Contact</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }} />
        <Content style={{ margin: '24px 16px 0' }}>
          <div className="site-layout-content">
            <Route path="/" exact component={Home} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
            <Route
              path="/about/:id"
              component={UserProfile}
            />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Footer Text</Footer>
      </Layout>
    </Layout>
  );
}

function Main() {
  return (
    <Router>
      <AppContentWithRouter /> {/* Use the AppContent component wrapped with withRouter */}
    </Router>
  );
}

export default Main;
