import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';

const styles = theme => ({
  root: {
    display: 'flex'
  }
})

const Post = ({posts}) => {
  console.log(posts,'posts')
  return (
    <List>
      {posts.map(post => {
        return <div key={post.id}>
          <ListItem>
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src={post.thumbnailUrl} />
            </ListItemAvatar>
            <ListItemText primary={post.title} secondary="Jan 7, 2014" />
          </ListItem>
          <Divider variant="inset" component="li" />
        </div>
      })}

    </List>
  )
}

class Posts extends Component {

  constructor(props) {
    super(props);
    this.state = {
      posts: []
    }
    this.getPhotos = this.getPhotos.bind(this);
  }

  componentDidMount() {
    // debugger
    this.getPhotos();

  }

  getPhotos() {
    fetch('https://jsonplaceholder.typicode.com/photos')
      .then(resp => resp.json())
      .then(posts => {
        console.log(this.setState({ posts }));
      })
  }

  render() {
    const { classes } = this.props;
    const { posts } = this.state;
    console.log(classes, 'classes');
    return (
      <Grid container spacing={24} className={classes.root}>
        <Grid item xs={12}>
          <Grid container justify="center">
            <Post posts={posts} />
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(Posts);