import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import Switch from 'material-ui/Switch';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';

import {withStyles} from 'material-ui/styles';
import {
    get_filename_from_path,
    get_label_from_final_data,
    get_use_from_final_data
} from '../common';

const styles = {
    card: {
        maxWidth: 345,
    },
    media: {
        height: 200,
    },
};

class ImageViewer extends Component {
    constructor(props) {
        super(props);
        this.props.onRef(this);
        this.state = {
            current_index: this.props.current_index,
            current_label: undefined
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleSwitch = this.handleSwitch.bind(this);
    }

    componentDidMount() {
        this.setState({
            current_index: this.props.current_index,
            current_label: undefined
        })
    }

    handleChange(event) {
        this.setState({current_label: event.target.value});
    }

    handleSwitch(event, checked) {
        this.props.handleSwitchChange(checked, this.props.current_index);
        this.setState({current_label: undefined});
    }

    handleClick() {
        this.props.handleLabelChange(this.state.current_label, this.props.current_index);
        this.setState({current_label: undefined});
    }

    render() {
        let render_image_viewer = (
            <Paper className="paper">
                <Typography align="center" variant="title" className="imageViewer">
                    Image
                </Typography>
            </Paper>
        );
        if (this.props.final_data !== null && this.props.final_data.length !== 0) {
            let file_path = this.props.final_data[this.props.current_index].path;
            render_image_viewer = (
                <Paper style={{align: "center"}} className="paper">
                    <Typography align="center" variant="title" className="imageViewer">
                        Image {this.props.current_index} out of {this.props.final_data.length}
                    </Typography>
                    <img src={file_path}/>
                    <Typography align="center" variant="headline" component="h4">
                        {get_filename_from_path(file_path)}
                    </Typography>
                    <Typography align="center" variant="headline" component="h4">
                        {get_label_from_final_data(this.props.final_data, this.props.current_index)}
                    </Typography>
                    <TextField
                        id="label_input"
                        label="label_input"
                        // defaultValue={get_label_from_final_data(this.props.final_data, this.props.current_index)}
                        value={(this.state.current_label !== undefined) ? this.state.current_label : get_label_from_final_data(this.props.final_data, this.props.current_index)}
                        key={get_label_from_final_data(this.props.final_data, this.props.current_index)}
                        className="textField"
                        margin="normal"
                        onChange={this.handleChange}
                    />
                    <Button color="primary"
                            className="button"
                            onClick={this.handleClick}>
                        Correct
                    </Button>
                    <Switch onChange={this.handleSwitch}
                            defaultChecked={1 === get_use_from_final_data(this.props.final_data, this.props.current_index)}
                            key={1 === get_use_from_final_data(this.props.final_data, this.props.current_index)}
                            label="In-Use"
                            color="primary">
                    </Switch>
                </Paper>
            )
        }
        return (
            render_image_viewer
        )
    }
}

export default withStyles(styles)(ImageViewer);