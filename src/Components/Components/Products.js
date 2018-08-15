import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import axios from 'axios';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'scroll',
    height: '400',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: '100%',
    height: '80%',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
});

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */



class Products extends Component {
    constructor(props){
        super()

        this.state={
            products:[]
        }
    }
  
    componentDidMount(){
        axios.get('/api/products').then(response => {
            console.log("products response", response);
            this.setState({
                products: response.data
            })
        })
    }



render(){
    const { classes } = this.props;
    const products = this.state.products.map(tile => {
        return <div> <GridListTile key={tile.id}>
          <figure><img src={tile.picture} alt={tile.name} height={300} width={300}/></figure>
          <GridListTileBar
            title={tile.name}
            price={<p>$ {tile.price}</p>}
            category={<p>Category: {tile.category}</p>}
            // actionIcon={
            //   <IconButton className={classes.icon}>
               
            //   </IconButton>
            // }
          />
        </GridListTile>
        </div>
    })
  return (
    <div className={classes.root}>
      <GridList cellHeight={500} className={classes.gridList}>
        <GridListTile key="Subheader" cols={4} style={{ height: 'auto' }}>
          <ListSubheader component="div"><h3>Inventory</h3></ListSubheader>
        </GridListTile>
         {products}
      </GridList>
    </div>
  );
 }
}

Products.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Products);
  