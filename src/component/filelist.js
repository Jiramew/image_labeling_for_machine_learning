import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import {withStyles} from 'material-ui/styles';
import Table, {TableBody, TableCell, TableHead, TableRow} from 'material-ui/Table';

const styles = theme => ({
    paper: {
        height: 500,
    },
});


class FileList extends Component {
    constructor(props) {
        super(props);
    }

    conponentDidMount() {
    }

    render() {
        console.log("table", this.props);
        let render_file_list = (
            <Paper className="paper">
                <Typography align="center" variant="title" className="fileListTitle">
                    Filenames
                </Typography>
            </Paper>
        );
        if (this.props.final_data !== null && this.props.final_data.length !== 0) {
            let upper = Math.min(this.props.final_data.length, this.props.current_index + 3);
            let lower = Math.max(0, this.props.current_index - 3);
            let final_show_data = this.props.final_data.slice(lower, upper);

            let main_table = (
                <Table className="table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Filename</TableCell>
                            <TableCell>Label</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {final_show_data.map(n => {
                            return (
                                <TableRow key={n.id}>
                                    <TableCell>{n.id}</TableCell>
                                    <TableCell>{n.path}</TableCell>
                                    <TableCell>{n.label}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>);

            render_file_list = (
                <Paper className="paper">
                    <Typography align="center" variant="title" className="fileListTitle">
                        Filenames
                    </Typography>
                    {main_table}
                </Paper>
            );
        }
        return (
            render_file_list
        );
    }
}

export default withStyles(styles)(FileList);