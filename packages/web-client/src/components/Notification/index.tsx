import {notification} from "antd";
import {NotificationInstance} from "antd/lib/notification/interface";
import {SmileOutlined} from "@ant-design/icons";

interface IProps {
    message?: string;
    description: string;
}

class Notification {
    api: NotificationInstance = null!
    contextHolder: React.ReactElement = null!

    constructor() {
        const [api, contextHolder] = notification.useNotification()

        this.api = api
        this.contextHolder = contextHolder
    }

    open ({message = '消息提示', description, icon}: IProps & { icon: JSX.Element }) {
        this.api.open({
            placement: 'topRight',
            message,
            description,
            icon
        });
    }

    success (props: IProps) {
        this.open(Object.assign(props, {
            icon: <SmileOutlined style={{ color: '#108ee9' }} />
        }))
    }
}


export default Notification
