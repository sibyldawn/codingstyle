import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ShippingInfo from '../Pages/ShippingInfo';
import Stripe from './Stripe';
import {updateTotal} from '../../ducks/reducer';
import UserInfo from './UserInfo';





const styles = theme => ({
    root: {
      ...theme.mixins.gutters(),
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2,
      marginTop: '100px',  
      margin: 'auto',
      width: '90%',
      fontSize: 50,
      
    },
    button: {
      marginTop: theme.spacing.unit,
      marginRight: theme.spacing.unit,
    },
    actionsContainer: {
      marginBottom: theme.spacing.unit * 2,
    },
    resetContainer: {
      padding: theme.spacing.unit * 3,
    },

  });

  function getSteps() {
    return ['Did You Login?', 'Add Shipping Information', 'Place Your Order'];
  }
  
  function getStepContent(step, first_name, last_name,email,user,userAddress,userCity,userState,userZipcode,findAddress,total,id) {
        console.log(total)
    switch (step) {
      case 0:   
        return (<div>
               { first_name 
               ?
                <div>
                 Name: <p>{first_name} {last_name}</p>
                 E-mail: <h4>{email}</h4>
                 </div>
                 :
                  <UserInfo id={id}/>
               }
            </div>);
      case 1: return(  <ShippingInfo  />);
                
      
               
      case 2:
         return ( <div>
                
                <h4>Sub Total:$ {JSON.parse(localStorage.getItem('total'))}</h4>
                  <hr/>
                <Stripe />
                 
                </div>
                );
                      
      default:
        return 'Unknown step';
    }
  }


class CheckoutForm extends Component {
    constructor(){
        super();

        this.state={
          user:JSON.parse(localStorage.getItem('user')) || [],
          total: JSON.parse(localStorage.getItem('total')) || 0,
          userAddress: '',
          userCity: '',
          userState: '',
          userZipcode: 0,
          activeStep:0,
          isAuthenticated: false,
      }

  }

  componentDidMount(){
    if(this.state.user!== null){
      this.setState({
          isAuthenticated: true,
      })
    }else{
      this.login();
      }
  }

  login(){
    localStorage.setItem('location', window.location.pathname)
    const local = localStorage.getItem('location')
    const redirectUri = encodeURIComponent(`${window.location.origin}/auth/callback`);

    window.location = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/authorize?client_id=${process.env.REACT_APP_AUTH0_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${redirectUri}&response_type=code`
  
}
    
    
    logout=()=>{
      localStorage.clear();
      window.location.reload();
        axios.post('/api/logout').then(response => {
            this.setState({
                user:''
            })
           
        })
    }

    handleNext = () => {
        this.setState(state => ({
          activeStep: state.activeStep + 1,
        }));
      };
    
      handleBack = () => {
        this.setState(state => ({
          activeStep: state.activeStep - 1,
        }));
      };
    
      handleReset = () => {
        this.setState({
          activeStep: 0,
        });
      };
    
     
      findSavedInfo = (userId) => {
        axios.get(`/api/user/shipping/?userId=${userId}`).then(response => {
          this.setState({
            userAddress: response.data.address,
            userCity: response.data.city,
            userState: response.data.state,
            userZipcode: response.data.zipcode,
          })
        })
      }
      

      render() {
        
        //   console.log(this.state)
          console.log("SESSION USER====>",this.state.user)
        const { classes } = this.props;
        const steps = getSteps();
        const { activeStep } = this.state;
    
        return (
        <div>
          <Paper className={classes.root} elevation={1}>
          <div id='stepper' className={classes.root}>
            <Stepper activeStep={activeStep} orientation="vertical" >
              {steps.map((label, index) => {
                return (
                  <Step key={label} >
                    <StepLabel >{label}</StepLabel>
                    <StepContent>
                      <Typography variant="headline">
                     
                      {getStepContent(index, this.state.user.first_name, this.state.user.last_name, this.state.user.email,this.state.user.total,
                      this.state.userAddress,this.state.userAddress,this.state.userState,this.state.userZipcode,this.state.total, this.logout,this.state.user.id )}
                      
                      </Typography>
                      <div className={classes.actionsContainer}>
                        <div>
                          <Button
                            disabled={activeStep === 0}
                            onClick={this.handleBack}
                            className={classes.button}
                          >
                            Back
                          </Button>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={this.handleNext}
                            className={classes.button}
                          >
                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                          </Button>
                        </div>
                      </div>
                    </StepContent>
                  </Step>
                
                );
              })}
            </Stepper>
            {activeStep === steps.length && (
              <Paper square elevation={0} className={classes.resetContainer}>
                <Typography variant="headline">All steps completed - you&quot;re finished</Typography>
                <Button onClick={this.handleReset} className={classes.button}>
                  Reset
                </Button>
              </Paper>
            )}
          </div>
          </Paper>
          <div>
          <Link to="/"><button className="btn-grad ">Keep Shopping</button></Link>
          <Link to="/"><button onClick={this.logout} className="btn-grad">Log Out</button></Link>
          </div>
        </div>
        );
      }
    }
    
    CheckoutForm.propTypes = {
      classes: PropTypes.object,
    };

    function mapStateToProps(state){
      return {
          total: state.total,
      }
  }

export default connect(mapStateToProps,{updateTotal})(withStyles(styles)(CheckoutForm));

