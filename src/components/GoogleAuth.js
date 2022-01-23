import React from 'react'
import {connect} from "react-redux";
import {signIn, signOut} from "../actions";

class GoogleAuth extends React.Component {
    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '875774043463-9b5idf5s380i836ggnour01hqikv8k4o.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance(); // get the gapi initialized object.
                this.onAuthChange(this.auth.isSignedIn.get()); // get the current signIn/signOut of user from gapi object
                this.auth.isSignedIn.listen(this.onAuthChange); // listen to changes in the future
            });
        });
    }

    onAuthChange = (isSignedIn) => {
        if (isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId());
        } else {
            this.props.signOut();
        }
    }

    // we don't have to create two signIn and signOut helper method,
    // I just want to make it more clear for readers
    //
    onSignInClick = () => {
        this.auth.signIn();
    }

    onSignOutClick = () => {
        this.auth.signOut();
    }


    renderAuthButton() {
        if (this.props.isSignedIn === null) {
            return null;
        } else if (this.props.isSignedIn) {
            return (
                <button onClick={this.onSignOutClick} className="ui red google button">
                    <i className="google icon" />
                    Sign Out
                </button>
            )
        } else {
            return (
              <button onClick={this.onSignInClick} className="ui red google button">
                  <i className="google icon"/>
                  Sign In with Google
              </button>
            );
        }
    }


    render() {
        return (
            <div>{this.renderAuthButton()}</div>
        )
    }
}

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn };
}

export default connect(
    mapStateToProps ,
    {signIn, signOut}
)(GoogleAuth);