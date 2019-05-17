/* Social media JSX */
import React from 'react';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import { Popup } from 'semantic-ui-react';

export default class SocialMediaLinkedAccount 
    extends React.Component {
    constructor(props) {
        super(props);

        const linkedAccounts = this.props.linkedAccounts ?
            Object.assign({}, this.props.linkedAccounts)
            : {
                LinkedIn: "",
                github: "",
            }

        this.state = {
            showEditSection: false,
            newAccounts: linkedAccounts
        }

        this.openEdit = this.openEdit.bind(this);
        this.closeEdit = this.closeEdit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.savelinkedAccounts = this.savelinkedAccounts.bind(this);
    }

    openEdit() {
        const linkedAccounts = Object.assign({}, this.props.linkedAccounts)
        this.setState({
            showEditSection: true,
            newAccounts: linkedAccounts
        })
    }

   

    handleChange(event) {
        const data = Object.assign({}, this.state.newAccounts)
        data[event.target.name] = event.target.value
        this.setState({
            newAccounts: data
        })
     
    }

    savelinkedAccounts() {
        const profileData = {}
        profileData.linkedAccounts = Object.assign({}, this.state.newAccounts)
        this.props.saveProfileData(profileData)
        this.closeEdit()
    }

    closeEdit() {
        this.setState({
            showEditSection: false
        })
    }

    componentDidMount() {
    }

    render() {
        return (
            this.state.showEditSection ? this.renderEdit() : this.renderDisplay()
        )
    }

    renderDisplay() {
        return (
            <div className='row'>
                <div className="ui sixteen wide column">
                    <button className="ui linkedin button">
                        <i className="linkedin icon"></i>
                        LinkedIn
                </button>
                    <button type="button" className="ui secondary button">
                        <i className="github icon" ></i>
                        Github
                </button>
                    <button type="button" className="ui right floated teal button" onClick={this.openEdit}>Edit</button>
                </div>
            </div>
        )
    }

    renderEdit() {
        return (
            <div className='ui sixteen wide column'>
                <ChildSingleInput
                    inputType="text"
                    label="linkedIn"
                    name="linkedIn"
                    value={this.state.newAccounts.linkedIn}
                    controlFunc={this.handleChange}
                    maxLength={80}
                    placeholder="Enter your linkedIn Url"
                    errorMessage="Please enter a valid Url"
                />
                <ChildSingleInput
                    inputType="text"
                    label="Github"
                    name="github"
                    value={this.state.newAccounts.github}
                    controlFunc={this.handleChange}
                    maxLength={80}
                    placeholder="Enter your Github Url"
                    errorMessage="Please enter a valid Url"
                />
                <button type="button" className="ui teal button" onClick={this.savelinkedAccounts}>Save</button>
                <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button>
            </div>
        )
    }

}