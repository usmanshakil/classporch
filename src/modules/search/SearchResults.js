import React, {Component} from 'react'
import { Grid, Header, Segment,Loader } from 'semantic-ui-react'
import { SearchSection } from './sections'
import { connect } from 'react-redux'
import { searchRequested } from '../../redux/actions'

class SearchResults extends Component {

    componentDidMount(){
        this.props.searchRequested('',this.props.authToken)
    }

    onClickResult = (e,data) => {
        console.log(e)
    };

    renderSearchResults = (results,authToken) => {
        if(!results.length || !results){
            return (
                <Grid.Row centered style={{ fontSize:'1.3em',fontWeight:100 }} >
                    No tutors found for the searched keywords. Please try again.
                </Grid.Row>
            )
        }
        return results.map(result => {
            return <SearchSection result = {result} authToken={authToken} key={result.id} />
        })
    };

    renderLoader = () => {
        return(
            <Segment style={{flex:1,height:'700px'}} >
                <Loader active content='Loading, please wait...' />

            </Segment>
        )
    };

    render(){
        const { loadingSearch,searchResults,authToken } = this.props;
        return(
            <div style={{display:'flex',justifyContent:'center',marginBottom:'40px',minHeight:'700px'}}>
                <Grid  style={{width:'60%'}} >
                    <Grid.Row textAlign='left' >
                        <Header size='large' style={{ paddingTop:'20px' }} > Tutors </Header>
                    </Grid.Row> 
                    { loadingSearch ? this.renderLoader() : this.renderSearchResults(searchResults,authToken) }
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = ({search,auth}) => {
    const { searchResults,loadingSearch } = search;
    const {authToken} = auth;

    return { searchResults,loadingSearch,authToken }
};

export default connect(mapStateToProps,{ searchRequested })(SearchResults)