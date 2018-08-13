import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Redirect } from 'react-router-dom';
import './OrderConfirm.css';
import axios from 'axios';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});

let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}

const data = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

class OrderConfirm extends Component {
    constructor(props){
        super();

        this.state = {
            order: [],
        }
    }


    componentDidMount(){
        axios.get(`/api/orderconfirmation/${this.props.orderId}`).then(order => {
          console.log("order confirmation", order)
            this.setState({
                order: order.data
            })
        })
    }

 render() {
  
    const { classes } = this.props;
    const data = this.state.order.map(n => {
      return (
        <div key={n.id}>
          <h3>Thank you for your Order!</h3>
          <h4>Order Date: {n.date}</h4>
          <h4>Order ID: {n.id}</h4>
          <h4>Total: {n.total}</h4>
        </div>
      );
    })

  return (
   <div className="confirm-body">
   <Paper>
   {data} 
   </Paper>
  </div>
  );
 }
}

OrderConfirm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OrderConfirm);