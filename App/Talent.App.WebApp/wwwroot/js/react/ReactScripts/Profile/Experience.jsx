/* Experience section */
import React from 'react';
import Cookies from 'js-cookie';
import moment from 'moment';
import { ChildSingleInput, SingleInput } from '../Form/SingleInput.jsx';

export default class Experience extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showAddSection: false,
            experienceData: {
                company: '',
                position: '',
                responsibilities: '',
                start: moment(new Date()).format("YYYY-MM-DD"),
                end: moment(new Date()).format("YYYY-MM-DD")
            }
        }
        this.handleChange = this.handleChange.bind(this)

        this.addNewExperience = this.addNewExperience.bind(this)

        this.handleUpdateExperience = this.handleUpdateExperience.bind(this)
        this.handleDeleteExperience = this.handleDeleteExperience.bind(this)

        this.renderAdd = this.renderAdd.bind(this)

        this.openAddSection = this.openAddSection.bind(this)
        this.closeAddSection = this.closeAddSection.bind(this)
    }

    openAddSection() {
        this.setState({ showAddSection: true })
    }

    closeAddSection() {
        this.setState({ showAddSection: false })
    }

    handleChange(event) {
        const data = Object.assign({}, this.state.experienceData)
        data[event.target.name] = event.target.value
        this.setState({ experienceData: data })
    }

    addNewExperience() {
        const found = Object.values(this.state.experienceData).find(value => value.trim() === "")

        if (found === undefined) {
            let data = this.props.experienceData.concat(this.state.experienceData)
            this.props.updateProfileData({ experience: data })
            this.closeAddSection()
        } else {
            TalentUtil.notification.show("Please enter valid work experience data", "error")
        }
    }

    handleUpdateExperience(exp) {
        let data = this.props.experienceData.slice()
        data.forEach(function (element) {
            if (element.id === exp.id) {
                element.company = exp.company
                element.position = exp.position
                element.responsibilities = exp.responsibilities
                element.start = exp.start
                element.end = exp.end
            }
        })
        this.props.updateProfileData({ experience: data })
    }

    handleDeleteExperience(id) {
        const data = this.props.experienceData.filter(exp => exp.id !== id)
        this.props.updateProfileData({ experience: data })
    }

    renderAdd() {
        const { experienceData } = this.state
        return (
            <div className="ui sixteen wide column">
                <div className="fields">
                    <div className="eight wide field">
                        <ChildSingleInput
                            inputType="text"
                            label="Company:"
                            name="company"
                            value={experienceData.company}
                            controlFunc={this.handleChange}
                            maxLength={80}
                            placeholder="Company"
                            errorMessage="Please enter a valid company name"
                        />
                    </div>
                    <div className="eight wide field">
                        <ChildSingleInput
                            inputType="text"
                            label="Position:"
                            name="position"
                            value={experienceData.position}
                            controlFunc={this.handleChange}
                            maxLength={80}
                            placeholder="Position"
                            errorMessage="Please enter a valid position"
                        />
                    </div>
                </div>
                <div className="fields">
                    <div className="eight wide field">
                        <div className="field">
                            <label>Start Date:</label>
                            <SingleInput
                                inputType="date"
                                name="start"
                                controlFunc={this.handleChange}
                                isError={false}
                                content={experienceData.start}
                                errorMessage="Please enter a valid start date"
                            />
                        </div>
                    </div>
                    <div className="eight wide field">
                        <div className="field">
                            <label>End Date:</label>
                            <SingleInput
                                inputType="date"
                                name="end"
                                controlFunc={this.handleChange}
                                isError={false}
                                content={experienceData.end}
                                errorMessage="Please enter a valid end date"
                            />
                        </div>
                    </div>
                </div>
                <div className="sixteen wide field">
                    <ChildSingleInput
                        inputType="text"
                        label="Responsibilities:"
                        name="responsibilities"
                        value={experienceData.responsibilities}
                        controlFunc={this.handleChange}
                        maxLength={80}
                        placeholder="Responsibilities"
                        errorMessage="Please enter a valid responsibilities"
                    />
                </div>
                <div className="eight wide field">
                    <button type="button" className="ui teal button" onClick={this.addNewExperience}>Add</button>
                    <button type="button" className="ui button" onClick={this.closeAddSection}>Cancel</button>
                </div>
            </div>

        )
    }

    render() {
        const experienceList = this.props.experienceData
            ? this.props.experienceData.map(exp => <ExperienceDetail key={exp.start} exp={exp} updateExperience={this.handleUpdateExperience} deleteExperience={this.handleDeleteExperience} />)
            : null
        return (
            <React.Fragment>
                {this.state.showAddSection ? this.renderAdd() : null}
                <div className="ui sixteen wide column">
                    <table className="ui table">
                        <thead>
                            <tr>
                                <th className="two wide">Company</th>
                                <th className="two wide">Position</th>
                                <th className="three wide">Responsibilities</th>
                                <th className="three wide">Start</th>
                                <th className="three wide">End</th>
                                <th className="two wide">
                                    <button type="button" className="ui teal right button" onClick={this.openAddSection}>
                                        <i className="plus small icon" />Add New
                                    </button>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {experienceList}
                        </tbody>
                    </table>
                </div>
            </React.Fragment>
        )
    }
}



class ExperienceDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showEditSection: false,
            exp: {}
        }
        this.handleChange = this.handleChange.bind(this)

        this.renderEdit = this.renderEdit.bind(this)
        this.renderDisplay = this.renderDisplay.bind(this)

        this.openEdit = this.openEdit.bind(this)
        this.closeEdit = this.closeEdit.bind(this)

        this.updateData = this.updateData.bind(this)
        this.deleteData = this.deleteData.bind(this)
    }

    handleChange(event) {
        const data = Object.assign({}, this.state.exp)
        data[event.target.name] = event.target.value
        this.setState({ exp: data })
    }

    openEdit() {
        let exp = Object.assign({}, this.props.exp)
        exp.start = moment(exp.start).format("YYYY-MM-DD")
        exp.end = moment(exp.end).format("YYYY-MM-DD")
        this.setState({ showEditSection: true, exp })
    }

    closeEdit() {
        this.setState({ showEditSection: false })
    }

    updateData() {
        const found = Object.values(this.state.exp).find(value => value.trim() === "")

        if (found === undefined) {
            this.props.updateExperience(this.state.exp)
            this.closeEdit()
        } else {
            TalentUtil.notification.show("Please enter valid work experience data", "error")
        }
    }

    deleteData() {
        this.props.deleteExperience(this.props.exp.id)
    }

    renderDisplay() {
        const { exp } = this.props
        return (
            <tr>
                <td>{exp.company}</td>
                <td>{exp.position}</td>
                <td>{exp.responsibilities}</td>
                <td>{moment(exp.start).format("Do MMM, YYYY")}</td>
                <td>{moment(exp.end).format("Do MMM, YYYY")}</td>
                <td className="right aligned">
                    <i className="write icon" onClick={this.openEdit} />
                    <i className="close icon" onClick={this.deleteData} />
                </td>
            </tr>
        )
    }

    renderEdit() {
        const { exp } = this.state
        return (
            <tr>
                <td colSpan="6">
                    <div className="ui sixteen wide column">
                        <div className="fields">
                            <div className="eight wide field">
                                <ChildSingleInput
                                    inputType="text"
                                    label="Company:"
                                    name="company"
                                    value={exp.company}
                                    controlFunc={this.handleChange}
                                    maxLength={80}
                                    placeholder="Company"
                                    errorMessage="Please enter a valid company name"
                                />
                            </div>
                            <div className="eight wide field">
                                <ChildSingleInput
                                    inputType="text"
                                    label="Position:"
                                    name="position"
                                    value={exp.position}
                                    controlFunc={this.handleChange}
                                    maxLength={80}
                                    placeholder="Position"
                                    errorMessage="Please enter a valid position"
                                />
                            </div>
                        </div>
                        <div className="fields">
                            <div className="eight wide field">
                                <div className="field">
                                    <label>Start Date:</label>
                                    <SingleInput
                                        inputType="date"
                                        name="start"
                                        controlFunc={this.handleChange}
                                        isError={false}
                                        content={exp.start}
                                        errorMessage="Please enter a valid start date"
                                    />
                                </div>
                            </div>
                            <div className="eight wide field">
                                <div className="field">
                                    <label>End Date:</label>
                                    <SingleInput
                                        inputType="date"
                                        name="end"
                                        controlFunc={this.handleChange}
                                        isError={false}
                                        content={exp.end}
                                        errorMessage="Please enter a valid end date"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="sixteen wide field">
                            <ChildSingleInput
                                inputType="text"
                                label="Responsibilities:"
                                name="responsibilities"
                                value={exp.responsibilities}
                                controlFunc={this.handleChange}
                                maxLength={80}
                                placeholder="Responsibilities"
                                errorMessage="Please enter a valid responsibilities"
                            />
                        </div>
                        <div className="eight wide field">
                            <button type="button" className="ui teal button" onClick={this.updateData}>Update</button>
                            <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button>
                        </div>
                    </div>
                </td>
            </tr>
        )
    }

    render() {
        return (
            this.state.showEditSection ? this.renderEdit() : this.renderDisplay()
        )
    }
}