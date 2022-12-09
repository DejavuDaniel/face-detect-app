import React, { Component } from "react";
import ParticlesBg from 'particles-bg'
import Sigin from "./components/Sigin/Signin";
import Register from "./components/Register/Register";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import Rank from "./components/Rank/Rank";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import './App.css';


let imageGlobal = '';

const initialState = {
    input: '',
    IMAGE_URL: '',
    box: {},
    route: 'signin',
    user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
    }
}

class App extends Component {
    constructor() {
        super();
        this.state = initialState;
    }

    loadUser = (data) => {
        this.setState({
            user: {
                id: data.id,
                name: data.name,
                email: data.email,
                entries: data.entries,
                joined: data.joined
            }
        })
    }

    calculateFaceLocation = (data) => {
        const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
        const image = document.getElementById('inputimage');
        const width = Number(image.width);
        const height = Number(image.height);
        return {
            leftCol: clarifaiFace.left_col * width,
            topRow: clarifaiFace.top_row * height,
            rightCol: width - (clarifaiFace.right_col * width),
            bottomRow: height - (clarifaiFace.bottom_row * height)
        }
    }

    displayFacebox = (box) => {
        this.setState({ box: box });
    }


    onInputChange = (event) => {
        this.setState({ input: event.target.value });
        imageGlobal = event.target.value;
        return imageGlobal
    }



    onPictureSubmit = () => {
        this.setState({ IMAGE_URL: this.state.input });
            fetch('http://localhost:3000/imageurl', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    input: imageGlobal
                })
            })
            .then(response => response.json())
            .then(result => {
                if (result) {
                    fetch('http://localhost:3000/image', {
                        method: 'put',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            id: this.state.user.id
                        })
                    })
                        .then(response => response.json())
                        .then(count => {
                            this.setState(Object.assign(this.state.user, {
                                entries: count
                            }))
                        })
                        .catch(err => console.log(err))
                }
                this.displayFacebox(this.calculateFaceLocation(result))
            })
            .catch(error => console.log('error', error));



    }

    onRouteChange = (route) => {
        if (route === 'signin') {
            this.setState(initialState);
        }
        this.setState({ route: route })
    }



    render() {
        return (
            <div className="App">
                <Navigation onRouteChange={this.onRouteChange} route={this.state.route} />
                {this.state.route === 'home'
                    ? <div>
                        <Logo />
                        <Rank name={this.state.user.name} entries={this.state.user.entries} />
                        <ImageLinkForm input={this.state.input} onInputChange={this.onInputChange} onPictureSubmit={this.onPictureSubmit} />
                        <FaceRecognition box={this.state.box} IMAGE_URL={this.state.IMAGE_URL} />
                    </div>
                    : (
                        this.state.route === 'signin'
                            ? <Sigin onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
                            : <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
                    )
                }
                <ParticlesBg color="#149df2" num={300} type="cobweb" bg={true} />
            </div>
        );
    }
} export default App;
