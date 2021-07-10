import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createPost } from '../_actions/postActions'
import { ALERT, STATUS } from '../_constants/globalConstants'
import Alert from './Alert'

function StatusModal() {

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin
    const theme = useSelector(state => state.theme)

    const [content, setcontent] = useState('')
    const dispatch = useDispatch()

    const [Images, setImages] = useState([])
    const [stream, setStream] = useState(false)
    const [tracks, setTracks] = useState('')

    const videoRef = useRef()
    const canvasRef = useRef()
    

    const handleChangeImages=(e)=>{
        const files = [...e.target.files]
        let newImages= []
        let err = ''

        files.forEach(file=>{
            if(!file) return err = "File doesn't exist."
            if(file.type !== 'image/jpeg' && file.type !=='image/png'){
                return err = "Image format is incorrect."
            }
            return newImages.push(file)
        })

        if(err) dispatch({type:ALERT, payload:{error:err}})

        setImages([...Images, ...newImages])
        
    }

    const deleteImage=(index)=>{
        const newArr = [...Images]
        newArr.splice(index, 1)
        setImages(newArr)
    }

    const handleStream= () =>{
        setStream(true)
        // navigator.getWebcam = (navigator.getUserMedia || navigator.webKitGetUserMedia || navigator.moxGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
        if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia){
            navigator.mediaDevices.getUserMedia({video:true})
                                    .then(mediastream=>{
                                        videoRef.current.srcObject = mediastream
                                        videoRef.current.play()
                                        const track = mediastream.getTracks()
                                        setTracks(track[0])
                                    }).catch(err=>console.log(err))
        }
        // else{
        //     navigator.getWebcam({video:true},
        //                     function(stream){
        //                         videoRef.current.srcObject = stream
        //                         videoRef.current.play()
        //                         const track = stream.getTracks()
        //                         setTracks(track[0])
        //                     }, function(){
        //                         console.log("Web cam is not accesible.")
        //                     })
        // }
    }

    const handleCapture= () =>{
        const width = videoRef.current.clientWidth;
        const height = videoRef.current.clientHeight;

        canvasRef.current.setAttribute("width", width)
        canvasRef.current.setAttribute("height", height)

        const ctx = canvasRef.current.getContext('2d')
        ctx.drawImage(videoRef.current, 0, 0, width, height)
        let URL = canvasRef.current.toDataURL()
        setImages([...Images, URL])
    }

    const handleStopStream= () =>{
        tracks.stop()
        setStream(false)
    }

    const handleSubmit= (e) =>{
        e.preventDefault()
        if(Images.length===0){
            return dispatch({type:ALERT, payload:{error:"Please add your photo."}})
        }

        dispatch(createPost({content, Images}))
        setcontent('')
        setImages([])
        if(tracks) tracks.stop()
        dispatch({type:STATUS, payload:false})
        
    }

    return (
        <div className="status_modal">
            <form onSubmit={handleSubmit}>
                <div className="status_header">
                    <h5 className="m-0">Create Post</h5>
                    <span onClick={()=>dispatch({type:STATUS, payload:false})}>&times;</span>
                </div>

                <div className="status_body">
                    <textarea name="content" value = {content} placeholder={`${userInfo.user.username}, what are you thinking?`} onChange={(e)=>setcontent(e.target.value)} />

                    <div className="show_images">
                        {
                            Images && Images.map((image, index)=>(
                                <div key={index} id="file_img">
                                    <img src={image.camera? image.camera : URL.createObjectURL(image)} 
                                    alt="images" className="img-thumbnail rounded" style={{filter:theme? 'invert(1)':'inver(0)'}} />
                                    <span onClick={()=>deleteImage(index)}>&times;</span>
                                </div>
                            ))
                        }
                    </div>

                    {
                        stream &&
                        <div className="stream position-relative">
                            <video autoPlay muted  style={{filter:theme? 'invert(1)':'inver(0)'}} ref={videoRef} width='100%' height='100%'></video>
                            <span onClick={handleStopStream}>&times;</span>
                            <canvas ref={canvasRef} style={{display:'none'}}></canvas>
                        </div>

                    }
                    <div className="input_images">
                        {
                            stream
                            ? <i className="fas fa-camera" onClick={handleCapture}></i>
                            : <>
                                <i className="fas fa-camera" onClick={handleStream}></i>
                                <div className="file_upload">
                                    <i className="fas fa-image"></i>
                                    <input type="file" name="file" id="file_up" multiple accept="image/*" onChange={handleChangeImages}/>
                                </div>
                            </>
                        }
                    </div>
                </div>

                <div className="statue_footer">
                <button className="btn btn-secondary w-100" type="submit" type="submit">Post</button>
                </div>

            </form>
        </div>
    )
}

export default StatusModal
