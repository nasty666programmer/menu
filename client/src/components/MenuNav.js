import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import axios from 'axios';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  wrappMenu: {
    marginTop: '3rem',
  },
  menuCont: {
    color:'black',
    border:'1px solid black',
    marginLeft:'1rem'
  }
}));


function MenuNav() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [items, setItems] = useState([]);
 
  useEffect(() => {
    axios.get('http://localhost:3007/data-menu')
      .then(res => setItems(res.data))
      .catch(err => console.log(err))
  }, [])

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const renderMenu = (item, arr = []) => {
    item.children.map(element => {
      if (element.children && element.children.length) {
        arr.push(element.title)
        renderMenu(element, arr)
      } else {
        arr.push(element.title)
      }
    })
    return arr
  }

  return (
    <div className={classes.root}>
      {items.length && items.map((el, i) =>
        <div key={i}>
          <Button className={`${classes.menuCont}`} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
            {el.title}
          </Button>
          <Menu
            className={classes.wrappMenu}
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {
              renderMenu(el).map((elements, i) => <div>
                <Menu
            className={classes.wrappMenu}
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
                <MenuItem style={{ 'marginLeft': `${i}rem` }} onClick={handleClose}>{elements}</MenuItem>
                </Menu>
              </div>)
            }
          </Menu>
        </div>
      )}
    </div>
  );
}

export default MenuNav;















