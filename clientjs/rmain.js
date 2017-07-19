/**
 * Created by rat on 18/07/17.
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';


class App extends Component {
    constructor() {
        super();
        this.state = {
            selectedUser: [],
            userFriends: [],
            userCircle: [],
            userName: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.clickCircleButton = this.clickCircleButton.bind(this);

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
                    this.setState({selectedUser: res});
                }
            );
        }, function (error) {
            console.log(error);
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
        });

    }

    
    render() {
        return(
            <div className="app">
                <h1>Appp</h1>
                <TargetInput handleSubmit={this.handleSubmit} handleChange={this.handleChange} clickCircleButton={this.clickCircleButton} selectedUser={this.state.selectedUser} userName={this.state.userName}/>
            </div>
        );
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
                <button onClick={this.props.clickCircleButton} userName={this.props.userName}>Get Circle</button>
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
                    <User key={this.props.selectedUser.id} screenName={this.props.selectedUser.screen_name} name={this.props.selectedUser.name} imgSrc={this.props.selectedUser.profile_image_url} />
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

ReactDOM.render(
<App/>,
    document.getElementById('root')
);