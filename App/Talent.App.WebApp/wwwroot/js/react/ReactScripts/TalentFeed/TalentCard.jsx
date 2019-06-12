import React from 'react';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types'
import { Popup, Icon } from 'semantic-ui-react'
import TalentCardDetail from './TalentCardDetail.jsx'

export default class TalentCard extends React.Component {
    constructor(props) {
        super(props);
       
    };    
    
    render() {
        const { talent } = this.props
        const talentList = talent.map(talent => <TalentCardDetail talent={talent} key={talent.id}/>)
        return (
            <div>
                {talentList}
            </div>
            )
    }
}

