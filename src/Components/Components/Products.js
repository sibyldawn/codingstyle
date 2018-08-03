import React, { Component } from 'react';
import { Grid,Row,Col,Button,Media} from 'react-bootstrap'
 
export default class Products extends Component {
    render() {
        return (
            <div>
             <Media>
                <Media.Left>
                <img width={64} height={64} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhaM7wMcPIMCYEbmg2fZCcD5mKpTDYDu8Hj53pN0klqnUM0lZq"  alt="thumbnail" />
                </Media.Left>
                <Media.Body>
                <Media.Heading>Media Heading</Media.Heading>
                <p>
                    Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque
                    ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at,
                    tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate
                    fringilla. Donec lacinia congue felis in faucibus.
                </p>
                </Media.Body>
            </Media>
            <Media>
                <Media.Left>
                <img width={64} height={64} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhaM7wMcPIMCYEbmg2fZCcD5mKpTDYDu8Hj53pN0klqnUM0lZq"  alt="thumbnail" /> alt="thumbnail" />
                </Media.Left>
                <Media.Body>
                <Media.Heading>Media Heading</Media.Heading>
                <p>
                    Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque
                    ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at,
                    tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate
                    fringilla. Donec lacinia congue felis in faucibus.
                </p>
                </Media.Body>
              </Media>
            </div>
        );
    }
}