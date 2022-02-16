import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import MenuItem from '@mui/material/MenuItem';
import {NavLink} from "react-router-dom";

export function AppMainBar() {

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="small"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>

                    <MenuItem>
                        <NavLink to="/"  style={{
                            textDecoration: 'none'
                        }}>
                            <Typography color="white"  >
                                Schedule
                            </Typography>

                        </NavLink>
                    </MenuItem>

                    <MenuItem>
                        <NavLink to="/sprints"   style={{
                         textDecoration: 'none'
                        }}>
                            <Typography color="white" >
                                Sprints
                            </Typography>
                        </NavLink>
                    </MenuItem>
                    <MenuItem>Team</MenuItem>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
