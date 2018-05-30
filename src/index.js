import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory} from 'react-router';
import {firebaseApp} from './firebase';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {logUser} from "./actions";
import reducer from './reducers';

import App from './componets/App';
import SignIn from './componets/SignIn';
import SignUp from './componets/SignUp';

const store = createStore(reducer);

firebaseApp.auth().onAuthStateChanged(user => {
    if (user) {
        // console.log('user has signed in or up', user);
        const {email} = user;
        store.dispatch(logUser(email));
        browserHistory.push('/app');
    } else {
        // console.log('user has signed out or still needs to sign in');
        browserHistory.push('/signin');
    }
})


ReactDOM.render(
    <Provider store={store}>
        <Router path="/" history={browserHistory}>
            <Route path="/app" component={App}/>
            <Route path="/signin" component={SignIn}/>
            <Route path="/signup" component={SignUp}/>
        </Router>
    </Provider>, document.getElementById('root')
)