import React, { Component } from 'react';
import './flickr.css';
import { BrowserRouter as Router, Route, Link, withRouter } from "react-router-dom";
import List from '../search/List';
import axios from 'axios';
//import history from '../history'

class Flickr extends Component {
    componentWillMount() {
        this.searchPhotos({tag: 'dogs'});
    }

    constructor() {
        super();
        this.state = {
            photos: [],
            value: ''
        }
    }

    render() {
        return (
            <Router>
            <div className="container">
                <form className="search-form" >
                    <input type="search" value={this.state.value} onChange={this.handleChange.bind(this)} name="search" placeholder="Search" required/>
                    
                    <Link to="/search" className="search-button" onClick={() => this.searchPhotos()}>
                        <svg fill="#fff" height="24" viewBox="0 0 23 23" width="24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                            <path d="M0 0h24v24H0z" fill="none"/>
                        </svg>
                    </Link>
                </form>
                <nav className="main-nav">
                <ul>
                    <li><Link to="/cats" onClick={() => this.searchPhotos({tag: 'cats'})}>Cats</Link></li>
                    <li><Link to="/dogs" onClick={() => this.searchPhotos({tag: 'dogs'})}>Dogs</Link></li>
                    <li><Link to="/computers" onClick={() => this.searchPhotos({tag: 'computers'})} >Computers</Link></li>
                </ul>
                </nav>
                <div className="photo-container">
                    <Route path="/dogs"  
                        render={() => {
                            return <ul>{this.getPhotos()} </ul>
                        }}/>
                    <Route path="/cats"  
                        render={() => {
                            return <ul>{this.getPhotos()} </ul>
                        }}/>
                    <Route path="/computers" 
                        render={() => {
                            return <ul>{this.getPhotos()} </ul>
                        }}/>
                    <Route path="/search" 
                        render={() => {
                            return <ul>{this.getPhotos()}</ul>
                        }}/>    
                </div>
            </div>

            </Router>
        );
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    searchByText(event) {
        event.preventDefault();
        this.searchPhotos({text: 'warcraft'}, event);
    }

    searchPhotos(data) {
        var url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${this.props.apikey}&per_page=12&format=json&nojsoncallback=1`;
        if(data && data.tag) {
            url += `&tags=${data.tag}`;
        }else {
            url += `&text=${this.state.value}`;
        }
        console.log(url)
        axios.get(url)
        .then(res => {
            const photos = res.data.photos.photo;
            this.setState({photos: photos});
        });
    }

    getPhotos() {
        return this.state.photos.map(photo => 
            <List key={photo.id} farm={photo.farm} server={photo.server} id={photo.id} secret={photo.secret}/>
        );
    }
    
}


export default Flickr;