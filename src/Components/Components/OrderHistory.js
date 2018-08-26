import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
});



class OrderHistory extends Component {
    constructor(){
        super();

        this.state = ({
            orders: []
        })
    }


    componentDidMount(){
        const user = JSON.parse(localStorage.getItem('user'))
        const userId = user.id;
        axios.get(`/api/user/orderhistory/${userId}`).then( res => {
            console.log("orders", res.data);
            this.setState({
                orders: res.data
            })
        })
    }

    render() {
        const { classes } = this.props;
        const purchases = this.state.orders.cart.map(item => {
            return(
                <div key = {item.id}>
            <Paper className={classes.root}>
                <Grid container spacing={16}>
                  <Grid item>
                    <ButtonBase className={classes.image}>
                      <img className={classes.img} alt="complex" src={item.picture} />
                    </ButtonBase>
                  </Grid>
                  <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={16}>
                      <Grid item xs>
                        <Typography gutterBottom variant="subheading">
                          {item.name}
                        </Typography>
                        <Typography gutterBottom>{item.category}</Typography>
                        <Typography gutterBottom>Size: {item.size}</Typography>
                        <Typography gutterBottom>QTY: {item.qty}</Typography>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Typography variant="subheading">${item.itemTotal}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
              </div>
            )
         });
        const history = this.state.orders.map(({id,date,first_name,last_name,address,city,state,zipcode,total}) => {
            return(
                <div className={id}>
                    <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className={classes.heading}>Order No: {id}</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography>
                        <p>Order Date: {date}</p>
                        <p>Ordered by: {first_name} {last_name}</p>
                        <p>Shipping Info: {address},{city},{state},{zipcode}</p>
                        <p>Items: {purchases}</p>
                        <p>Total: $ {total}</p>
                        </Typography>
                    </ExpansionPanelDetails>
                    </ExpansionPanel>
             </div>)
        });

     return(
       <div>
           { this.state.user.length ?
            {history}
           :
           <h3>Your order history is empty.</h3>
           }
       </div>
        )
    
    }
}


OrderHistory.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OrderHistory);



