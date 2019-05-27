/* Skill section */
import React from 'react';
import Cookies from 'js-cookie';

export default class Skill extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showAddSection: false,
            skillData: {
                name: '',
                level: ''
            }
        }

        this.handleChange = this.handleChange.bind(this)

        this.addNewSkill = this.addNewSkill.bind(this)

        this.handleUpdateSkill = this.handleUpdateSkill.bind(this)
        this.handleDeleteSkill = this.handleDeleteSkill.bind(this)

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
        const data = Object.assign({}, this.state.skillData)
        data[event.target.name] = event.target.value
        this.setState({ skillData: data })
    }

    addNewSkill() {
        const data = Object.values(this.state.skillData).find(value => value.trim() === "")

        if (data === undefined) {
            let skills = this.props.skillData.concat(this.state.skillData)
            this.props.updateProfileData({ skills })
            this.closeAddSection()
        } else {
            TalentUtil.notification.show("Please enter skill and level", "error")
        }
    }

    handleUpdateSkill(skill) {
        let data = this.props.skillData.slice()
        data.forEach(function (elem) {
            if (elem.id === skill.id) {
                elem.name = skill.name
                elem.level = skill.level
            }
        })
        this.props.updateProfileData({ skills: data })
    }

    handleDeleteSkill(id) {
        const data = this.props.skillData.filter(skill => skill.id !== id)
        this.props.updateProfileData({ skills: data })
    }

    renderAdd() {
        return (
            <div className="row">
                <div className="ui five wide column">
                    <input
                        type="text"
                        placeholder="Add Skill"
                        name="name"
                        value={this.state.skillData.name}
                        onChange={this.handleChange} />
                </div>
                <div className="ui five wide column">
                    <select className="ui right labeled dropdown"
                        placeholder="Skill Level"
                        value={this.state.skillData.level}
                        onChange={this.handleChange}
                        name="level">
                        <option value="">Skill Level</option>
                        <option key="Beginner" value="Beginner">Beginner</option>
                        <option key="Intermediate" value="Intermediate">Intermediate</option>
                        <option key="Expert" value="Expert">Expert</option>
                    </select>
                </div>
                <div className="ui six wide column">
                    <button type="button" className="ui teal button" onClick={this.addNewSkill}>Add</button>
                    <button type="button" className="ui button" onClick={this.closeAddSection}>Cancel</button>
                </div>
            </div>
        )
    }

    render() {
        const skillList = this.props.skillData
            ? this.props.skillData.map(skill => <SkillDetail key={skill.id + skill.name} skill={skill} updateSkill={this.handleUpdateSkill} deleteSkill={this.handleDeleteSkill} />)
            : null
        return (
            <React.Fragment>
                {this.state.showAddSection ? this.renderAdd() : null}
                <div className="ui sixteen wide column">
                    <table className="ui table">
                        <thead>
                            <tr>
                                <th className="five wide">Skill</th>
                                <th className="four wide">Level</th>
                                <th className="four wide"></th>
                                <th className="three wide">
                                    <button type="button" className="ui teal right floated button" onClick={this.openAddSection}>
                                        <i className="plus icon" />Add New
                               </button>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {skillList}
                        </tbody>
                    </table>
                </div>
            </React.Fragment>
        )
    }
}

class SkillDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showEditSection: false,
            skill: {}
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
        const data = Object.assign({}, this.state.skill)
        data[event.target.name] = event.target.value
        this.setState({ skill: data })
    }

    openEdit() {
        let skill = {}
        skill.id = this.props.skill.id,
        skill.name = this.props.skill.name,
        skill.level = this.props.skill.level
       
        this.setState({ showEditSection: true, skill:skill })
    }

    closeEdit() {
        this.setState({ showEditSection: false })
    }

    updateData() {
   
        if (this.state.skill.name != ""  && this.state.skill.level !="") {
            this.props.updateSkill(this.state.skill)
            this.closeEdit()
        } else {
            TalentUtil.notification.show("Please enter skill and level", "error")
        }
    }

    deleteData() {
        this.props.deleteSkill(this.props.skill.id)
    }

    renderDisplay() {
        const { skill } = this.props
        return (
            <tr>
                <td>{skill.name}</td>
                <td>{skill.level}</td>
                <td></td>
                <td className="right aligned">
                    <i className="write icon" onClick={this.openEdit} />
                    <i className="close icon" onClick={this.deleteData} />
                </td>
            </tr>
        )
    }

    renderEdit() {
        const { skill } = this.state
        return (
            <tr>
                <td>
                    <input
                        type="text"
                        placeholder="Add Skill"
                        name="name"
                        value={skill.name}
                        onChange={this.handleChange}
                    />
                </td>
                <td>
                    <select className="ui right labeled dropdown"
                        placeholder="Skill Level"
                        value={skill.level}
                        onChange={this.handleChange}
                        name="level">
                        <option value="">Skill Level</option>
                        <option key="Beginner" value="Beginner">Beginner</option>
                        <option key="Intermediate" value="Intermediate">Intermediate</option>
                        <option key="Expert" value="Expert">Expert</option>
                    </select>
                </td>
                <td>
                    <button type="button" className="ui blue basic button" onClick={this.updateData}>Update</button>
                    <button type="button" className="ui red basic button" onClick={this.closeEdit}>Cancel</button>
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