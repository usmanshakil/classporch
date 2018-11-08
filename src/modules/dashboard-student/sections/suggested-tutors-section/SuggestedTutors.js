import React from 'react';
import {Grid, Card, Icon, Label} from 'semantic-ui-react';
import './styles.css';
import {connect} from 'react-redux';
import {ProfileTile} from './ProfileTile';

class SuggestedTutors extends React.Component {

  state = {
    allTutorProfiles: [],
    displayedTutorProfiles: [],
    pageStart: 0,
    totalPages: 0
  };

  componentDidMount() {
    if (!this.props.suggestedTutors || !this.props.suggestedTutors.length) {
      return
    }
   
    this.initializeSuggestedTutors(this.props.suggestedTutors)
  }

  componentWillReceiveProps(nextProps) {
 
    if (this.props.suggestedTutors !== nextProps.suggestedTutors) {
      this.initializeSuggestedTutors(nextProps.suggestedTutors)
    }
  }

  initializeSuggestedTutors = (suggestedTutors) => {

    console.log(suggestedTutors);
    const pageStart = this.state.pageStart;
    const pageEnd = pageStart + 1;
    const totalPages = parseInt(suggestedTutors.length / 20);
    this.setState({
      allTutorProfiles: suggestedTutors,
      displayedTutorProfiles: suggestedTutors.slice(pageStart * 20, pageEnd * 20),
      totalPages
    })
  };

  populateGridColumns(profiles) {
   
    return profiles.map((profile, i) => ( <ProfileTile profile={profile} key={i}/> ))
  }

  goPrevious = () => {
    let {pageStart, allTutorProfiles} = this.state;
    let pageStartPrev = pageStart - 1;
    let pageEndPrev = pageStart;

    this.setState({
      pageStart: pageStartPrev,
      displayedTutorProfiles: allTutorProfiles.slice(pageStartPrev * 20, pageEndPrev * 20)
    })

  };

  goNext = () => {
    let {pageStart, allTutorProfiles} = this.state;
    let pageStartNext = 1 + pageStart;
    let pageEndNext = 1 + pageStartNext;

    this.setState({
      pageStart: pageStartNext,
      displayedTutorProfiles: allTutorProfiles.slice(pageStartNext * 20, pageEndNext * 20)
    })
  };

  onPageNumberClick = (clickedPage) => {
    let {allTutorProfiles} = this.state;
    let pageStart = clickedPage;
    let pageEnd = 1 + clickedPage;

    this.setState({
      pageStart: pageStart,
      displayedTutorProfiles: allTutorProfiles.slice(pageStart * 20, pageEnd * 20)
    })
  };

  renderPageNumbers = (totalPages) => {
    let labels = [];
    for (let i = 0; i <= totalPages; i++) {
      labels.push(
        <Label circular color='yellow' size='medium' className='page-number-dot' key={i}
               onClick={this.onPageNumberClick.bind(this, i)}>
          {i + 1}
        </Label>
      )
    }
    return (
      <Label.Group circular className='page-number-styles'>
        {labels}
      </Label.Group>
    )
  };

  renderCarousels = (pageStart, totalPages) => {
    if (pageStart === 0) {
      return (
        <Grid.Row centered>
          <Grid.Column width={2}>
          </Grid.Column>
          <Grid.Column width={2} textAlign='right'>
            {this.renderPageNumbers(totalPages)}
          </Grid.Column>
          <Grid.Column width={2} textAlign='left'>
            <Icon name='chevron right' size='large' color='grey' onClick={this.goNext}/>
          </Grid.Column>
        </Grid.Row>
      )
    } else if (pageStart === totalPages) {
      return (
        <Grid.Row centered>
          <Grid.Column width={2} textAlign='right'>
            <Icon name='chevron left' size='large' color='grey' onClick={this.goPrevious}/>
          </Grid.Column>
          <Grid.Column width={2} textAlign='left'>
            {this.renderPageNumbers(totalPages)}
          </Grid.Column>
          <Grid.Column width={2}>
          </Grid.Column>
        </Grid.Row>
      )
    } else {
      return (
        <Grid.Row centered>
          <Grid.Column width={2} textAlign='right'>
            <Icon name='chevron left' size='large' color='grey' onClick={this.goPrevious}/>
          </Grid.Column>
          <Grid.Column width={2} textAlign='center'>
            {this.renderPageNumbers(totalPages)}
          </Grid.Column>
          <Grid.Column width={2} textAlign='left'>
            <Icon name='chevron right' size='large' color='grey' onClick={this.goNext}/>
          </Grid.Column>
        </Grid.Row>
      )
    }
  };

  render() {
    let {displayedTutorProfiles, pageStart, totalPages} = this.state;
    return (
      <Grid style={{marginBottom: 100}}>
        <Grid.Row centered>
          <Grid.Column width={12} textAlign='left'>

            <p className="suggested-tutors"> Suggested Tutors </p>

            <Card.Group itemsPerRow={5}>
              {this.populateGridColumns(displayedTutorProfiles)}
            </Card.Group>
          </Grid.Column>
        </Grid.Row>
        {this.renderCarousels(pageStart, totalPages)}
      </Grid>
    )
  }

}

const mapStateToProps = ({dashboard}) => {
  let {suggestedTutors} = dashboard;
  return {suggestedTutors}
};


export default connect(mapStateToProps, {})(SuggestedTutors);




