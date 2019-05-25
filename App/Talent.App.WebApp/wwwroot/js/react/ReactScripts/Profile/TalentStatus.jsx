import React from 'react';
import { Form, Checkbox } from 'semantic-ui-react';
import moment from 'moment';
import { SingleInput } from '../Form/SingleInput.jsx';

export default class TalentStatus extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this)
        this.saveData = this.saveData.bind(this)
     
    }

    handleChange(event) {
        const data = Object.assign({}, this.props.status)
        data[event.target.name] = event.target.value
        this.props.updateProfileData({ jobSeekingStatus: data })
        this.props.saveProfileData({ jobSeekingStatus: data })
        console.log("status",data);
    }

    saveData() {
        const data = Object.assign({}, this.props.status)
        this.props.saveProfileData({ jobSeekingStatus: data })
    }

   

    render() {
        const jobSeeking = [
            { value: 'actively looking', label: 'Actively looking for a job' },
            { value: 'not looking', label: 'Not looking for a job at the moment' },
            { value: 'currently employed', label: 'Currently employed but open to offers' },
            { value: 'available later', label: 'Will be available on later date' }
        ]
        
        const checked = this.props.status ? this.props.status.status : ''
       

        return (
            <div className="ui sixteen wide column">
                <h4>Current Status</h4>
                {jobSeeking.map(status => <StatusOption key={status.value} value={status.value} label={status.label} onSelected={this.handleChange} selected={checked} />)}
          
            </div>
        )
    }
}

class StatusOption extends React.Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        this.props.onSelected(event)
    }

    render() {
        const { value, label, selected } = this.props
        const checked = (value == selected) ? true : false
        return (
            <div className="field">
                <div className="ui radio checkbox">
                    <input type="radio"
                        name="status"
                        value={value}
                        onChange={this.handleChange}
                        checked={checked}
                    />
                    <label>{label}</label>
                </div>
            </div>
        )
    }
}