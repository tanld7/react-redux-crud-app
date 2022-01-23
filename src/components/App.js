import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import StreamCreate from "./streams/StreamCreate";
import StreamDelete from "./streams/StreamDelete";
import StreamEdit from "./streams/StreamEdit";
import StreamList from "./streams/StreamList";
import StreamShow from "./streams/StreamShow";
import StreamDetails from "./streams/StreamDetails";

import Header from "./Header";


const App = () => {
    return (
        <div className="ui container">
            <Router>
                <Header />
                <Routes>
                    <Route path="/"  element={<StreamList />} />
                    <Route path="/streams/new"  element={<StreamCreate />} />
                    <Route path="/streams/edit/:id"  element={<StreamEdit />} />
                    <Route path="/streams/delete/:id"  element={<StreamDelete />} />
                    <Route path="/streams/:id"  element={<StreamShow />} />
                    <Route path="/streams/details" element={<StreamDetails />} />
                </Routes>
            </Router>
        </div>
    )
};

export default App;