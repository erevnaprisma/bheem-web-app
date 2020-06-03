import Webcam from "react-webcam";
import React, {Component,createRef} from 'react'

// var video = document.querySelector("#video-main-stream");

// navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia
// if (navigator.getUserMedia) {
// navigator.getUserMedia({ video: true }, handleVideo, videoError);
// }
// function handleVideo(stream) {
//   video.src = stream;
//   video.play()
// }

// function videoError(e) {
//   alert("Izinkan menggunakan webcam untuk demo!")
// }


// const MainCam = (props)=>{
//   const webcamRef = useRef(null)
//   const mainVideoStream=createRef()
  // const capture = useCallback(() => {
  //     const imageSrc = webcamRef.current.getScreenshot();
  //     console.log("test",JSON.stringify(imageSrc))
  //   },
  //   [webcamRef]
  // );

  // const [streamData, streaming] = useState(0);

  // const stream=useEffect(()=>{
  //   const streamData=webcamRef.current.getScreenshot()  
  //   console.log("stream data>>>>>>",streamData)
  //   streaming(streamData)
  // })

  // if(props.function)
  // { 
  //   props.function(streamData)
  // }

  // const videoConstraints = {
  //   width: 1280,
  //   height: 720,
  //   facingMode: "user"
  // };
  
  // navigator.mediaDevices
  //   .getUserMedia({video: true})
  //   .then(stream => this.mainVideoStream.current.srcObject = stream)
  //   .catch(console.log+"<<<<<<Errorny")
    
//     return(
//       <div>
//             <button onClick={capture}>test</button>
      //         <Webcam
      //   className={this.props.cls}
      //   audio={true}
      //   height={this.props.width}
      //   screenshotFormat="image/jpeg"
      //   width={1280}
      //   videoConstraints={videoConstraints}
      // />
//               <video id="video-main-stream" ref={mainVideoStream} autoPlay></video>
//       </div>
//     )
// }
// export default MainCam
export default class Example extends Component {
  constructor(props) {
    super(props);
    this.streamMe = React.createRef()
  }

  componentWillMount()
  {

   let constraintStream = { 
    audio: true,
    video: { 
        facingMode: "environment", 
        width: { min: 1024, ideal: 1280, max: 1920 },
        height: { min: 776, ideal: 720, max: 1080 } 
    }
  }; 
  if (navigator.mediaDevices === undefined) {
    navigator.mediaDevices = {};
    navigator.mediaDevices.getUserMedia = function(constraintStream) {
        let getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        if (!getUserMedia) {
            return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
        }
        return new Promise(function(resolve, reject) {
            getUserMedia.call(navigator, constraintStream, resolve, reject);
        });
    }
  }else{
      let devices_list=[]
      let i=0
      navigator.mediaDevices.enumerateDevices()
      .then(devices => {
          devices.forEach(device=>{
              devices_list.push({id:device.deviceId,kinds:device.kind.toUpperCase(),label:device.label})
              i++
            })
            
        if(this.props.listDevice)
        {
          this.props.listDevice({devices:devices_list})
        }  
      })
      .catch(err=>{
          console.log(err.name, err.message);
      })
    }

  }
  render() {
    let constraintStream = { 
      audio: true,
      video: { 
          facingMode: "environment", 
          width: { min: 640, ideal: 1280, max: 1920 },
          height: { min: 480, ideal: 720, max: 1080 } 
      },
      deviceId:{exact:this.props.selectedDevice} 
    };  
    navigator.mediaDevices.getUserMedia(constraintStream)
      .then(stream => {
        this.streamMe.current.srcObject = stream
        if(this.props.function)
        {
          this.props.function({data:stream})
        }
      })
      .catch(function(err) { 
          console.log(err.name, err.message); 
      });


    return (
    //  <div style={{width:this.props.width,height:this.props.width,boxSizing:'border-box',overflow:'hidden'}} className={this.props.cls} >
          <div className={this.props.cls} style={{position:'relative',flexDirection:'column'}}>
              {this.props.isGrid && <h3 className="conTitle" style={{zIndex:300,borderRadius:'15%',left:5,bottom:2,color:'white',backgroundColor:'#737373',padding:5,position:'absolute'}}>{this.props.data}</h3> }
              <video
              style={this.props.style}
              width={this.props.width}
              height={this.props.height}
              ref={this.streamMe}
              autoPlay
              muted
            />
          </div>
    // </div>
    )
  }
}