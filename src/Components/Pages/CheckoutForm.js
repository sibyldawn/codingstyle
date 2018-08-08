import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import ShippingInfo from '../Pages/ShippingInfo';

const styles = theme => ({
    root: {
      marginTop: '300px',  
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
    return ['Confirm User Information', 'Add Shipping Information', 'Payment Method','Place Your Order'];
  }
  
  function getStepContent(step, first_name, last_name,email) {
      
    switch (step) {
      case 0:
        return (<div>
                {/* <img src={picture} height="100" width="100"/> */}
                <div>
                 Name: <h4>{first_name} {last_name}</h4>
                 E-mail: <h4>{email}</h4>
                 
                 </div>
            </div>);
      case 1:
        return (<ShippingInfo/>);
    case 2:
        return `Try out different ad text to see what brings in the most customers,
                and learn how to enhance your ads using features like ad extensions.
                If you run into any problems with your ads, find out how to tell if
                they're running and how to resolve approval issues.`;
    case 3:
        return `Try out different ad text to see what brings in the most customers,
                and learn how to enhance your ads using features like ad extensions.
                If you run into any problems with your ads, find out how to tell if
                they're running and how to resolve approval issues.`;
      default:
        return 'Unknown step';
    }
  }


class CheckoutForm extends Component {
    constructor(){
        super();

        this.state={
            user: [],
            activeStep:0,
        }
       
    }

    componentDidMount(){
        axios.get('/api/user/session').then(user => {
            console.log("=====userLogin",user);
        this.setState({
            user: user.data,
            
        })
     })
    }
  

   
    
    logout(){
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
    
      render() {
        const { classes } = this.props;
        const steps = getSteps();
        const { activeStep } = this.state;
    
        return (
          <div id='stepper' className={classes.root}>
            <Stepper activeStep={activeStep} orientation="vertical" >
              {steps.map((label, index) => {
                return (
                  <Step key={label} >
                    <StepLabel >{label}</StepLabel>
                    <StepContent>
                      <Typography variant="headline">
                     
                      {getStepContent(index, this.state.user.first_name, this.state.user.last_name, this.state.user.email,this.state.user.id)}
                      
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
        );
      }
    }
    
    CheckoutForm.propTypes = {
      classes: PropTypes.object,
    };

export default withStyles(styles)(CheckoutForm);

// {this.state.user != null ?
//     <div> <h1>Welcome {this.state.user.first_name} !!!</h1> </div>
//      :
//      <div ><h4>PLEASE SIGN IN</h4></div>
//   }