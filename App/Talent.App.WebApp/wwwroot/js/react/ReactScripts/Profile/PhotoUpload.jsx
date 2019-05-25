/* Photo upload section */
import React, { Component } from 'react';
import Cookies from 'js-cookie';
import { Image } from 'semantic-ui-react'

export default class PhotoUpload extends Component {

    constructor(props) {
        super(props);

       
    };


    

    render() {
        let imageSource = "../../../../icons/Camera_default.png"
        const uploadedPhoto = <img src={imageSource} width="120px" height="120px" />
        return (
            <Image src={imageSource} size='tiny' circular bordered />
        )
        
    }
}
