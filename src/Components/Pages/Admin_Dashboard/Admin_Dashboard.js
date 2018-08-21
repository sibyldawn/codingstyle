import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Add_Form from '../../Components/Add_Form';
import Products from '../../Components/Products';
import Orders from '../../Components/Orders';
import access from '../../../Assets/access.gif';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 10 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    fontSize:50,
    marginTop: 100,
  },
});

class AdminDashboard extends React.Component {
  state = {
    value: 0,
    isAdmin: false,
  };

  componentDidMount(){
    axios.get('/api/user/session').then(user => {
        this.setState({
            isAdmin: user.data.admin
        })
        console.log("++++LOG IN USER++++",user.data)
        console.log("Is Admin?",this.state.isAdmin)
        localStorage.setItem('user', JSON.stringify(user.data))}
        
    )}



  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;
    let styles = {
      fontSize: 30
    }
    let picStyle = {
      height: '80%',
      width: '100%'
    }

    return (
    <div>
      { this.state.isAdmin === true ? 
      <div className={classes.root}>
        <AppBar  position="static">
          <Tabs value={value} onChange={this.handleChange}>
            <Tab style={styles}  label="Add a Product" />
            <Tab style={styles}  label="Products" />
            <Tab style={styles}  label="Orders" href="#basic-tabs" />
          </Tabs>
        </AppBar>
        {value === 0 && <TabContainer><Add_Form/></TabContainer>}
        {value === 1 && <TabContainer><Products/></TabContainer>}
        {value === 2 && <TabContainer><Orders/></TabContainer>}
      </div>
      :
      <div>
        <img src="https://media.giphy.com/media/NszxPMom76aWUqxlgp/giphy.gif" alt="Access Denied!" style={picStyle}/>
      </div>
      }
    </div>
    );
  }
}

AdminDashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdminDashboard);