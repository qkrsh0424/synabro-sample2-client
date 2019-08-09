import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

//Core Load
import {
  ListSubheader,List,ListItem,ListItemText
} from '../../UiCore';

const styles = theme => ({
  root: {
    width: '100%',
    minWidth: 200,
    backgroundColor: theme.palette.background.paper,
    textAlign:'center',
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  itemCenter: {
    textAlign:'center',
  }
});

class ItemList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      open: true,
      univ_item:"",
    }
  }

  componentDidMount(){
    this.callApi()
    .then(res=>this.setState({univ_item:res}))
    .catch(err=>console.log(err));
  }

  callApi = async() =>{
    const response = await fetch('/univ_item/'+this.props.univ_id);
    const body = await response.json();
    return body;
  }

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

  render() {
    const { classes } = this.props;

    return (
      //메뉴 선택 리스트
      <List
        component="nav"
        subheader={<ListSubheader component="div">{this.props.univ_title}</ListSubheader>}
        className={classes.root}
      >
        {/* 메뉴 항목 start*/}
        {this.state.univ_item?this.state.univ_item.map((row)=>{
            if(row.univ_item_order===1){    //order이 1 인경우는 페이지의 메인을 의미함 , 즉 학교 홈페이지의 홈을 의미.
                return(
                    <ListItem
                        key={row.univ_item_id}
                        button 
                        onClick={()=>{window.location.href='/univ/'+row.univ_id}}
                        className={classes.itemCenter}
                        >
                        <ListItemText primary={row.univ_item_title} />
                    </ListItem>
                );
            }else{
                return(
                    <ListItem 
                        key={row.univ_item_id}
                        button 
                        onClick={()=>{window.location.href='/univ/'+row.univ_id+'/'+row.univ_item_address}}
                        className={classes.itemCenter}
                        >
                        <ListItemText primary={row.univ_item_title} />
                    </ListItem>
                );
            }
            
        }):""}
      </List>
    );
  }
}

ItemList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ItemList);