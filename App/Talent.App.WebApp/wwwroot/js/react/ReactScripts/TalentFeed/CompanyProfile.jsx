import React from 'react';
import { Loader } from 'semantic-ui-react';

export default class CompanyProfile extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (!this.props.companyDetails) return null
        const { companyDetails } = this.props
        const profilePhoto =  "http://localhost:60290/images/square-image.png"
        return (
            <React.Fragment>


                <div className="content">
                    <div className="center aligned">
                        <div className="ui circular tiny image">
                            <img src={profilePhoto} />
                        </div>
                    </div>
                    <br />
                    <div className="center aligned header">{companyDetails.name}</div>
                    <div className="center aligned meta"><i className="map pin icon" />{`${companyDetails.location.city}, ${companyDetails.location.country}`}</div>
                    <div className="center aligned description">
                        We currently do not have any specific skills that we desire.
                </div>
                </div>
                <div className="extra content">
                    <a><i className="phone icon" />: {companyDetails.phone}</a>
                    <br />
                    <a><i className="mail icon" />: {companyDetails.email}</a>
                </div>
            </React.Fragment>
        )
    }
}