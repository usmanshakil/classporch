
import React, {Component} from 'react'
import { Grid } from 'semantic-ui-react'
import ReactStars from 'react-stars'


class RatingSection extends Component {
    render(){
        const { userId, presentProfileId, profile } = this.props;
        const name = profile['full-name'] ? profile['full-name'].split(' ')[0]+"'s " : null;
        
        return(
            <Grid padded relaxed style={{width:'100%'}} >
                <Grid.Row centered >
                    <Grid.Column width={12} textAlign='left' >
                        <div style={styles.text} > 
                        { userId === presentProfileId ? 'Your ' : name }
                            average rating is :  
                        </div>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row centered >
                    <Grid.Column width={12} textAlign='left' >
                        <ReactStars
                            value = {this.props.averageRating||0}
                            count={5}
                            edit={false}
                            size={30}
                            color2={'#ffd700'} />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}

const styles = {
    text:{
        fontSize:'15px',
        marginTop:'20px'
    }
};

export default RatingSection

// const mapStateToProps = ({profileState}) => {
//     const {averageRating} = profileState

//     return  {averageRating}
// }

// export default connect(mapStateToProps,{})(RatingSection)

