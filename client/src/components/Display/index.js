import Pagination from './Pagination';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableHead from '@material-ui/core/TableHead';
import Tooltip from '@material-ui/core/Tooltip';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import * as actions from '../../redux/actions';
import { connect } from 'react-redux';

const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5,
  },
});

const PaginationWrapped = withStyles(actionsStyles, { withTheme: true })(
  Pagination,
);

const CustomTableCell = withStyles(theme => ({
    head: {
      backgroundColor: "#8fbdb3",
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 500,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

function desc(a, b, orderBy) {
    if (orderBy === '') {
        return 0;
    }
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  
function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

class Display extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            searchString: '',
            reload: false,
            data: [],
            page: 0,
            rowsPerPage: 10,
            order: 'desc',
            orderBy: ''
        };
    }

    componentDidMount() {
        this.props.getUsersList(() => {
            this.setState({
                data: this.props.users.data
            })
        });
    }

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ page: 0, rowsPerPage: event.target.value });
    };

    onClickDelete = (user) => {
        var objectIdToDelete = user._id;
        this.props.deleteUser(objectIdToDelete, () => {
            this.props.getUsersList(() => {
                this.setState({
                    data: this.props.users.data
                })
            });
        });
    }

    handleSearch = (value) => {
        this.props.searchUser(value, () => {
            this.setState({
                searchString: value,
                data: this.props.users.data,
            })
        });
    }

    handleRequestSort = (property) => {
        const orderBy = property;
        let order = 'desc';
    
        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }
    
        this.setState({ 
            order: order, 
            orderBy:  orderBy
        });
    };


    render() {
        const { classes } = this.props;
        const { data, rowsPerPage, page, orderBy, order } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
        const rows = [
            { id: 'firstName', numeric: false, disablePadding: true, label: 'First Name' },
            { id: 'lastName', numeric: false, disablePadding: false, label: 'Last Name' },
            { id: 'sex', numeric: false, disablePadding: false, label: 'Sex' },
            { id: 'age', numeric: true, disablePadding: false, label: 'Age' },
        ];
        return (
        <Paper className={classes.root}>
            <div className={classes.tableWrapper}>
            <div className="search">
                    <p>Search</p>
                   <input 
                        type="text" 
                       value={this.state.searchString} 
                       onChange={e => this.handleSearch(e.target.value)} 
                       placeholder="Type here..." 
                   />
                 </div>
            <Table className={classes.table}>
            <TableHead>
                <TableRow>
                    {rows.map(
                        row => (
                            <CustomTableCell
                                align="center"
                                key={row.id}
                                padding={row.disablePadding ? 'none' : 'default'}
                                sortDirection={orderBy === row.id ? order : false}
                            >
                                <Tooltip
                                    title="Sort"
                                    placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                                    enterDelay={300}
                                >
                                    <TableSortLabel
                                        active={orderBy === row.id}
                                        direction={order}
                                        onClick={() => this.handleRequestSort(row.id)}
                                    >
                                        {row.label}
                                    </TableSortLabel>
                                </Tooltip>
                            </CustomTableCell>
                        )
                    )}
                    <CustomTableCell align="center">Edit</CustomTableCell>
                    <CustomTableCell align="center">Delete</CustomTableCell>
                </TableRow>
            </TableHead>
                <TableBody>
                {stableSort(data, getSorting(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(user => (
                    <TableRow key={user.id}>
                    <TableCell component="th" scope="row">
                        {user.firstName}
                    </TableCell>
                    <TableCell align="center">{user.lastName}</TableCell>
                    <TableCell align="center">{user.sex}</TableCell>
                    <TableCell align="center">{user.age}</TableCell>
                    <TableCell align="center"><a className="edit" href={`/edit/${user._id}`}> Edit</a></TableCell>
                    <TableCell align="center"><button className="delete" onClick={() => this.onClickDelete(user)}>Delete</button></TableCell>
                    </TableRow>
                ))}
                {emptyRows > 0 && (
                    <TableRow style={{ height: 48 * emptyRows }}>
                    <TableCell colSpan={6} />
                    </TableRow>
                )}
                </TableBody>
                <TableFooter>
                <TableRow>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        colSpan={6}
                        count={data.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        SelectProps={{
                            native: true,
                        }}
                        onChangePage={this.handleChangePage}
                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                        ActionsComponent={PaginationWrapped}
                    />
                </TableRow>
                </TableFooter>
            </Table>
            </div>
        </Paper>
        );
    }
}

Display.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
    return {
        users: state.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        searchUser: (value, callback) => {
            dispatch(actions.getSearchUser(value, callback))
        },
        getUsersList: (callback) => {
            dispatch(actions.getUsers(callback));
        },
        deleteUser: (id, callback) => {
            dispatch(actions.getDeleteUsers(id, callback));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Display));
