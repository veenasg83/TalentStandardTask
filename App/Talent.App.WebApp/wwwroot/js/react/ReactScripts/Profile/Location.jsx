import React from 'react'
import Cookies from 'js-cookie'
import { default as Countries } from '../../../../util/jsonFiles/countries.json';
import { ChildSingleInput } from '../Form/SingleInput.jsx';

export class Address extends React.Component {
    constructor(props) {
        super(props)
        const address = this.props.addressData ?
            Object.assign({}, this.props.addressData)
            : {
                number: "",
                street: "",
                suburb: "",
                city: "",
                country: "",
                postCode:""
            }
        console.log(address)
        this.state = ({
            showEditField: false,
            editedAddress: address
        })

        this.openEdit = this.openEdit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.saveAddress = this.saveAddress.bind(this);
        this.closeEdit = this.closeEdit.bind(this);
    }

    openEdit() {
        const address = Object.assign({}, this.props.addressData)
        this.setState({
            showEditField: true,
            editedAddress: address
        })

    }

    handleChange(event) {
        const data = Object.assign({}, this.state.editedAddress)
        data[event.target.name] = event.target.value;
        this.setState({
            editedAddress: data
        })
        this.props.updateProfileData(data);
    }

    saveAddress() {
        const data = {}
        data.address = Object.assign({}, this.state.editedAddress)       
        this.props.saveProfileData(data);
        this.closeEdit();
    }

    closeEdit() {
        this.setState({
            showEditField:false
        })
    }

    

   
    render() {       
        return (
            this.state.showEditField ? this.renderEdit() : this.renderDisplay()
        )
       
    }

    renderDisplay() {
        const { number, street, suburb, city, country, postCode } = this.props.addressData
        return (
            <div className='row'>
                <div className='ui sixteen wide column'>
                    <p> Address: {number || street || suburb || postCode ? `${number}, ${street}, ${suburb}, ${postCode}` : ""}</p>
                    <p>City: {city}</p>
                    <p>Country:{country}</p>
                    <button type="button" className="ui right floated teal button" onClick={this.openEdit}>Edit</button>
                </div>
                </div>
            
            )
    }

    renderEdit() {
        let countryOptions = [];
        let cityOptions = [];
        const selectedCountry = this.state.editedAddress.country;
        const selectedCity = this.state.editedAddress.city;
       
        countryOptions = Object.keys(Countries).map((x) => <option key={x} value={x}>{x}</option>);

        if ( selectedCountry != null && selectedCountry != "") {
            let Cities = Countries[selectedCountry]
            
            cityOptions = (Cities).map((x) => <option key={x} value={x}>{x}</option>);
        }
        return (            
                <div className='ui sixteen wide column'>
                    <div className="fields">
                        <div className="three wide field">
                            <ChildSingleInput
                                inputType="text"
                                label="Number"
                                name="number"
                                value={this.state.editedAddress.number}
                                controlFunc={this.handleChange}
                                maxLength={80}
                                placeholder="Enter your address number"
                                errorMessage="Please enter a valid address number"
                                    />
                        </div>
                        <div className="eight wide field">
                            <ChildSingleInput
                                inputType="text"
                                label="Street"
                                name="street"
                                value={this.state.editedAddress.street}
                                controlFunc={this.handleChange}
                                maxLength={80}
                                placeholder="Enter your address street"
                                errorMessage="Please enter a valid address street"
                                    />
                        </div>
                        <div className="five wide field">
                            <ChildSingleInput
                                inputType="text"
                                label="Suburb"
                                name="suburb"
                                value={this.state.editedAddress.suburb}
                                controlFunc={this.handleChange}
                                maxLength={80}
                                placeholder="Enter your address suburb"
                                errorMessage="Please enter a valid address suburb"
                                    />
                        </div>
                    </div>
                    <div className="fields">
                        <div className="six wide field">
                            <b>Country</b>
                                <select
                                    label="postCode"
                                    className="ui right labeled dropdown"
                                    placeholder="Country"
                                    value={selectedCountry}
                                    onChange={this.handleChange}
                                    name="country">
                                    <option value="">Select a country</option>
                                    {countryOptions}
                                        </select>
                        </div>
                                          
                        <div className="six wide field">
                            <b>City</b>
                            <select
                                className="ui right labeled dropdown"
                                placeholder="City"
                                value={selectedCity}
                                onChange={this.handleChange}
                                name="city">
                                <option value="">Select a city</option>
                                {cityOptions}
                                    </select>
                                    </div>
                              
                
                        <div className="three wide field">
                            <ChildSingleInput
                                inputType="number"
                                label="Post Code"
                                name="postCode"
                                value={this.state.editedAddress.postCode}
                                controlFunc={this.handleChange}
                                maxLength={80}
                                placeholder="Enter your address post code"
                                errorMessage="Please enter a valid address post code"
                                    />
                        </div>
                    </div>
                <button type="button" className="ui teal button" onClick={this.saveAddress}>Save</button>
                <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button>
                </div>
            
        )
    }

}

export class Nationality extends React.Component {
    constructor(props) {
        super(props)

        this.handleChange = this.handleChange.bind(this);
          }

    handleChange(event) {
        let data = {}
        data.nationality = event.target.value;
        this.props.saveProfileData(data);
    }

    render() {
        let selectedNationality = this.props.nationalityData
        const nationalityOptions = Object.keys(Countries).map(x => <option key={x} value={x}>{x}</option>);

        return (
            <div className="ui eight wide column">
                <select
                    className="ui right labeled dropdown"                    
                    value={selectedNationality}
                    onChange={this.handleChange}
                    name = "nationality"
                >
                    <option>  Select your nationality</option>  
                    {nationalityOptions}
                    </select>
               

            </div>
        )

        
    }
}