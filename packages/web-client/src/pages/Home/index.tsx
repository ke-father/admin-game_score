import React, {ReactElement, useState} from 'react';
import {Card, Flex} from 'antd';
import './style.scss';
import { Button } from "antd";
import {PlusOutlined} from "@ant-design/icons";
import createLogo from '@assets/images/create.png'
import { useNavigate } from "react-router-dom";

interface IColumnData {
    title: string
    [key:string]:any
}

interface IColumns {
    [key: string]: IColumnData
}

// 获取状态类名
const getClassNameByType = (type: string) => {
    let className = {
        tag: ''
    }

    switch (type) {
        case 'underway':
            className.tag = 'tag underway-tag'
            break
    }

    return className
}

const itemCard = (item: IColumnData, key: string, title: string): ReactElement => {
    const tagClassName = getClassNameByType(key).tag
    // 进度
    const schedule = item.schedule
    // 比赛名称
    const gameName = item.gameName + '：' + item.teams.map((i: any) => i.name).join(' vs ')
    // 比分
    const score = item.teams.map((i: any) => i.score).join(' : ')

    return (
        <Card key={'child' + key}>
            <div className="title">
                <div className={tagClassName}>
                    <i>{title}</i>
                </div>

                <span>{ schedule }</span>
            </div>

            <div className="body">
                <div className="gameName">{ gameName }</div>

                <div className="gameInfo">{score}</div>
            </div>

            <div className="footer">
                <div className="attention">

                </div>

                <div className="examine">查看详情</div>
            </div>
        </Card>
    )
}

const Home: React.FC = () => {
    const navigate = useNavigate();

    // 关于创建比赛
    const handleCreateGame = () => {
        navigate('/createGame', { replace: false });
    }

    // 栏目数据
    const [columnsData, setColumnsData] = useState<IColumns>({
        underway: {
            title: '进行中',
            list: [
                {
                    tag: [{title: '进行中'}],
                    schedule: '第二节 8:30',
                    gameName: '春季篮球赛联赛',
                    teams: [{name: '热火', score: 48}, { name: '马刺', score: 50 }],
                    follower: 48
                }
            ]
        }
    })

    // 获取栏目
    const getColumns = () => {}

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

        {/*body*/}
        {
            Object.entries(columnsData).map(([key, value]) => {
                const title = value.title

                return (
                    <div key={key}>
                        <h1>{title}</h1>

                        <div className="columns-list">
                            {
                                value.list.map((item: IColumnData) => itemCard(item, key))
                            }
                        </div>
                    </div>
                )
            })
        }
    </div>
  );
};

export default Home;
