import React from 'react';
import '../../App.css';
import * as actions from '../../redux/actions';
import { connect } from 'react-redux';
class Edit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            sex: '',
            age: '',
            password: '',
            originPassword: ''
        }
    }

    componentDidMount() {
        var id = this.props.match.params.userId;
        this.props.getCurUser(id, () => {
            this.setState({
                firstname: this.props.user.data.firstName,
                lastname: this.props.user.data.lastName,
                sex: this.props.user.data.sex,
                age: this.props.user.data.age,
                originPassword: this.props.user.data.password
            })
        });
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

    handleSubmit = e => {
        e.preventDefault();
        var user = {
            firstName: this.state.firstname,
            lastName: this.state.lastname,
            age: this.state.age,
            sex: this.state.sex,
            id: this.props.match.params.userId
        }
        this.props.editUser(user);
        this.setState({
            firstname: '',
            lastname: '',
            sex: '',
            age: '',
            password: '',
        });
    }

    render() {
        let regex = /^[A-Z][a-z]+$/;
        const { firstname, lastname, age, sex, password, originPassword } = this.state;
        const disabled = firstname === '' 
            || lastname === '' 
            || age === '' 
            || sex === '' 
            || password === '' 
            || password !== originPassword
            || !regex.test(firstname)
            || !regex.test(lastname);
        return (
            <div className="container">
                <h1>Edit User</h1>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>First Name:</label>
                        <input 
                            type="text" 
                            name="firstname" 
                            onChange={this.handleFirstName}
                            value={firstname}  
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
                            value={lastname}
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
                            value={age}
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
                         <p style={
                                {display:(password===originPassword || password==='') 
                                ? 
                                "none" : "inline", color: "red"}
                                }
                            >Password doesn't match</p>
                    </div>
                    <br/>
                    <br/>
                    <input className="submit" type="submit" value="Submit" disabled={disabled} />
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        users: state.users
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        editUser: user => {
            dispatch(actions.getEditUser(user, ownProps));
        },
        getCurUser:(user, callback) => {
            dispatch(actions.getUser(user, callback));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Edit);