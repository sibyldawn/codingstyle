import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Add_Form from '../../Components/Add_Form';
import Products from '../../Components/Products';
import Orders from '../../Components/Orders';

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
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;
    let styles = {
      fontSize: 30
    }

    return (
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
    );
  }
}

AdminDashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdminDashboard);