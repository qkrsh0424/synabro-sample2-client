import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import logo from '../../images/Logo/synabrologo2.png';

//Core Load
import {
    Typography, Drawer,
    Button, IconButton,
    AppBar, Toolbar,
} from '../../UiCore';

//Icons Load
import {
    MenuIcon, ChevronLeftIcon, ChevronRightIcon,
    AccountCircle,CssBaseline
} from '../../UiIcons';

import { BrowserRouter as Router, Route,Link } from 'react-router-dom';

// //Component List
import {
    NavMenuList,
    Main,
    UnivMain,
    Login,
    Signup,
} from '../../ComponentList';

const drawerWidth = 0;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  toolBar:{
    backgroundColor: theme.palette.background.paper,
    color:'black'
  },
  title:{
    flexGrow:1
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    // padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    // marginLeft: -drawerWidth,
    overflowX: 'auto',
    color:'black'
  },
  mycontent: {
    width:'100%',
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
}));

class AppBarMenuItem extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        univ:"",
        user_id:localStorage.getItem('user_id'),
      }
    }
  
    signout(){
      localStorage.clear();
      window.location.reload();
    }
  
    render(){
      const menuitem = [];
      const AdapterLink = React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />);
      if(this.state.user_id){
        menuitem.push(
          <div className="btn-group dropleft" key="signed">
            <IconButton data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" id="dropdownMenuLink"><AccountCircle/></IconButton>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <div>
                <a className="dropdown-item" href="/">asd</a>
                <a className="dropdown-item" href="/">Another action</a>
                <Button className="dropdown-item" onClick={this.signout}>로그아웃</Button>
              </div>
            </div>
          </div>
        );
      }else{
        menuitem.push(
          <div key="regihandle">
            <Button color="inherit" horizontal="right" component={AdapterLink} to="/login">로그인</Button>
            <Button color="inherit" horizontal="right" component={AdapterLink} to="/signup">회원가입</Button>
          </div>
        );
      }
      return(
        <div>
          {menuitem}
        </div>
      );
    }
  }

export default function Nav(props) {  
    const classes = useStyles();
    const theme = useTheme();
    // const [open, setOpen] = React.useState(false);
    const [open] = React.useState(false);
  
    const [state, setState] = React.useState({
      top: false,
      left: false,
      bottom: false,
      right: false,
    });
  
    const toggleDrawer = (side, open) => event => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
  
      setState({ ...state, [side]: open });
    };
  
    //Menu Bar List
    const sideList = side => (
      <div
        className={classes.list}
        role="presentation"
      >
  
        <div className={classes.drawerHeader}>
            <IconButton onClick={toggleDrawer(side, false)}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
        </div>
        <NavMenuList/>
      </div>
    );
  
    return (
      <Router className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          },)}
        >
          <Toolbar className={classes.toolBar}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={toggleDrawer('left', true)}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap className={classes.title}>
              <Link to="/"><img src={logo} alt="..." style={{height:40}}></img></Link>
            </Typography>
            <AppBarMenuItem/>
          </Toolbar>        
        </AppBar>
        
        
        <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
          {sideList('left')}
        </Drawer>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open
          })}
        >
          <div className={classes.drawerHeader} />
            <Route exact path="/" component={Main}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/signup" component={Signup}/>

            <Route exact path="/univ/:univ_id" component={UnivMain}/>
            <Route exact path="/univ/:univ_id/:board_type" component={UnivMain}/>
        </main>
      </Router>
    );
  }