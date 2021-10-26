import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Link from 'next/link'


function AddNavv() {

  return (
    <div>
      <AppBar position="static">
        <Toolbar className="bar2">
    
          <button id="inv"> <Link href="/inventory">Back to inventory</Link></button>
        </Toolbar>
      </AppBar>
    </div>
  );
}


export default AddNavv;