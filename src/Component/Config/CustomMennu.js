import React ,{useState,useEffect} from 'react'

import IconButton from '@mui/material/IconButton';

import { useSelector, useDispatch } from 'react-redux'



import { styled, alpha } from '@mui/material/styles';

// import Cookies from 'universal-cookie';

import {useTranslation} from "react-i18next";
import {useNavigate} from 'react-router-dom'
import {Menu,Box, Button} from '@mui/material'
// import * as RiIcons from 'react-icons/ri'
import SettingsIcon from '@mui/icons-material/Settings';
const StyledMenu = styled((props) => (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      {...props}
    />
  ))(({ theme,GridTheme }) => ({
    '& .MuiPaper-root': {
      borderRadius: 6,
      marginTop: theme.spacing(1),
      minWidth: 180,
      backgroundColor: GridTheme?.paperColor,
      color:GridTheme?.disabledGlobalText?GridTheme?.gloablTextColor:GridTheme?.paperTextColor,
      boxShadow:
        'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
      '& .MuiMenu-list': {
        padding: '4px 0',
      },
      '& .MuiMenuItem-root': {
        '& .MuiSvgIcon-root': {
          fontSize: 18,
          color: theme.palette.text.secondary,
          marginRight: theme.spacing(1.5),
        },
        '&:active': {
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.action.selectedOpacity,
          ),
        },
      },
      '& .itmlist:hover': {
        backgroundColor:GridTheme?.paperTextColor+'55',
      },
    },
  }));
// const cookies=new Cookies();
export default function DropDownGrid(props) {
    const {t, i18n} = useTranslation('common');
    const navigate = useNavigate();
  
    // @ts-ignore
    const dispatch=useDispatch(props);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = (dire) => {
      setAnchorEl(null);
    };
  
    const signOut=()=>{
      // cookies.remove("token");
      // window.location.href='/'
      navigate('/')
      
    }
    
    const signIn=()=>{
      // window.location.href='/'
      navigate('/')
    }
  
    return (
        <React.Fragment>
        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
          
          {/* <Tooltip title={props?.title}> */}
            <Button
              onClick={handleClick}
              variant="contained"
              size="small"
              sx={{ ml: 2 }}
              color="primary"
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
               <SettingsIcon fontSize='medium' sx={{fontSize:'25px'}}/>
            </Button>
          {/* </Tooltip> */}
        </Box>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                left: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
            {props?.children}
          
        </Menu>
      </React.Fragment>
    )
}
