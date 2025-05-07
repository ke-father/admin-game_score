import {useState} from "react";

export default () => {
    let [foul, setFoul] = useState(0)

    return {
        foul,
        setFoul
    }
}
