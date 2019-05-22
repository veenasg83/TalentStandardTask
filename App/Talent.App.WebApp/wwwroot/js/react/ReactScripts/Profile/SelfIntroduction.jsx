/* Self introduction section */
import React, { Component } from 'react';
import Cookies from 'js-cookie'
import { ChildSingleInput } from '../Form/SingleInput.jsx';

export default class SelfIntroduction extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.save = this.save.bind(this);
    
    };

    
    handleChange(event) {
        let data = {}
        data[event.target.name] = event.target.value;
        this.props.updateProfileData(data);
    }

    save() {
        let data = {}
        data.summary = this.props.summary;
        data.description = this.props.description;
        console.log("save",data);
        this.props.saveProfileData(data);
    }


    render() {
        const summary = this.props.summary ? this.props.summary : ''
        const description = this.props.description ? this.props.description : ''

        return (
            <div className='ui sixteen wide column'>
                <ChildSingleInput
                    inputType="text"
                    name = "summary"                    
                    value={summary}
                    controlFunc={this.handleChange}
                    maxLength={150}
                    placeholder="Please provide a short summary about yourself"
                    errorMessage="Please  provide valid text."
                />
                <p>Summary must be no more than 150 characters</p>
                <textarea
                    
                    name="description"
                    value={description}
                    onChange={this.handleChange}
                    maxLength={600}
                    placeholder="Please tell us about any hobbies,additional expertise, or anything else you'd like to add."
                    
                />
                <p>Description must be between 150-600 characters</p>
                <button type="button" className="ui right floated teal button" onClick={this.save}>Save</button>    
            </div>
        )
    }
}



