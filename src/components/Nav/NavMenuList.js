import React from 'react';

import {
    Divider,Popover,List,ListItem,ListItemIcon,ListItemText
} from '../../UiCore';

import {ItemList} from '../../ComponentList';

import {InboxIcon,MailIcon} from '../../UiIcons';

class NavMenuList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            univ:"",
            univSelectedId:"",
            univSelectedTitle:"",
            anchorEl:null,
        }
    }
    componentDidMount(){
        this.callApi()
            .then(res => this.setState({univ: res}))
            .catch(err => console.log(err))
    }

    callApi = async() => {
        const response = await fetch('/api/univ');
        const body = await response.json();
        return body;
    }

    handleClick = (id,title,event) => {
        this.setState({
          anchorEl: event.currentTarget,
          univSelectedId:id,
          univSelectedTitle:title,
        });
      };
    
    handleClose = () => {
    this.setState({
        anchorEl: null,
    });
    };
    render(){
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);
        return(
            <div>
                <List>
                    {this.state.univ?this.state.univ.map((row,index)=>{
                        return(
                            <ListItem button key={row.univ_id} aria-owns={open ? 'simple-popper'+row.univ_id : undefined} onClick={(e)=>this.handleClick(row.univ_id,row.univ_title,e)}>
                                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                                <ListItemText primary={row.univ_title} />
                            </ListItem>
                        );
                    }):""}
                </List>
                <Popover
                    id={"simple-popper"+this.state.univSelectedId}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={this.handleClose}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    >
                    <ItemList univ_id={this.state.univSelectedId} univ_title={this.state.univSelectedTitle} />
                </Popover>
                
                <Divider />
            </div>
        );
    }
}

export default NavMenuList;