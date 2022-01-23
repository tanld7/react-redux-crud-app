import React, {useEffect} from 'react'
import { connect, useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { fetchStream } from "../../actions";



const StreamShow = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const stream = useSelector((state) => state.streams[id])

    useEffect(() => {
        if (!stream) {
            dispatch(fetchStream(id));
        }
    }, [])

    if(!stream) {
        return <div>Loading ...</div>
    }

    return (
        <div>
            <h1>{stream.title}</h1>
            <h5>{stream.description}</h5>
        </div>
    )
}

export default connect(
    null,
    { fetchStream }
)(StreamShow);