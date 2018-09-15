import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';



const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200,
    },
    menu: {
      width: 200,
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
      selectEmpty: {
        marginTop: theme.spacing.unit * 2,
      },
  });

  class UserInfo extends Component {
        constructor(){
            super();

            this.state={
                user:[],
                first_name: '',
                last_name:'',
            }
        }

    
        handleChangeFirst = (first) => {
            this.setState({
                first_name: first
            })
        }
        handleChangeLast = (last) => {
            this.setState({
                last_name: last
            })
        }


        saveUserName =(userId) => {
            if( !this.state.first_name   ){
                alert('Please enter your firstname.')
                return 
            }
            if( !this.state.last_name  ){
                alert('Please enter your lastname.')
                return 
            }
           

            let userName = {
                first_name: this.state.first_name,
                last_name: this.state.last_name,
           
            };
            
              console.log(userName)
            axios.post(`/api/user/userinfo/${this.props.id}`,userName).then(response => {
                  console.log('------userName',userName);
                  console.log('----addedInfo', response);
                let line= response.data
                  console.log(line)
                this.setState ({
                    user: line,
                    first_name: line.first_name,
                    last_name: line.last_name
                    
                })
                
            })
           }

          render() {
        
                console.log("USER ID===========>", this.state.user.id) 

            const { classes } = this.props;
            return (
                <div>
                     <form className={classes.container} noValidate autoComplete="on">
                            <TextField
                            required
                            id="required"
                            label="First Name"
                            type="text"
                            value={this.state.first_name}
                            onChange={(e)=>this.handleChangeFirst(e.target.value)}
                            className={classes.textField}
                            margin="normal"
                            />
                            <TextField
                            required
                            type="text"
                            id="required"
                            label="Last Name"
                            value={this.state.last_name}
                            onChange={(e)=>this.handleChangeLast(e.target.value)}
                            className={classes.textField}
                            margin="normal"
                            />
                        </form>
                        <br/>
                        <button onClick={this.saveUserName} className="btn-grad" width={100}>SAVE USER INFORMATION</button>

                 </div>

            )
          }
    };  
  
    UserInfo.propTypes = {
        classes: PropTypes.object.isRequired,
      };
      
      export default withStyles(styles)(UserInfo);