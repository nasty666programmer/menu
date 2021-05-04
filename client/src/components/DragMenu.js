import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import 'antd/dist/antd.css';
import './index.css';
import { Tree } from 'antd';
import { withStyles } from '@material-ui/core';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import DeleteItem from './DeleteItem';
import { BrowserRouter as Router,Link,Switch,Route, BrowserRouter} from 'react-router-dom';
import UpdateItem from './UpdateItem'


const styles = theme => ({
  root: {
    display: 'flex',
    marginTop: '1rem',
    minWidth: 275,
    width: '50%',
    float: 'right',
    height: '100vh',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  containerItem: {
    marginTop: '4rem',
    color: 'red'
  },
  cssa: {
    'height': '3rem',
    'fontSize': ' 20px',
  },
  buttons: {
    fontSize: '1.2rem',
    justifyContent: 'center'
  },
  wrappForm: {
    position: 'absolute',
    margin: 0,
    left: '70%'
  }
});

const x = 3;
const y = 2;
const z = 1;
const gData = [];


class DragMenu extends React.Component {

  constructor(props) {
    super(props);
    this.handlSub = this.handlSub.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  state = {
    gData,
    addData: {_id:null, title: '', key: '', children: [] },
    expandedKeys: ['item1', 'item2', 'item3'],
  };

  handleChange = (e) => {
    const { name, value } = e.currentTarget;
    this.setState({
      addData: {
        _id:Date.now(),
        title: value,
        key: value,
      }
    });
  }

  handlSub(e) {
    e.preventDefault();
    this.setState({ gData: this.state.gData.concat(this.state.addData) })
    if (this.state.gData.length) {

      axios.post('http://localhost:3007/create-structur', { data: this.state.gData })
        .then(res => gData.push(res.data))
        .catch(err => console.log(err))
    } else console.log('иди нахуй')
  }

  componentDidMount() {
    axios.get('http://localhost:3007/data-menu')
      .then(res => this.setState({ gData: res.data }))
      .catch(err => console.log(err))
  }

  onDragEnter = info => {
    console.log(info);
  };

  onDrop = info => {
    console.log(info);
    const dropKey = info.node.key;
    const dragKey = info.dragNode.key;
    const dropPos = info.node.pos.split('-');
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);

    const loop = (data, key, callback) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].key === key) {
          return callback(data[i], i, data);
        }
        if (data[i].children) {
          loop(data[i].children, key, callback);
        }
      }
    };
    const data = [...this.state.gData];

    let dragObj;

    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });

    if (!info.dropToGap) {
      loop(data, dropKey, item => {
        item.children = item.children || [];
        item.children.unshift(dragObj);
      });
    } else if (
      (info.node.props.children || []).length > 0 &&
      info.node.props.expanded &&
      dropPosition === 1
    ) {
      loop(data, dropKey, item => {
        item.children = item.children || [];
        item.children.unshift(dragObj);
      });
    } else {
      let ar;
      let i;
      loop(data, dropKey, (item, index, arr) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        ar.splice(i, 0, dragObj);
      } else {
        ar.splice(i + 1, 0, dragObj);
      }
    }
    this.setState({
      gData: data,
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <Router>
      <Card className={classes.root}>
        <CardContent className={classes.containerItem}>
          <Tree
            className={`draggable-tree ${classes.cssa} contItem`}
            defaultExpandedKeys={this.state.expandedKeys}
            draggable
            blockNode
            onDragEnter={this.onDragEnter}
            onDrop={this.onDrop}
            treeData={this.state.gData}
          />
          
        </CardContent>
        <CardActions className={classes.wrappForm}>
          <Link to='/update-item'>update</Link>
          <TextField type={'text'} id="standard-basic" label="add your item" value={this.state.addData.title} onChange={this.handleChange} />
          <Button color={'primary'} className={classes.buttons} onClick={this.handlSub}>Save</Button>
          <DeleteItem />
        </CardActions>

        <Switch>
            <Route  path={'/update-item'}>
                <UpdateItem />
            </Route> 
          </Switch>   
      </Card>
      </Router>
    );
  }
}

export default withStyles(styles)(DragMenu);



