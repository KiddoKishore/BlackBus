import logo from '../assets/images/logo.png';
import { AppBar, Toolbar, Typography, Button, Tooltip, Menu, MenuItem, Link } from '@mui/material';
import { ContactSupportOutlined, AccountCircleOutlined } from '@mui/icons-material';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCredentials } from '../slices/authSlice';

export default function Header() {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth)
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  
  return (
    <AppBar position="static" style={{ background: 'rgba(0, 0, 0, 0.3)' }} className='backdrop-blur'>
      <Toolbar className="flex justify-between">
        <Typography variant="h6" className="text-white cursor-pointer ml-[5%]">
          <Link href='/' underline='none'>
            <img src={logo} alt='logo' className='md:w-[10%] w-[20%] m-2'/>
          </Link>
        </Typography>
        <div className='flex mr-[5%]'>
          <Link href='/help' underline='none' color='white'>
          <Button color="inherit" className="m-4">
            <Tooltip title='Customer Support'>
            <div>
              <ContactSupportOutlined />
              Help
            </div>
            </Tooltip>
          </Button>
          </Link>
          <Button color="inherit" className="m-4">
            { userInfo ? (
              <>
              <Tooltip title='Account' onClick={handleOpenUserMenu}>
              <div>
                <AccountCircleOutlined />
                {userInfo.name}
              </div>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
                <MenuItem onClick={handleCloseUserMenu}>
                  <Link href='/tickets' underline='none' color='black'>
                    <Typography textAlign="center">View Tickets</Typography>
                  </Link>
                </MenuItem>
                <MenuItem onClick={() => dispatch(setCredentials(null)) }>
                    <Typography textAlign="center">Logout</Typography>
                </MenuItem>
            </Menu>
              </>
            ) : (
              <>
              <Tooltip title='Account' onClick={handleOpenUserMenu}>
              <div>
                <AccountCircleOutlined />
                Account
              </div>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
                <MenuItem onClick={handleCloseUserMenu}>
                  <Link href='/login' underline='none' color='black'>
                    <Typography textAlign="center">Sign In</Typography>
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Link href='/register' underline='none' color='black'>
                    <Typography textAlign="center">Sign Up</Typography>
                  </Link>
                </MenuItem>
            </Menu>
              </>
            ) }
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}