import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie'
import TalentCard from '../TalentFeed/TalentCard.jsx';
import { Loader, Icon, Pagination } from 'semantic-ui-react';
import CompanyProfile from '../TalentFeed/CompanyProfile.jsx';
import FollowingSuggestion from '../TalentFeed/FollowingSuggestion.jsx';
import { BodyWrapper, loaderData } from '../Layout/BodyWrapper.jsx';

export default class TalentFeed extends React.Component {
    constructor(props) {
        super(props);

        let loader = loaderData
        loader.allowedUsers.push("Employer")
        loader.allowedUsers.push("Recruiter")

        this.state = {
            loadNumber: 5,
            loadPosition: 0,
            feedData: [],
            watchlist: [],
            loaderData: loader,
            loadingFeedData: false,
            companyDetails: null,
            talentDetails: null,
            totalPages: 0,
            activePage: 1
        }

        this.init = this.init.bind(this);
        this.loadEmployerData = this.loadEmployerData.bind(this);
        this.loadTalentData = this.loadTalentData.bind(this);


    };

    init() {
        let loaderData = TalentUtil.deepCopy(this.state.loaderData)
        loaderData.isLoading = false;
        this.setState({ loaderData });//comment this
    }

    componentDidMount() {
        this.loadTalentData()
        this.loadEmployerData()       
        this.init()
    };

    loadEmployerData() {
        var cookies = Cookies.get('talentAuthToken');
        // console.log("inside loademployer");
        $.ajax({
            url: 'http://localhost:60290/profile/profile/getEmployerProfile',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "GET",
            contenttype: "application/json",
            dataType: "json",
            success: function (res) {
                let data = null
                if (res.employer) {
                    data = res.employer.companyContact
                    // console.log(data);
                }
                this.setState({
                    companyDetails: data
                })
                //  console.log(this.state.companyDetails);
            }.bind(this),
            error: function (res) {
                console.log(res.status)
            }
        })

    }

    loadTalentData() {
        var cookies = Cookies.get('talentAuthToken');
       // console.log("loadTalentData");
        $.ajax({
            url: 'http://localhost:60290/profile/profile/getTalent',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "GET",
            contenttype: "application/json",
            dataType: "json",
            success: function (res) {
                let data = null;
                if (res.success) {
                    data = res.data;
                    this.setState({
                        talentDetails: data
                    })
                }
            }.bind(this),
            error: function (res) {
                console.log(res.status)
            }

        })
    }
       
    render() {
        const talent = this.state.talentDetails ?
            <div className = "ui eight wide column">
                 <TalentCard talent={this.state.talentDetails} /> 
            </div>
            :
            <div className="ui eight wide column">
                <h4>There are no talents found for your recruitment company</h4>
            </div>

        return (
            <BodyWrapper reload={this.init} loaderData={this.state.loaderData}>
                <div className="ui container" style={{ minHeight: "600px" }}>
                    <div className="ui grid">
                        <div className="ui four wide column">
                            <div className="ui card">
                                <CompanyProfile companyDetails={this.state.companyDetails} />
                            </div>
                        </div>
                        {talent}             
                        <div className="ui four wide column">
                            <div className="  ui card" >
                                <FollowingSuggestion />
                            </div>
                        </div>
                    </div>
                </div>
            </BodyWrapper>
        )
    }
}