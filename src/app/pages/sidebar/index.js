import React, { useState } from 'react';
import './index.scss';
import {
    ProSidebar,
    Menu,
    SubMenu,
    MenuItem,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
} from 'react-pro-sidebar';
import { FaList, FaRegHeart } from 'react-icons/fa';
import { FiHome, FiLogOut, FiArrowLeftCircle, FiArrowRightCircle } from 'react-icons/fi';
import { RiPencilLine } from 'react-icons/ri';
import { BiCog } from 'react-icons/bi';
import { SiApacheairflow } from 'react-icons/si';
import { GiAbstract050 } from 'react-icons/gi';
import 'react-pro-sidebar/dist/css/styles.css';
// import bgImage from '../../assets/image/bg.jpg';

const Sidebar = () => {
    const [menuCollapse, setMenuCollapse] = useState(false)

    const menuIconClick = () => {
        menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
    };

    return (
        <div>
            <div id='header'>
                <ProSidebar collapsed={menuCollapse} >
                    <SidebarHeader>
                        <div className='logotext'>
                            <p>{menuCollapse ? <GiAbstract050 /> : <SiApacheairflow />}</p>
                        </div>
                        <div className='closemenu' onClick={menuIconClick}>
                            {menuCollapse ? (
                                <FiArrowRightCircle />
                            ) : (
                                <FiArrowLeftCircle />
                            )}
                        </div>
                    </SidebarHeader>
                    <SidebarContent>
                        <Menu iconShape='circle'>
                            <MenuItem active={true} icon={<FiHome />}>
                                Home
                            </MenuItem>
                            <SubMenu title='Category' icon={<FaList />}>
                                <MenuItem>Submenu 1</MenuItem>
                                <MenuItem>Submenu 2</MenuItem>
                                <MenuItem>Submenu 3</MenuItem>
                            </SubMenu>
                            <MenuItem icon={<FaRegHeart />}>Favourite</MenuItem>
                            <MenuItem icon={<RiPencilLine />}>Author</MenuItem>
                            <MenuItem icon={<BiCog />}>Settings</MenuItem>
                        </Menu>
                    </SidebarContent>
                    <SidebarFooter>
                        <Menu iconShape='circle'>
                            <MenuItem icon={<FiLogOut />}>Logout</MenuItem>
                        </Menu>
                    </SidebarFooter>
                </ProSidebar>
            </div>
        </div>
    )
}

export default Sidebar;