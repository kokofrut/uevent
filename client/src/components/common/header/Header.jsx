import { useCallback, useState, useEffect } from 'react'
import { redirect, useNavigate } from 'react-router'
import "./header.scss"
import { useSelector, useDispatch } from 'react-redux'
import { change } from '../../../features/search/searchSlice'
import { Avatar, ThemeProvider, FormControl, Menu, MenuItem, Button, IconButton } from '@mui/material'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import vector from "./vector.svg"
import $api from '../../../api/index'

function Header({ toogleTheme }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [togglestate, setTogglestate] = useState(false)
    const [auth, setAuth] = useState(true)


    const navigate = useNavigate()

    let location = useSelector((state) => state.search.value)
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user.user)



    function handleVector() {
        setTogglestate(!togglestate)
    }
    function handleDashboard() {
        navigate('/dashboard')
    }
    function handleState(e) {
        console.log(e.target)
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
    const handleChangeLocation = (event) => {
        const newLocation = event.target.outerHTML.split('value')[1].split('"')[1];
        dispatch(change(newLocation));
        localStorage.setItem('location', newLocation);
        setTogglestate(!togglestate)
        handleCloseMenu();
    };
    const handleOpenMenu = (event) => { setAnchorEl(event.currentTarget); setTogglestate(!togglestate) }
    const handleCloseMenu = () => setAnchorEl(null);
    return (

        <div className="wrapper-header">
            <div className="logo-container">
                <img src="/logo.svg" className="logo-svg" onClick={handleLogoClick}></img>
                {/* <NightsStayIcon onClick={toogleTheme} /> */}
            </div>
            <div className="searchbox">
                <input
                    type="text"
                    disabled
                    value={location}
                    className="input-location">
                </input>
                {togglestate &&
                    <>
                        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu} sx={{overflow: "auto", maxHeight: "400px", height: "auto"}}>
                            <MenuItem value="Dnipro" onClick={handleChangeLocation}>
                                Dnipropetrovsk Oblast
                            </MenuItem>
                            <MenuItem value="Donetsk" onClick={handleChangeLocation}>
                                Donetsk Oblast
                            </MenuItem>
                            <MenuItem value="Zhytomyr" onClick={handleChangeLocation}>
                                Zhytomyr Oblast
                            </MenuItem>
                            <MenuItem value="Uzhgorod" onClick={handleChangeLocation}>
                                Zakarpattia Oblast
                            </MenuItem>
                            <MenuItem value="Zaporizhzhya" onClick={handleChangeLocation}>
                                Zaporizhzhya Oblast
                            </MenuItem>
                            <MenuItem value="Ivano-Frankivsk" onClick={handleChangeLocation}>
                                Ivano-Frankivsk Oblast
                            </MenuItem>
                            <MenuItem value="Kyiv" onClick={handleChangeLocation}>
                                Kyiv
                            </MenuItem>
                            <MenuItem value="Kyiv Oblast" onClick={handleChangeLocation}>
                                Kyiv Oblast
                            </MenuItem>
                            <MenuItem value="Kropyvnytsky" onClick={handleChangeLocation}>
                                Kirovohrad Oblast
                            </MenuItem>
                            <MenuItem value="Crimea" onClick={handleChangeLocation}>
                                Autonomous Republic of Crimea
                            </MenuItem>
                            <MenuItem value="Lviv" onClick={handleChangeLocation}>
                                Lviv Oblast
                            </MenuItem>
                            <MenuItem value="Mykolaiv" onClick={handleChangeLocation}>
                                Mykolaiv Oblast
                            </MenuItem>
                            <MenuItem value="Odessa" onClick={handleChangeLocation}>
                                Odessa Oblast
                            </MenuItem>
                            <MenuItem value="Rivne" onClick={handleChangeLocation}>
                                Rivne Oblast
                            </MenuItem>
                            <MenuItem value="Sumy" onClick={handleChangeLocation}>
                                Sumy Oblast
                            </MenuItem>
                            <MenuItem value="Ternopil" onClick={handleChangeLocation}>
                                Ternopil Oblast
                            </MenuItem>
                            <MenuItem value="Kharkiv" onClick={handleChangeLocation}>
                                Kharkiv Oblast
                            </MenuItem>
                            <MenuItem value="Kherson" onClick={handleChangeLocation}>
                                Kherson Oblast
                            </MenuItem>
                            <MenuItem value="Khmelnytsky" onClick={handleChangeLocation}>
                                Khmelnytsky
                            </MenuItem>
                            <MenuItem value="Cherkasy" onClick={handleChangeLocation}>
                                Cherkasy Oblast
                            </MenuItem>
                            <MenuItem value="Chernihiv" onClick={handleChangeLocation}>
                                Chernihiv Oblast
                            </MenuItem>
                            <MenuItem value="Chernivtsi" onClick={handleChangeLocation}>
                                Chernivtsi Oblast
                            </MenuItem>
                            <MenuItem value="Luhansk" onClick={handleChangeLocation}>
                                Luhansk Oblast
                            </MenuItem>
                            <MenuItem value="Vinnytsia" onClick={handleChangeLocation}>
                                Vinnytsia Oblast</MenuItem>
                            <MenuItem value="Lutsk" onClick={handleChangeLocation}>
                                Volyn Oblast
                            </MenuItem>
                        </Menu>
                        {/* <select id="country-state" name="country-state" onChange={(e) => handleState(e)} onFocus={(e) => (e.selectedIndex = -1)}>
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
                        </select> */}
                    </>
                }
                {/* <div className="vector-button" onClick={handleVector}>
                        <img src={vector}></img>
                    </div> */}
                <IconButton onClick={handleOpenMenu}>
                    <ExpandMoreIcon />
                </IconButton>
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