import React from 'react';
import '../../App.css';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';

class Add extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            sex: 'Male',
            age: '',
            password: '',
            repeat: ''
        }
    }

    handleFirstName = e => {
        this.setState({firstname: e.target.value});
    }

    handleLastName = e => {
        this.setState({lastname: e.target.value});
    }

    handleSex = e => {
        this.setState({sex: e.target.value});
    }

    handleAge = e => {
        this.setState({age: e.target.value});
    }

    handlePassword = e => {
        this.setState({password: e.target.value});
    }

    handleRepeat = e => {
        this.setState({repeat: e.target.value});
    }

    handleSubmit = e => {
        e.preventDefault();
        var data = {
            firstName: this.state.firstname,
            lastName: this.state.lastname,
            age: this.state.age,
            sex: this.state.sex,
            password: this.state.password
        }
        this.props.addUser(data);
        this.setState({
            firstname: '',
            lastname: '',
            sex: '',
            age: '',
            password: '',
            repeat: ''
        });
    }

    render() {
        let regex = /^[A-Z][a-z]+$/;
        const { firstname, 
                lastname, 
                age, 
                sex, 
                password, 
                repeat} = this.state;
        const disabled = firstname === '' 
                        || lastname === '' 
                        || age === '' 
                        || sex === '' 
                        || password === '' 
                        || repeat === '' 
                        || password !== repeat
                        || !regex.test(firstname)
                        || !regex.test(lastname);

        return (
            <div className="container">
                <h1>Create New User</h1>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>First Name:</label>
                        <input 
                            type="text" 
                            name="firstname" 
                            onChange={this.handleFirstName}  
                        />
                        <p style={
                            {display:(regex.test(firstname) || firstname==='') 
                            ? 
                            "none" : "inline", color: "red"}
                            }
                        >Incorrect form of first name</p>
                    </div>
                    <br/>
                    <div>
                        <label>Last Name:</label>
                        <input 
                            type="text"
                            name="lastname"
                            onChange={this.handleLastName}
                        />
                        <p style={
                            {display:(regex.test(lastname) || lastname==='') 
                            ? 
                            "none" : "inline", color: "red"}
                            }
                        >Incorrect form of last name</p>
                    </div>
                    <br/>
                    <div>
                        <label>Age:</label>
                        <input 
                            type="number" 
                            name="age" 
                            onChange={this.handleAge} 
                        />
                    </div>
                    <br/>
                    <div>
                        <label>Sex:</label>
                        <select value={this.state.sex} onChange={this.handleSex}>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                    <br/>
                    <div>
                        <label>Password:</label> 
                        <input 
                            type="password" 
                            name="password" 
                            onChange={this.handlePassword} 
                        />
                    </div>
                    <br/>
                    <div>
                        <label>Repeat:</label> 
                        <input 
                            type="password" 
                            name="repeat" 
                            onChange={this.handleRepeat} 
                        />
                        <p style={
                            {display:(password===repeat || password==='' || repeat==='') 
                            ? 
                            "none" : "inline", color: "red"}
                            }
                        >Password doesn't match</p>
                    </div>
                    <br/>
                    <input type="submit" value="Submit" disabled={disabled} />
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        data: state.users
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        addUser: user => {
            dispatch(actions.getAddUser(user, ownProps))
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Add);