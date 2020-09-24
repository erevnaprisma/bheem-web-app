import React, { Component } from 'react'
import {store} from '../../Containers/Container'
import Loader from '../../Components/Loader'
import AppConfig from '../../Config/AppConfig'
import {setSession,getSession,isValuePropertyExist} from '../../Utils/Utils'
import socketIo from '../../Containers/Socket/socketListeners'
import StreamingActions from '../../Containers/Streaming/redux'

var bheemApi=null
// iframe Integration
export const BheemVidStreamComponent = ({ opt }) => {
  const [jitsi, setJitsi] = React.useState(0)

  const loadBheemScript = () => {
    let resolveLoadBheemScriptPromise = null
    const loadBheemScriptPromise = new Promise(resolve => {
      resolveLoadBheemScriptPromise = resolve
    })
    const script = document.createElement('script')
    script.src = 'https://bheem.erevnaraya.com/external_api.js';
    script.async = true
    script.onload = () => resolveLoadBheemScriptPromise(true)
    document.body.appendChild(script)
    return loadBheemScriptPromise
  }

  const initialiseJitsi = async () => {
    if (!window.JitsiMeetExternalAPI) {
      await loadBheemScript()
    }
    console.log('config overwrite>>> ',opt.configOverwrite);
    const _jitsi = new window.JitsiMeetExternalAPI('bheem.erevnaraya.com', {
      roomName:opt.roomName,
      id:opt.roomId,
      onload:<Loader/>,
      parentNode: document.getElementById(opt.containerId),
      userInfo:opt.userInfo,
      configOverwrite:opt.configOverwrite
    })
    _jitsi.addEventListener('videoConferenceLeft',u=>{
      console.log('JITSI EVENT vid. conference lef>>',u);
      // window.location='/'
      // swal("Meeting end")
    })

    _jitsi.addEventListener('videoConferenceJoined',u=>{
      console.log('JITSI EVENT User joined>>',u);
    })

    _jitsi.addEventListener('participantLeft',u=>{
      console.log('JITSI EVENT Participant left>>',u);
      // socketIo.emit('')
    })
    _jitsi.addEventListener('participantRoleChanged',u=>{
      console.log('JITSI EVENT Participant role change>>',u);
      // socketIo.emit('')
    })

    //audio listeners
    // _jitsi.addEventListener('audioAvailabilityChanged',u=>{
    //   console.log('JITSI EVENT audioAvailabilityChanged>>',u);
    //   // socketIo.emit('')
    // })
    _jitsi.addEventListener('audioMuteStatusChanged',u=>{
      console.log('JITSI EVENT audioMuteStatusChanged >>',u);
      // socketIo.emit('')
      store.dispatch(StreamingActions.doToggleAudio({tooggleAudio:u.muted?false:true}))
    })
    //audioo listeners

     //video listeners
    _jitsi.addEventListener('videoAvailabilityChanged',u=>{
      console.log('JITSI EVENT videoAvailabilityChanged>>',u);
      
    })
    _jitsi.addEventListener('videoMuteStatusChanged',u=>{
      console.log('JITSI EVENT videoMuteStatusChanged >>',u);
      store.dispatch(StreamingActions.doToggleVideo({tooggleVideo:u.muted?false:true}))
    })
    //video listeners
    bheemApi=_jitsi
    setJitsi(_jitsi)
  }

  React.useEffect(() => {
    initialiseJitsi()
    return () => jitsi?.dispose?.()
  }, [])
  return(
    <div >
      <div className={opt.className} id={opt.containerId}/>
    </div>
    )
}

export const do_mute_my_audio = async (flag) =>{
  const {tooggleAudio} = store.getState().streaming
  
  bheemApi.isAudioMuted().then( async muted => { 
    console.log('is muted >>>',muted);
    // console.log('is same >>>',muted!==flag);
    if(muted!==flag){
      console.log('isMuted',muted);
      bheemApi.executeCommand('toggleAudio')
    }
  });
  
}

export const do_mute_my_video = async (flag) =>{
  bheemApi.isVideoMuted().then(muted => { 
        if(flag!==muted){
          console.log('do mute');
          bheemApi.executeCommand('toggleVideo')
        } 
  });
  
 
}

export const do_mute_everyone = async () =>{
  bheemApi.executeCommand('muteEveryone');
}

export const toogle_lobby = async () =>{
  bheemApi.executeCommand('toggleLobby', true);
}


