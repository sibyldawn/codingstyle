import React, {Component} from 'react'

export default class Redirect extends Component {
    componentDidMount(){
        window.location = localStorage.getItem('location')
    }
    render(){
        return (
            <div>Loading...</div>
        )
    }

}