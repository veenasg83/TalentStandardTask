
import React from 'react';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types'
import { Popup, Icon } from 'semantic-ui-react'

export default class TalentCardDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            view: 'profile'
        }

        this.showProfile = this.showProfile.bind(this);
        this.showVideo = this.showVideo.bind(this);
    };


    showProfile() {
        this.setState({
            view:"profile"
        })
    }

    showVideo() {
        this.setState({
            view:"video"
        })
    }



    render() {
        const { talent } = this.props
        const photo = talent.photoId ? talent.photoId : 'https://react.semantic-ui.com/images/avatar/large/matthew.png'
        const content = this.state.view === 'video'
            ? (
                <video width='100%' controls>
                </video>
            )
            :
            (<div className="content" style={{ padding: "0" }}>
                <div className="ui grid">
                    <div className="eight wide column">
                        <div className="image">
                            <img src={photo} width="100%" height="100%" />
                        </div>
                    </div>
                    <div className="eight wide column">
                        <h3>Talent snapshot</h3>
                        <h5 className="ui header">CURRENT EMPLOYER
                            <div className="sub header">
                                {talent.currentEmployment}
                            </div>
                        </h5>
                        <h5 className="ui header">VISA STATUS
                            <div className="sub header">
                                {talent.visa}
                            </div>
                        </h5>
                        <h5 className="ui header">POSITION
                            <div className="sub header">
                                {talent.level}
                            </div>
                        </h5>
                    </div>
                </div>
            </div>

            )
        const skillset = talent.skills ?
            talent.skills.map(skill => <label className="ui basic blue label" key={skill}>{skill}</label>)
            : null

        return (
            <div className="ui fluid card">
                <div className="content">
                    <div className="left floated header">{talent.name}</div>
                    <i className="right floated big star icon" />
                </div>
                {content}
                <div className="content">
                    <div className="ui grid">
                        <div className="four column row">
                            <div className="center aligned column">
                                {this.state.view === "video" ?
                                    <i className="large user icon" onClick={this.showProfile} />
                                    : <i className="large video icon" onClick={this.showVideo} />
                                }
                            </div>
                            <div className="center aligned column"> <i className="  large file pdf outline  icon" /> </div>
                            <div className="center aligned column"> <i className="  large linkedin icon" /> </div>
                            <div className="center aligned column"> <i className=" large github icon" /> </div>
                        </div>
                    </div>
                </div>
                <div className="extra content">
                    {skillset}
                </div>
            </div>
        )
    }
}

