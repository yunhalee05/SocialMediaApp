import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Alert from '../common/Alert'
import { updateUserProfile } from '../../_actions/profileActions'
import { USER_UPDATE_PROFILE_RESET } from '../../_constants/profileConstants'
import Loading from '../common/Loading'

function EditProfile({setOnEdit}) {

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const [fullname, setFullname] = useState(userInfo.user.fullname)
    const [mobile, setMobile] = useState(userInfo.user.mobile)
    const [address, setAddress] = useState(userInfo.user.address)
    const [website, setWebsite] = useState(userInfo.user.website)
    const [story, setStory] = useState(userInfo.user.story)
    const [gender, setGender] = useState(userInfo.user.gender)
    const [image, setImage] = useState('')

    const changeAvatar= async (e) =>{
        const file = e.target.files[0]
        const err = checkImage(file)
        if(err)return window.alert(err)
        if(file){
            var preview = document.getElementById('preview')
            preview.src = URL.createObjectURL(file)
        }
        setImage(file)
    }
    
    const checkImage = (file)=>{
        let err = ""
        if(!file) return err = "File does not exist."
        if(file.size> 1024*1024){
            err = "The largest image size is 1mb."
        }
        if(file.type !=='image/jpeg' && file.type !== 'image/png'){
            err = "Image format is incorrect."
        }
        return err
    }

    const userProfile = useSelector(state => state.userProfile)
    const {loading, error, updateSuccess} = userProfile

    const dispatch = useDispatch()

    useEffect(() => {
        if(updateSuccess){
            dispatch({
                type:USER_UPDATE_PROFILE_RESET
            })
            setOnEdit(false)
        }
    }, [dispatch, userInfo.user._id, updateSuccess, setOnEdit])

    const handleSubmit = (e) =>{
        e.preventDefault()

        const user = {
            fullname, 
            mobile,
            address,
            website,
            story,
            gender
        }
        dispatch(updateUserProfile(user, image))
    }
    return (
        <div className="edit_profile">
            {
                error && <Alert variant="danger">{error}</Alert>
            }
            {
                loading && <Loading></Loading>
            }
            <button className="btn btn-danger btn_close" onClick={()=>setOnEdit(false)}>
                Close
            </button>

            <form onSubmit={handleSubmit}>
                <div className="info_avatar">
                    <img id="preview" src={userInfo.user?.avatar} alt="avatar"/>
                    <span>
                        <i className="fas fa-camera"></i>
                        <p>Change</p>
                        <input type="file" name="file" id="file_up" accept="image/*" onChange={changeAvatar}/>
                    </span>
                </div>


                <div className="form-group">
                    <label htmlFor="fullname">Full Name</label>
                    <div className="position-relative">
                        <input type="text" className="form-control" id="fullname" name="fullname"
                            onChange={e=>setFullname(e.target.value)} value={fullname} required/>
                        <small className="text-danger position-absolute" style={{top:'50%', right:'5px', transform:'translateY(-50%)'}}>
                            {fullname.length}/25
                        </small>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="mobile">Mobile</label>
                    <input type="text" className="form-control" id="mobile" name="mobile"
                        onChange={e=>setMobile(e.target.value)} value={mobile}/>
                </div>

                <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input type="address" className="form-control" id="address" name="address"
                        onChange={e=>setAddress(e.target.value)} value={address} />
                </div>

                <div className="form-group">
                    <label htmlFor="website">Website</label>
                    <input type="text" className="form-control" id="website" name="website"
                        onChange={e=>setWebsite(e.target.value)} value={website} />
                </div>

                <div className="form-group">
                    <label htmlFor="story">Story</label>
                    <textarea name="story" id="story" cols="30" rows="4" value={story} onChange={(e)=>setStory(e.target.value)}></textarea>
                    <small className="text-danger d-block text-right" >
                            {story.length}/200
                    </small>
                </div>

                <label htmlFor="gender">Gender</label>
                <div className="input-group-prepend px-0 mb-4">
                    <select className="custom-select text-capitalize" name="gender" id="gender" value={gender} onChange={e=>setGender(e.target.value)}>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                    
                </div>

                <button className="btn btn-info w-100" type="submit">
                    Save
                </button>
            </form>
        </div>
    )
}

export default EditProfile
