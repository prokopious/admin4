import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Link from 'next/link'


function Navv() {

  return (
    <div>
      <AppBar className="bar" position="static">
        <Toolbar className="bar">
        <Typography className="menus" color="inherit">
        <Link href="/">Home</Link>
          </Typography>
          <Typography className="menus" color="inherit">
          <Link href="/emails">Mail</Link>
          </Typography>
          <Typography  className="menus" color="inherit">
            <Link href="/inventory">Inventory</Link>
          </Typography>
          <Button id="x"> <Link href="/profile">Login</Link></Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}


export default Navv;