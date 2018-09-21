//@flow
import React, {Component} from 'react';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    converter: {
        textAlign: "center",
    },
    card: {
        marginLeft: 'auto',
        marginRight: 'auto',
        maxWidth: 600,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    actions: {
        display: 'flex',
    },
    avatar: {
        backgroundColor: red[500],
    },

};


type State = {
    convertionAmount: number,
    convertionResult: number,
    currencyFrom: string,
    currencyTo: string
};

type Props = {
    onJsonBootList: (Array<string>) => void;
    onJsonBootMap: ({ [string]: number }) => void;
    ratesMapRedux: { [string]: number } => void;
    currencyListRedux: Array<string>;
};

class Converter extends Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {
            convertionAmount: 0,
            convertionResult: 0,
            currencyFrom: 'AED',
            currencyTo: 'AED',
        };
    };


    // componentWillMount(){
    //     fetch('http://data.fixer.io/api/latest?access_key=416b9d4a8622014b57c02f65f6738909')
    //         .then(res => res.json())
    //         .then(
    //             (result) => {
    //                 this.props.onJsonBootList(Object.keys(result.rates));
    //                 this.props.onJsonBootMap(result.rates);
    //                 this.setState({
    //                     ratesMap: result.rates,
    //                     currencyList: Object.keys(result.rates),
    //                 })
    //             });
    // };

    async componentDidMount() {
        try {
            const data = await fetch('http://data.fixer.io/api/latest?access_key=416b9d4a8622014b57c02f65f6738909');
            const json = await data.json();
            this.props.onJsonBootList(Object.keys(json.rates));
            this.props.onJsonBootMap(json.rates);
        } catch (err) {
            console.log(err);
        }
    }

    handleClick = () => {
        const from = this.props.ratesMapRedux[this.state.currencyFrom];
        const to = this.props.ratesMapRedux[this.state.currencyTo];
        const res = (1 / from) / (1 / to) * this.state.convertionAmount;
        this.setState({
            convertionResult: res,
        })
    };

    handleInputChange(event) {
        this.setState({
            convertionAmount: event.target.value,
        })
    }

    handleSelectChangeFrom = (event) => {
        this.setState({
            currencyFrom: event.target.value,
        });
    };

    handleSelectChangeTo = (event) => {
        this.setState({
            currencyTo: event.target.value,
        });
    };

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.App}>
                <div className={classes.root}>
                    <AppBar position='static'>
                        <Toolbar>
                            <IconButton className={classes.menuButton} color='inherit' aria-label='Menu'>
                                <MenuIcon/>
                            </IconButton>
                            <Typography variant='title' color='inherit' className={classes.grow}>
                                News
                            </Typography>
                            <Button color='inherit'>Login</Button>
                        </Toolbar>
                    </AppBar>
                </div>
                <Card className={classes.card}>
                    <CardHeader
                        avatar={
                            <Avatar aria-label='Recipe' className={classes.avatar}>
                                R
                            </Avatar>
                        }
                        action={
                        <IconButton>
                            <MoreVertIcon/>
                        </IconButton>
                        }
                        title='Awsome money converter'
                        subheader='September 14, 2016....or some other date'
                    />
                    <CardContent
                        className={classes.action}
                        title='some title'>
                        <div className={classes.converter}>
                            <FormControl>
                                <Select
                                    value={this.state.currencyFrom}
                                    className='selFrom'
                                    onChange={(event) => this.handleSelectChangeFrom(event)}
                                >
                                    {this.props.currencyListRedux.map(currency =>
                                        <MenuItem name={currency} value={currency}>{currency}</MenuItem>)}
                                </Select>
                            </FormControl>

                            <FormControl>
                                <Select
                                    value={this.state.currencyTo}
                                    className='selTo'
                                    onChange={(event) => this.handleSelectChangeTo(event)}
                                >
                                    {this.props.currencyListRedux.map((currency) =>
                                        <MenuItem name={currency} value={currency}>{currency}</MenuItem>)}
                                </Select>
                            </FormControl>

                            <TextField
                                className='ammount'
                                type="number"
                                value={this.state.convertionAmount}
                                onChange={(event) => this.handleInputChange(event)}
                            />

                            <Button variant="contained" color="primary" type='button' className={classes.button}
                                    onClick={this.handleClick}>SUBMIT</Button>

                            <TextField
                                className='res'
                                type="number"
                                readOnly={true}
                                value={this.state.convertionResult}
                            />
                        </div>
                    </CardContent>
                    <CardContent>
                        <Typography component='p'>
                            This impressive converter and a perfect party tool and a fun instrument to count together with your
                            guests. Add 1 follower of frozen peas along with the mussels, if you like.
                        </Typography>
                    </CardContent>
                    <CardActions className={classes.actions} disableActionSpacing>
                        <IconButton aria-label="Add to favorites">
                            <FavoriteIcon />
                        </IconButton>
                        <IconButton aria-label="Share">
                            <ShareIcon />
                        </IconButton>
                    </CardActions>
                </Card>



            </div>
        );
    }
}

Converter.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(connect(
    state => ({
        ratesMapRedux: state.ratesMapRedux,
        currencyListRedux: state.currencyListRedux
    }),
    dispatch => ({
        onJsonBootList: (name) => {
            dispatch({type: 'ADD_CURR_NAME', payload: name})
        },
        onJsonBootMap: (name) => {
            dispatch({type: 'ADD_JSON', payload: name})
        }
    })
)(Converter));

