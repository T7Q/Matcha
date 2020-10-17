import React from 'react';
import { Badge, Typography, IconButton } from '@material-ui/core';
import { MessageOutlined, PeopleOutline, FavoriteBorder } from '@material-ui/icons';
import { useStyles } from '../../../styles/custom';

const menuItems = [
    {
        title: 'Matches',
        pageUrl: '/matches',
        icon: <PeopleOutline />,
    },
    {
        title: 'Messages',
        pageUrl: '/messages',
        amount: 5,
        icon: <MessageOutlined />,
    },
    {
        title: 'Likes',
        pageUrl: '/likes',
        amount: 3,
        icon: <FavoriteBorder />,
    },
];

const NavItem = ({ auth: { isAuthenticated, user, socket }, isMobile, handleNavigation }) => {
    const classes = useStyles();

    return (
        <>
            {isAuthenticated &&
                user.status === 2 &&
                menuItems.map(menu => (
                    <IconButton
                        key={menu.title}
                        className={classes.customIconButton}
                        onClick={() => handleNavigation(menu.pageUrl)}>
                        <Typography
                            color="textSecondary"
                            className={isMobile ? classes.text : ''}
                            variant="button">
                            <Badge badgeContent={menu.amount} className={classes.pr} color="primary">
                                {menu.icon}
                            </Badge>{' '}
                            {menu.title}
                        </Typography>
                    </IconButton>
                ))}
        </>
    );
};

export default NavItem;
