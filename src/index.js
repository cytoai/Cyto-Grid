import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Gallery from './Gallery';
import * as serviceWorker from './serviceWorker';
import { imgs } from './testImgs'



ReactDOM.render(<Gallery images={imgs} imagesPerRow={10}/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
