import React, {useEffect} from 'react'
import { useNavigate, useParams, Link } from "react-router-dom"
import { connect, useDispatch, useSelector } from "react-redux";

import Modal from "../Modal";
import { fetchStream, deleteStream } from "../../actions";


const StreamDelete = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    const dispatch = useDispatch();
    const stream = useSelector((state) => state.streams[id])


    useEffect(() => {
        if(!stream) {
            dispatch(fetchStream(id));
        }
    }, [])

    const actions = (
        <React.Fragment>
            <button
                onClick={() => {
                    dispatch(deleteStream(id));
                    navigate('/');
                }}
                className="ui button negative">Delete</button>
            <Link to="/" className="ui button">Cancel</Link>
        </React.Fragment>
    )

    const renderContent = () => {
        if (!stream) {
            return "Are you sure you want to delete this stream?";
        }
        return `Are you sure you want to delete the stream with title: ${stream.title}`;
    }


    return (
        <Modal
            header="Delete Stream"
            content={renderContent()}
            actions={actions}
            onDismiss={ () => { navigate('/')} }
        />
    )
}

export default connect(
    null,
    {
        fetchStream,
        deleteStream,
    }
)(StreamDelete);