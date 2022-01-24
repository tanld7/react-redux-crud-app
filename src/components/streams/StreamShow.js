import React, {useEffect, useRef} from 'react'
import { connect, useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import flv from 'flv.js';

import { fetchStream } from "../../actions";



const StreamShow = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const stream = useSelector((state) => state.streams[id])
    const videoRef = useRef();

    // Initialize player object with the id
    const player = flv.createPlayer({
        type: 'flv',
        url: `http://localhost:8000/live/${id}.flv`
    })

    useEffect(() => {
        console.log(videoRef)
        console.log(player)
        console.log(id)

        if (!stream) {
            dispatch(fetchStream(id));
        }

        // Attempt to build player
        buildPlayer()
    }, [player])

    const buildPlayer = () => {
        // If we already have the player (built before) or the stream object is not ready,
        // we're not gonna attach the video to component.
        if (player || !stream) {
            return;
        }
        player.attachMediaElement(videoRef.current);
        player.load();
        player.play();
    }

    if(!stream) {
        return <div>Loading ...</div>
    }

    return (
        <div>
            <video ref={videoRef} style={{width: '100%'}} controls={true} />
            <h1>{stream.title}</h1>
            <h5>{stream.description}</h5>
        </div>
    )
}

export default connect(
    null,
    { fetchStream }
)(StreamShow);