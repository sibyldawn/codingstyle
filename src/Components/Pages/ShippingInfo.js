import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';


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

  class ShippingInfo extends Component {
        constructor(){
            super();

            this.state={
                user:[],
                total: 0,
                user_id: 0,
                address: '',
                city: '',
                state: '',
                zipcode: 0,
                shippingInfo:[]
            }
        }

        componentDidMount(){
            axios.get('/api/user/session').then(user => {
                console.log("=====userLogin",user);
                axios.get(`/api/user/shipping?user_id=${user.data.id}`).then(response => {
                    console.log('nested axios', response.data)
                    this.setState({
                        user: user.data,
                        shippingInfo: response.data
                    })
                })
            
         })
        }

        handleChangeAddress = (address) => {
            this.setState({
                address: address
            })
        }
        handleChangeCity = (city) => {
            this.setState({
                city: city
            })
        }

        handleChangeState = (state) => {
            this.setState({
                state: state
            })
        }
        handleChangeZipcode = (zipcode) => {
            this.setState({
                zipcode: zipcode
            })
        }


        saveShippingInfo =(userId) => {
            if( !this.state.address   ){
                alert('Please enter your address.')
                return 
            }
            if( !this.state.city  ){
                alert('Please enter your city.')
                return 
            }
            if( !this.state.state   ){
                alert('Please choose your state.')
                return 
            }
            if( !this.state.zipcode   ){
                alert('Please enter your 5-digit Zipcode.')
                return 
            }

            let userAddress = {
                address: this.state.address,
                city: this.state.city,
                state: this.state.state,
                zipcode: this.state.zipcode
            };
            
            console.log(userAddress)
            axios.post(`/api/user/shipping/${this.state.user.id}`,userAddress).then(response => {
                console.log('------userAddress',userAddress);
                console.log('----addedInfo', response);
                let line= response.data
                console.log(line)
                let data;
                this.setState ({
                    userid: line.user_id,
                    address: line.address,
                    city: line.city,
                    state: line.state,
                    zipcode: line.zipcode,
                    
                })
                
            })
           }

          render() {
            
             const shippingInfo = this.state.shippingInfo.map( info => {
                 return <div key={info.id}>
                            <h4>{info.address}</h4> 
                            <h4>{info.city}, {info.state}</h4>
                            <h4>{info.zipcode}</h4>
                            
                        </div>
             })
              console.log("USER ID===========>", this.state.user.id)  
              console.log("SHIPPING INFO state",this.state.shippingInfo);

            const { classes } = this.props;
            return (
                <div>
                    {this.state.shippingInfo !== null ?
                        <div>
                            <span>SHIPPING INFORMATION:</span>
                                <Paper className={classes.root} elevation={1}>
                                 {shippingInfo}
                                 </Paper>

                        </div>

                        :
                    <div>
                    
                        <form className={classes.container} noValidate autoComplete="on">
                            <TextField
                            required
                            id="required"
                            label="Street Address"
                            type="text"
                            defaultValue={this.state.address}
                            onChange={(e)=>this.handleChangeAddress(e.target.value)}
                            className={classes.textField}
                            margin="normal"
                            />
                            <TextField
                            required
                            type="text"
                            id="required"
                            label="City"
                            value={this.state.city}
                            onChange={(e)=>this.handleChangeCity(e.target.value)}
                            className={classes.textField}
                            margin="normal"
                            />
                            <FormControl required className={classes.formControl}>
                                <InputLabel htmlFor="state-required">State</InputLabel>
                                <Select
                                    value={this.state.state}
                                    onChange={(e)=>this.handleChangeState(e.target.value)}
                                    name="state"
                                    inputProps={{
                                    id: 'state-required',
                                    }}
                                    className={classes.selectEmpty}
                                >
                                    <MenuItem value="">
                                    <em>None</em>
                                    </MenuItem>
                                        <MenuItem value="default">SELECT</MenuItem>
                                        <MenuItem value="AL">AL</MenuItem>
                                        <MenuItem value="AK">AK</MenuItem>
                                        <MenuItem value="AR">AR</MenuItem>	
                                        <MenuItem value="AZ">AZ</MenuItem>
                                        <MenuItem value="CA">CA</MenuItem>
                                        <MenuItem value="CO">CO</MenuItem>
                                        <MenuItem value="CT">CT</MenuItem>
                                        <MenuItem value="DC">DC</MenuItem>
                                        <MenuItem value="DE">DE</MenuItem>
                                        <MenuItem value="FL">FL</MenuItem>
                                        <MenuItem value="GA">GA</MenuItem>
                                        <MenuItem value="HI">HI</MenuItem>
                                        <MenuItem value="IA">IA</MenuItem>	
                                        <MenuItem value="ID">ID</MenuItem>
                                        <MenuItem value="IL">IL</MenuItem>
                                        <MenuItem value="IN">IN</MenuItem>
                                        <MenuItem value="KS">KS</MenuItem>
                                        <MenuItem value="KY">KY</MenuItem>
                                        <MenuItem value="LA">LA</MenuItem>
                                        <MenuItem value="MA">MA</MenuItem>
                                        <MenuItem value="MD">MD</MenuItem>
                                        <MenuItem value="ME">ME</MenuItem>
                                        <MenuItem value="MI">MI</MenuItem>
                                        <MenuItem value="MN">MN</MenuItem>
                                        <MenuItem value="MO">MO</MenuItem>	
                                        <MenuItem value="MS">MS</MenuItem>
                                        <MenuItem value="MT">MT</MenuItem>
                                        <MenuItem value="NC">NC</MenuItem>	
                                        <MenuItem value="NE">NE</MenuItem>
                                        <MenuItem value="NH">NH</MenuItem>
                                        <MenuItem value="NJ">NJ</MenuItem>
                                        <MenuItem value="NM">NM</MenuItem>			
                                        <MenuItem value="NV">NV</MenuItem>
                                        <MenuItem value="NY">NY</MenuItem>
                                        <MenuItem value="ND">ND</MenuItem>
                                        <MenuItem value="OH">OH</MenuItem>
                                        <MenuItem value="OK">OK</MenuItem>
                                        <MenuItem value="OR">OR</MenuItem>
                                        <MenuItem value="PA">PA</MenuItem>
                                        <MenuItem value="RI">RI</MenuItem>
                                        <MenuItem value="SC">SC</MenuItem>
                                        <MenuItem value="SD">SD</MenuItem>
                                        <MenuItem value="TN">TN</MenuItem>
                                        <MenuItem value="TX">TX</MenuItem>
                                        <MenuItem value="UT">UT</MenuItem>
                                        <MenuItem value="VT">VT</MenuItem>
                                        <MenuItem value="VA">VA</MenuItem>
                                        <MenuItem value="WA">WA</MenuItem>
                                        <MenuItem value="WI">WI</MenuItem>	
                                        <MenuItem value="WV">WV</MenuItem>
                                        <MenuItem value="WY">WY</MenuItem>  
                                </Select>
                                <FormHelperText>Required</FormHelperText>
                                </FormControl>
                            <TextField
                            required
                            type="number"
                            id="required"
                            label="ZIPCODE"
                            value={this.state.zipcode}
                            onChange={(e)=>this.handleChangeZipcode(e.target.value)}
                            className={classes.textField}
                            pattern="[0-9]{5}"
                            margin="normal"
                            />
                        </form>
                        <button onClick={this.saveShippingInfo}>SAVE SHIPPING INFORMATION</button>
                        </div>
              }
                 </div>

                )
          }
    };  
  
    ShippingInfo.propTypes = {
        classes: PropTypes.object.isRequired,
      };
      
      export default withStyles(styles)(ShippingInfo);