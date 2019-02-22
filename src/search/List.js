import React, { Component } from 'react';

class List extends Component {
    render() {
        return (
            <li>
                <img src={"http://farm" +this.props.farm+ ".static.flickr.com/" +this.props.server+ "/" +this.props.id+ "_" + this.props.secret + ".jpg"} alt="" />
            </li>
        )
    }
}

export default List;