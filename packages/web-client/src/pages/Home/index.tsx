import React from 'react';
import {Card, Flex} from 'antd';
import './style.scss';
import { Button } from "antd";
import {PlusOutlined} from "@ant-design/icons";
import createLogo from '@assets/images/create.png'
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
    const navigate = useNavigate();

    // 关于创建比赛
    const handleCreateGame = () => {
        navigate('/createGame', { replace: false });
    }

  return (
    <div className="home">
        {/*top*/}
      <Card hoverable cover={<img alt="example" src={createLogo} />} className="create-card" classNames={{cover: 'create-logo'}} >
          {/*左侧*/}
          <Flex vertical className="create-handler">
              <h1>创建你的体育赛事</h1>
              <span>开始组织一场精彩的体育赛事，展现运动魅力</span>
              <Button onClick={handleCreateGame} icon={<PlusOutlined />}>创建赛事</Button>
          </Flex>
      </Card>
    </div>
  );
};

export default Home;
