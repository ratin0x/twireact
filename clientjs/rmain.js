/**
 * Created by rat on 18/07/17.
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import RaisedButton from 'material-ui/RaisedButton';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import {GridList, GridTile} from 'material-ui/GridList';
import FontIcon from 'material-ui/FontIcon';
import * as Colors from 'material-ui/styles/colors';


class App extends Component {
    constructor() {
        super();
        this.state = {
            selectedUser: [],
            userFriends: [],
            circleList: [],
            userName: '',
            rateExceeded: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.clickCircleButton = this.clickCircleButton.bind(this);
        this.clickShowCircleButton = this.clickShowCircleButton.bind(this);

        this.clickTile = this.clickTile.bind(this);

    }

    handleChange(event) {
        this.setState( {userName: event.target.value} );
    }

    handleSubmit(event) {
        event.preventDefault();

        fetch('/tw/searchUser',
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({name: this.state.userName})
            }).then( res => {
            res.json().then(
                res => {
                    console.log(res);
                    // const gotUser = res.map( function ( user ) {
                    //     console.log(user);
                    //     return user;
                    // });
                    this.setState({selectedUser: res, rateExceeded: false});
                }
            );
        }, function (error) {
            console.log(error);
            this.setState({rateExceeded: true});
        });

        // alert('Submitted : ' + this.props.userName );
    }

    clickCircleButton() {
        console.log('Click');

        fetch('/tw/circle',
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({name: this.state.userName})
            }).then( res => {
            res.json().then(
                res => {
                    console.log(res);
                }
            );
        }, function (error) {
            console.log(error);
            this.setState({rateExceeded: true});
        });

    }

    clickShowCircleButton() {
        console.log('Show');

        fetch('/tw/showCircle',
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({name: this.state.userName})
            }).then( res => {
            res.json().then(
                res => {
                    console.log(res);
                    this.setState({circleList: res.circle});
                }
            );
        }, function (error) {
            console.log(error);
            this.setState({rateExceeded: true});
        });

    }

    clickTile(event) {
        event.preventDefault();
        window.open( event.target.value);
    }

    
    render() {
        if ( this.state.rateExceeded === false ) {
            return (
                <MuiThemeProvider>
                    <BrowserRouter>
                        <div className="app">
                            <h1>Appp</h1>
                            <TargetInput handleSubmit={this.handleSubmit} handleChange={this.handleChange}
                                         clickCircleButton={this.clickCircleButton} clickShowCircleButton={this.clickShowCircleButton} selectedUser={this.state.selectedUser}
                                         userName={this.state.userName}/>
                            <CircleList circleList={this.state.circleList} clickTile={this.clickTile }/>
                        </div>
                    </BrowserRouter>
                </MuiThemeProvider>
            );
        } else {
            return (
                <MuiThemeProvider>
                    <BrowserRouter>
                        <div className="app">
                            <h1>Appp</h1>
                            <span>Rate limit exceeded</span>
                            <TargetInput handleSubmit={this.handleSubmit} handleChange={this.handleChange}
                                         clickCircleButton={this.clickCircleButton} clickShowCircleButton={this.clickShowCircleButton} selectedUser={this.state.selectedUser}
                                         userName={this.state.userName}/>
                            <CircleList circleList={this.state.circleList} clickTile={this.clickTile }/>
                        </div>
                    </BrowserRouter>
                </MuiThemeProvider>
            );
        }
    }
}

class TargetInput extends Component {
    constructor(props) {
        super(props);
        // this.handleChange = this.handleChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ selectedUser: nextProps.selectedUser, userName: nextProps.userName });
    }

    render() {
        return(
            <div>
                <SelectedUserPanel selectedUser={this.props.selectedUser} userName={this.props.userName}/>
                <form onSubmit={this.props.handleSubmit.bind(this)}>
                    <input type="text" placeholder="username" onChange={this.props.handleChange} />
                    <input type="submit" value="Submit" />
                </form>
                <RaisedButton onClick={this.props.clickCircleButton}>Build Circle</RaisedButton>
                <RaisedButton onClick={this.props.clickShowCircleButton}>Show Circle</RaisedButton>
            </div>
        )
    }
}

class SelectedUserPanel extends Component {

    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ selectedUser: nextProps.selectedUser });
    }


    render() {
        console.log( this.props);
        if ( this.props.selectedUser ) {
            return(
                <div>
                    <Avatar src={this.props.selectedUser.profile_image_url} size={50} />
                    <span>{this.props.selectedUser.screen_name}</span>&nbsp;<span>{this.props.selectedUser.name}</span>
                </div>
            )
        } else {
            return(
                <div>
                    <p>Selected User: {this.props.userName}</p>
                    <p>No Selected User</p>
                </div>
            )
        }
    }

}

class User extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <img src={this.props.imgSrc} />
                <span>{this.props.screenName}</span>&nbsp;<span>{this.props.name}</span>
            </div>
        )
    }

}

class CircleList extends Component {
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ circleList: nextProps.circleList });
    }


    render() {
        return(
            <div>
                <GridList cols={10} cellHeight={150} children={ this.props.circleList.map(
                    (user) => <GridTile subtitle={'@' + user.screen_name} title={user.name} actionIcon={<img src={user.profile_image_url}/>} actionPosition='left'  children={ <a href={user.url}><img src={user.profile_background_image_url} /></a>} /> )}/>
            </div>
        )
    }
}

ReactDOM.render(
<App/>,
    document.getElementById('root')
);