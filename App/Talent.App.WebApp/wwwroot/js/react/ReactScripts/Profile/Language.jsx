/* Language section */
import React from 'react';
import Cookies from 'js-cookie';

export default class Language extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showAddSection: false,
            languageData: {
                name: '',
                level: '',
            }
        }
        this.handleChange = this.handleChange.bind(this)
        this.addNewLanguage = this.addNewLanguage.bind(this)
        this.handleEditLanguage = this.handleEditLanguage.bind(this)
        this.handleDeleteLanguage = this.handleDeleteLanguage.bind(this)
        this.renderAdd = this.renderAdd.bind(this)
        this.openAddSection = this.openAddSection.bind(this)
        this.closeAddSection = this.closeAddSection.bind(this)
    }

    openAddSection() {
        this.setState({
            showAddSection: true
        })
    }

    closeAddSection() {
        this.setState({
            showAddSection: false
        })
    }

    handleChange(event) {
        const data = Object.assign({}, this.state.languageData)
        data[event.target.name] = event.target.value
        this.setState({
            languageData: data
        })
    }

    addNewLanguage() {
        const check = Object.values(this.state.languageData).find(value => value.trim() === "")

        if (check == undefined) {
            let data = this.props.languageData.concat(this.state.languageData)
            this.props.updateProfileData({ languages: data })
            this.closeAddSection()
        } else {
            TalentUtil.notification.show("Please enter the language and  its level", "error")
        }
    }

    handleEditLanguage(lang) {
        let data = this.props.languageData.slice()
        data.forEach(function (element) {
            if (element.id === lang.id) {
                element.name = lang.name
                element.level = lang.level
            }
        })
        this.props.updateProfileData({ languages: data })
    }

    handleDeleteLanguage(id) {
        const data = this.props.languageData.filter(lang => lang.id !== id)
        this.props.updateProfileData({ languages: data })
    }

    renderAdd() {
        return (
            <div className="row">
                <div className="ui six wide column">
                    <input
                        type="text"
                        placeholder="Add Language"
                        name="name"
                        value={this.state.languageData.name}
                        onChange={this.handleChange} />
                </div>
                <div className="ui six wide column">
                    <select className="ui right labeled dropdown"
                        placeholder="Language Level"
                        value={this.state.languageData.level}
                        onChange={this.handleChange}
                        name="level">
                        <option value="">Language Level</option>
                        <option key="Basic" value="Basic">Basic</option>
                        <option key="Conversational" value="Conversational">Conversational</option>
                        <option key="Fluent" value="Fluent">Fluent</option>
                        <option key="Native/Bilingual" value="Native/Bilingual">Native/Bilingual</option>
                    </select>
                </div>
                <div className="ui four wide column">
                    <button type="button" className="ui teal button" onClick={this.addNewLanguage}>Add</button>
                    <button type="button" className="ui button" onClick={this.closeAddSection}>Cancel</button>
                </div>
            </div>
        )
    }

    render() {
        const languageList = this.props.languageData
            ? this.props.languageData.map(lang => <LanguageDetail key={lang.id + lang.name} lang={lang} updateLanguage={this.handleEditLanguage} deleteLanguage={this.handleDeleteLanguage} />)
            : null
        return (
            <React.Fragment>
                {this.state.showAddSection ? this.renderAdd() : null}
                <div className="ui sixteen wide column">
                    <table className="ui table">
                        <thead>
                            <tr>
                                <th className="five wide">Language</th>
                                <th className="four wide">Level</th>
                                <th className="four wide"></th>
                                <th className="three wide">
                                    <button type="button" className="ui teal right floated button" onClick={this.openAddSection}>
                                        <i className="plus small icon" />
                                        Add New
                                    </button>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {languageList}
                        </tbody>
                    </table>
                </div>
            </React.Fragment>
        )
    }
}



class LanguageDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showEditSection: false,
            lang: {
                id: '',
                name: '',
                level: ''
            }
        }

        this.renderEdit = this.renderEdit.bind(this)
        this.renderDisplay = this.renderDisplay.bind(this)
        this.openEditSection = this.openEditSection.bind(this)
        this.closeEditSection = this.closeEditSection.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.updateData = this.updateData.bind(this)
        this.deleteData = this.deleteData.bind(this)
    }

    handleChange(event) {
        const data = Object.assign({}, this.state.lang)
        data[event.target.name] = event.target.value
        this.setState({ lang: data })
    }

    openEditSection() {
        const lang = {}
        lang.id = this.props.lang.id
        lang.name = this.props.lang.name
        lang.level = this.props.lang.level
        this.setState({ showEditSection: true, lang })
    }

    closeEditSection() {
        this.setState({ showEditSection: false })
    }

    updateData() {
        const check = Object.values(this.state.lang).find(value => value.trim() === "")

        if (check === undefined) {
            this.props.updateLanguage(this.state.lang)
            this.closeEditSection()
        } else {
            TalentUtil.notification.show("Please enter language and level", "error")
        }

    }

    deleteData() {
        this.props.deleteLanguage(this.props.lang.id)
        console.log("id", this.props.lang.id);
    }

    renderDisplay() {
        const { lang } = this.props
        return (
            <tr>
                <td>{lang.name}</td>
                <td>{lang.level}</td>
                <td></td>
                <td className="right aligned">
                    <i className="write icon" onClick={this.openEditSection} />
                    <i className="close icon" onClick={this.deleteData} />
                </td>
            </tr>
        )
    }

    renderEdit() {
        const { lang } = this.state
        return (
            <tr>
                <td>
                    <input
                        type="text"
                        placeholder="Add Language"
                        name="name"
                        value={lang.name}
                        onChange={this.handleChange}
                    />
                </td>
                <td>
                    <select className="ui right labeled dropdown"
                        placeholder="Language Level"
                        value={lang.level}
                        onChange={this.handleChange}
                        name="level">
                        <option value="">Language Level</option>
                        <option key="Basic" value="Basic">Basic</option>
                        <option key="Conversational" value="Conversational">Conversational</option>
                        <option key="Fluent" value="Fluent">Fluent</option>
                        <option key="Native/Bilingual" value="Native/Bilingual">Native/Bilingual</option>
                    </select>
                </td>
                <td>
                    <button type="button" className="ui blue basic button" onClick={this.updateData}>Update</button>
                    <button type="button" className="ui red basic button" onClick={this.closeEditSection}>Cancel</button>
                </td>
                <td></td>
            </tr>
        )
    }

    render() {
        return (
            this.state.showEditSection ? this.renderEdit() : this.renderDisplay()
        )
    }
}
