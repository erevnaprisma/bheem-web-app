import React, { Component } from 'react'
import {store} from '../../Containers/Container'
import StreamingAction from '../../Containers/Streaming/redux'
import Loader from '../../Components/Loader'
import AppConfig from '../../Config/AppConfig'
import {setSession,getSession} from '../../Utils/Utils'
import socketIo from '../../Containers/Socket/socketListeners'
import { listeners } from 'process'
import swal from 'sweetalert2'

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
    const _jitsi = new window.JitsiMeetExternalAPI('bheem.erevnaraya.com', {
      roomName:opt.roomName,
      id:opt.roomId,
      onload:<Loader/>,
      parentNode: document.getElementById(opt.containerId),
      userInfo:opt.userInfo
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
      console.log('JITSI EVENT Participant left joined>>',u);
      // socketIo.emit('')
    })
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

export const do_mute_me = async () =>{
  const isAudioMuted=await bheemApi.isAudioMuted().then(muted => { return muted; });
  if(!isAudioMuted) bheemApi.executeCommand('toggleAudio')
}

export const do_mute_everyone = async () =>{
  bheemApi.executeCommand('muteEveryone');
}

export const toogle_lobby = async () =>{
  bheemApi.executeCommand('toggleLobby', true);
}


