import {Button, Flex, Form, FormProps, Input, Select} from "antd";
import './style.scss'
import {useNavigate} from "react-router-dom";
import {formatSkipQueryData} from "@utils/skip.ts";

// 字段名称
type FieldType = {
    // 比赛名称
    gameName?: string;
    // 比赛类型
    gameType?: string;
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
};


const CreateGame: React.FC = () => {
    const navigate = useNavigate()

    // 关于取消创建比赛
    const onCancelGame = () => {
        console.log('cancelHome')
        navigate(-1)
    }

    // 关于比赛创建
    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
        // TODO 校验通过
        // TODO 通知服务器创建资源 创建比赛
        // TODO 跳转到比赛详情
        let url = formatSkipQueryData('/game/info', {
            gameId: 10001
        })
        console.log(url)
        navigate(url)
    };

    return (
        <Form
            className="create-form"
            name="basic"
            labelCol={{span: 4}}
            wrapperCol={{span: 20}}
            initialValues={{gameName: '篮球比赛', gameType: 'basketball',remember: true}}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off">
            <Flex style={{height: '100%'}} vertical>
                <Flex gap={16} className="create-content" vertical>
                    <Form.Item<FieldType>
                        label="比赛名称"
                        name="gameName"
                        rules={[{required: true, message: '请输入比赛名称'}]}>
                        <Input/>
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="比赛类型"
                        name="gameType"
                        rules={[{required: true, message: '请选择比赛类型'}]}>
                        <Select>
                            <Select.Option value="basketball">篮球</Select.Option>
                        </Select>
                    </Form.Item>
                </Flex>

                <Form.Item wrapperCol={{span: 24}} className="create-handler" label={null}>
                    <Flex justify="flex-end" gap={12}>
                        <Button onClick={onCancelGame} type="primary" htmlType="reset">
                            取消
                        </Button>

                        <Button type="primary" htmlType="submit">
                            创建
                        </Button>
                    </Flex>
                </Form.Item>
            </Flex>
        </Form>
    )
}

export default CreateGame
