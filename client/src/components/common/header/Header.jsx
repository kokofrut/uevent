import { useCallback, useState, useEffect } from 'react'
import { redirect, useNavigate } from 'react-router'
import "./header.scss"
import { useSelector, useDispatch } from 'react-redux'
import { change } from '../../../features/search/searchSlice'
import { Avatar } from '@mui/material'
import vector from "./vector.svg"
import $api from '../../../api/index'

function Header(props) {
    const navigate = useNavigate()
    let location = useSelector((state) => state.search.value)
    const dispatch = useDispatch()
    const [togglestate, setTogglestate] = useState(false)
    const [auth, setAuth] = useState(true)
    // const isAuthenticated = useSelector((state) => state.user.user.isAuthenticated)
    const user = useSelector((state) => state.user.user)

    function handleVector() {
        setTogglestate(!togglestate)
    }
    function handleDashboard() {
        navigate('/dashboard')
    }
    function handleState(e) {
        if (e.target.selectedOptions[0].value !== '---') {
            dispatch(change(e.target.selectedOptions[0].value))
            localStorage.setItem('location', e.target.selectedOptions[0].value)
        }
        $api.post("/search", { location })
        setTogglestate(false)
    }
    function handleLogoClick() {
        return navigate('/')
    }
    return (
        <div className="wrapper-header">
            <div className="logo-container">
                <img src="/logo.svg" className="logo-svg" onClick={handleLogoClick}></img>
            </div>
            <div className="searchbox">
                <input
                    type="text"
                    disabled
                    value={location}
                    className="input-location">
                </input>
                {togglestate &&
                    <select id="country-state" name="country-state" onChange={(e) => handleState(e)} onFocus={(e) => (e.selectedIndex = -1)}>
                        <option value="---">---</option>
                        <option value="Dnipro">Dnipropetrovsk Oblast</option>
                        <option value="Donetsk">Donetsk Oblast</option>
                        <option value="Zhytomyr">Zhytomyr Oblast</option>
                        <option value="Uzhgorod">Zakarpattia Oblast</option>
                        <option value="Zaporizhzhya">Zaporizhzhya Oblast</option>
                        <option value="Ivano-Frankivsk">Ivano-Frankivsk Oblast</option>
                        <option value="Kyiv">Kyiv</option>
                        <option value="Kyiv Oblast">Kyiv Oblast</option>
                        <option value="Kropyvnytsky">Kirovohrad Oblast</option>
                        <option value="Crimea">Autonomous Republic of Crimea</option>
                        <option value="Lviv">Lviv Oblast</option>
                        <option value="Mykolaiv">Mykolaiv Oblast</option>
                        <option value="Odessa">Odessa Oblast</option>
                        <option value="Rivne">Rivne Oblast</option>
                        <option value="Sumy">Sumy Oblast</option>
                        <option value="Ternopil">Ternopil Oblast</option>
                        <option value="Kharkiv">Kharkiv Oblast</option>
                        <option value="Kherson">Kherson Oblast</option>
                        <option value="Khmelnytsky">Khmelnytsky Oblast</option>
                        <option value="Cherkasy">Cherkasy Oblast</option>
                        <option value="Chernihiv">Chernihiv Oblast</option>
                        <option value="Chernivtsi">Chernivtsi Oblast</option>
                        <option value="Luhansk">Luhansk Oblast</option>
                        <option value="Vinnytsia">Vinnytsia Oblast</option>
                        <option value="Lutsk">Volyn Oblast</option>
                    </select>
                }
                <div className="vector-button" onClick={handleVector}>
                    <img src={vector}></img>
                </div>
            </div>
            {auth ?
                <div className='user-data'>
                    <div className='user-name' onClick={handleDashboard}>{user.name}</div>
                    <div className="user-avatar" >
                        <Avatar alt="Remy Sharp" onClick={handleDashboard} src="cardMedia.jpg" />
                </div>
                </div>    
                :
    <div className='auth-btns'>
        <button className='sign-in-btn' onClick={() => navigate("/auth#sign-in")}>SIGN IN</button>
        <button className='sign-up-btn' onClick={() => navigate("/auth#sign-up")}>SIGN UP</button>
    </div>
}
        </div >
    )
}

export default Header