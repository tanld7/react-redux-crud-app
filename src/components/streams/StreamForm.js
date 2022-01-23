import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Navigate } from "react-router-dom";


class StreamForm extends React.Component {

    state = {
        redirectToHomePage: false,
    }

    renderError({ error, touched }) {
        if (touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            )
        }
    }

    renderInput = ({input, label, meta}) => {
        // console.log(meta)

        const className = `field ${meta.error && meta.touched ? 'error' : ''}`
        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input} autoComplete="off" />
                {this.renderError(meta)}
            </div>
        );

    }

    onSubmit = (formValues) => {
        // console.log(formValues);

        this.props.onSubmit(formValues);
        this.setState({redirectToHomePage: true})
    }

    render() {
        // If form is submit, programmatically redirect/navigate user to StreamList (/)
        if(this.state.redirectToHomePage) {
            return (
                <Navigate to="/" />
            )
        }

        return (
            <form
                onSubmit={this.props.handleSubmit(this.onSubmit)}
                className="ui form error"
            >
                <Field name="title" component={this.renderInput} label="Stream Title"/>
                <Field name="description" component={this.renderInput} label="Stream Description"/>
                <button className="ui button primary">Submit</button>
            </form>
        )
    }
}

const validate = (formValues) => {
    const errors = {}

    if (!formValues.title) {
        errors.title = 'You must enter a title';
    }

    if (!formValues.description) {
        errors.description = 'You must enter a description';
    }

    return errors;
}

export default reduxForm({
    form: 'streamForm',
    validate: validate,
})(StreamForm);

