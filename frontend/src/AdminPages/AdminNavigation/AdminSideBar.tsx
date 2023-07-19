import "./AdminSideBar.css";
import { useState, useEffect } from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import BadgeIcon from '@mui/icons-material/Badge';
import RecentActorsOutlinedIcon from '@mui/icons-material/RecentActorsOutlined';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

import Tooltip from '@mui/material/Tooltip';

import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';


interface MenuItem {
    title: string,
    link: string,
    icon: any,
}

type AdminSideBarMenu = MenuItem[];

const sidebarItems: AdminSideBarMenu =
    [
        {
            title: "İstekler",
            link: "/admin",
            icon: StickyNote2Icon,
        },
        {
            title: "Kullanıcılar",
            link: "/admin/users",
            icon: RecentActorsOutlinedIcon,
        },
        {
            title: "Yeni Kullanıcı",
            link: "/admin/register-user",
            icon: BadgeIcon,
        },
        {
            title: "İzin Takvimi",
            link: "/admin/view-off",
            icon: CalendarMonthOutlinedIcon,
        },
    ]

function AdminSideBar() {
    // to check if the bar is open or closed (default is open:)
    const [isOpen, setIsOpen] = useState<boolean>(true);

    // get window width to close bar in some devices:
    const [windowSize, setWindowSize] = useState(window.innerWidth);

    // to change window size:
    useEffect(() => {
        const handleWindowResize = () => {
            setWindowSize(window.innerWidth);
        };
        window.addEventListener('resize', handleWindowResize);
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    // to automatically close bar if window is resized:
    useEffect(() => {
        if (windowSize < 1000)
            setIsOpen(false)
    }, [windowSize]);

    // button handler to check if the bar should be opened:
    const arrowButtonHandler = () => {
        if (isOpen)
            setIsOpen(false)
        else if (!isOpen && windowSize < 800)
            setIsOpen(false)
        else
            setIsOpen(true)
    }

    return (
        <Paper elevation={4} className="sidebar" style={ isOpen ? { width: "15vw" } : { width: "70px" }}>
            <List className="sidebar__first__list">
                <Avatar className="sidebar__arrow"
                    style={isOpen ? { marginLeft: "14vw" } : { marginLeft: "54px" }}
                    onClick={arrowButtonHandler}>
                    {isOpen && <MenuFoldOutlined />}
                    {!isOpen && <MenuUnfoldOutlined />}
                </Avatar>
            </List>
            <List className="sidebar__second__list">
                {sidebarItems.map((item: MenuItem) => 
                        isOpen ?
                            (<a href={item.link}>
                                <ListItem className="sidebar__items">
                                    <ListItemAvatar>
                                        <Avatar className="sidebar__avatar">
                                            <item.icon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    {isOpen && <ListItemText primary={item.title} />}
                                </ListItem>
                                <Divider variant="inset" component="li" className="sidebar__divider" />
                            </a>)
                            : (<Tooltip title={item.title} placement="right">
                                <a href={item.link}>
                                    <ListItem className="sidebar__items">
                                        <ListItemAvatar>
                                            <Avatar className="sidebar__avatar">
                                                <item.icon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        {isOpen && <ListItemText primary={item.title} />}
                                    </ListItem>
                                    <Divider variant="inset" component="li" className="sidebar__divider__closed" />
                                </a>
                            </Tooltip>)
                )}
            </List>
            <List className="sidebar__third__list">
                <Divider variant="middle" />
                <a href="/admin/logout">
                    <ListItem className="sidebar__items">
                        <ListItemAvatar>
                            <Avatar className="sidebar__avatar">
                                <PowerSettingsNewIcon />
                            </Avatar>
                        </ListItemAvatar>
                        {isOpen && <ListItemText primary="Oturumu Kapat" />}
                    </ListItem>
                </a>
            </List>
        </Paper>
    )
}

export default AdminSideBar;