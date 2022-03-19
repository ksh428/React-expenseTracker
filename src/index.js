import { SpeechProvider } from '@speechly/react-client';
import React  from 'react';
import ReactDOM from 'react-dom'
import App from './App'
import './index.css';


ReactDOM.render(<SpeechProvider appId={process.env.REACT_APP_APP_ID} language='en-US'><App/></SpeechProvider>,document.getElementById('root'));