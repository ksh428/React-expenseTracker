import React from 'react'
import { Grid } from '@material-ui/core'
import Details from './components/Details/Details'
import useStyles from './styles'
import Main from './components/Main/Main'
import { Provider } from './context/context'
import { PushToTalkButton,PushToTalkButtonContainer,ErrorPanel } from '@speechly/react-ui'
import { useEffect,useRef } from 'react';
// import { SpeechState,useSpeechContext } from '@speechly/react-client';


const App = () => {
    const classes=useStyles();
    // const {speechState}=useSpeechContext();
    // const main=useRef(null);
    // const executescroll=()=>{
    //   main.current.scrollIntoView();

    // }
    // useEffect(()=>{
    //   if(speechState==SpeechState.Recording){
    //     executescroll();
    //   }

    // },[speechState])
  return (
    <Provider>
    <div>
      <Grid className={classes.grid} container spacing={0} alignItems="center" justify='center' style={{height:'100vh'}}>
        <Grid item xs={12} sm={4} className={classes.mobile}>
            <Details title="Income"/>
        </Grid>
        <Grid  item xs={12} sm={3} className={classes.main}>
            <Main/>
        </Grid>
        <Grid item xs={12} sm={4} className={classes.desktop}>
            <Details title="Income"/>
        </Grid>
        <Grid item xs={12} sm={4} className={classes.last}>
            <Details title="Expense"/>
        </Grid>
      </Grid>
      <PushToTalkButtonContainer>
        <PushToTalkButton/>
        <ErrorPanel/>
      </PushToTalkButtonContainer>
    </div>
    </Provider>
  )
}

export default App
