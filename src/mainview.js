import {ipcRenderer, remote} from 'electron';

const {dialog} = remote;

import React, {Component} from 'react';

import FileList from './component/filelist';
import ImageViewer from './component/imageviewer';

import {withStyles} from 'material-ui/styles';
import Grid from 'material-ui/Grid';

import {get_label_from_path} from './common'

const styles = theme => ({});

class MainView extends Component {
    constructor(props) {
        super(props);
        document.title = "Labeling Tool - Untitled";
        this.isSaved = true;
        this.current_file = undefined;

        this.state = {current_index: 0, final_data: []};

        this.listener = this.listener.bind(this);
        this.labelChange = this.labelChange.bind(this);
        this.switchChange = this.switchChange.bind(this);
        ipcRenderer.on('action', this.listener);
    }

    conponentDidMount() {
    }

    listener(event, arg) {
        switch (arg) {
            case 'open':
                this.askSaveIfNeed();
                const files = remote.dialog.showOpenDialog(remote.getCurrentWindow(), {
                    filters: [
                        {name: "Image Files", extensions: ['png', 'jpg']},
                        {name: 'All Files', extensions: ['*']}
                    ],
                    properties: ['openFile', 'multiSelections']
                });
                if (files) {
                    let final_data = [];
                    for (let i = 0; i < files.length; i++) {
                        final_data.push({id: i, path: files[i], use: 1, label: get_label_from_path(files[i])})
                    }
                    this.setState({final_data: final_data, current_index: 0});
                    document.title = "Labeling Tool - loaded new image files";
                }
                this.isSaved = false;
                this.current_file = undefined;
                break;
            case 'open_ljson':
                this.askSaveIfNeed();
                const ljson_file = remote.dialog.showOpenDialog(remote.getCurrentWindow(), {
                    filters: [
                        {name: "Ljson Files", extensions: ['ljson']},
                        {name: 'All Files', extensions: ['*']}
                    ],
                    properties: ['openFile']
                });
                if (ljson_file) {
                    let json_info = JSON.parse(MainView.readText(ljson_file[0]));
                    this.current_file = ljson_file[0];

                    let current_index = json_info.meta.current_index;

                    if (json_info.data[0].use === undefined) {
                        json_info.data.map((t) => {
                            t.use = 1;
                            return t
                        });
                    }

                    this.setState({final_data: json_info.data, current_index: current_index});
                    document.title = "Labeling Tool - " + ljson_file;
                }
                this.isSaved = false;
                // this.current_file = undefined;
                break;
            case 'save':
                this.saveCurrentDoc();
                break;
            case 'prev':
                if (this.state.final_data.length !== 0 && this.state.current_index - 1 >= 0) {
                    this.setState({current_index: this.state.current_index - 1})
                }
                break;
            case 'prev10':
                if (this.state.final_data.length !== 0 && this.state.current_index - 10 >= 0) {
                    this.setState({current_index: this.state.current_index - 10})
                }
                break;
            case 'prev100':
                if (this.state.final_data.length !== 0 && this.state.current_index - 100 >= 0) {
                    this.setState({current_index: this.state.current_index - 100})
                }
                break;
            case 'next':
                if (this.state.final_data.length !== 0 && this.state.current_index + 1 < this.state.final_data.length) {
                    this.setState({current_index: this.state.current_index + 1})
                }
                break;
            case 'next10':
                if (this.state.final_data.length !== 0 && this.state.current_index + 10 < this.state.final_data.length) {
                    this.setState({current_index: this.state.current_index + 10})
                }
                break;
            case 'next100':
                if (this.state.final_data.length !== 0 && this.state.current_index + 100 < this.state.final_data.length) {
                    this.setState({current_index: this.state.current_index + 100})
                }
                break;
            case 'correct':
                if (this.state.final_data.length !== 0 && this.state.current_index + 1 < this.state.final_data.length) {
                    this.setState({current_index: this.state.current_index + 1})
                }
                break;
            case 'exiting':
                this.askSaveIfNeed();
                ipcRenderer.sendSync('reqaction', 'exit');
                break;
        }
    }

    //如果需要保存，弹出保存对话框询问用户是否保存当前文档
    askSaveIfNeed() {
        if (this.isSaved) return;
        const response = dialog.showMessageBox(remote.getCurrentWindow(), {
            message: 'Do you want to save the current document?',
            type: 'question',
            buttons: ['Yes', 'No']
        });
        if (response === 0) this.saveCurrentDoc(); //点击Yes按钮后保存当前文档
    }

    static readText(file) {
        const fs = require('fs');
        return fs.readFileSync(file, 'utf8');
    }

    static saveText(text, file) {
        const fs = require('fs');
        fs.writeFileSync(file, text);
    }

    saveCurrentDoc() {
        if (this.current_file === undefined) {
            const file = remote.dialog.showSaveDialog(remote.getCurrentWindow(), {
                filters: [
                    {name: "Text Files", extensions: ['ljson']},
                    {name: 'All Files', extensions: ['*']}]
            });
            if (file) this.current_file = file;
        }
        if (this.current_file) {
            let save_data = JSON.stringify({
                meta: {"current_index": this.state.current_index},
                data: this.state.final_data
            });
            MainView.saveText(save_data, this.current_file);
            self.isSaved = true;
            document.title = "Labeling - " + this.current_file;
        }
    }

    labelChange(new_label, index) {
        if (new_label !== undefined) {
            let final_data_copy = this.state.final_data;
            final_data_copy[index].label = new_label;
            this.setState({final_data: final_data_copy});
        }
    }

    switchChange(new_switch, index) {
        if (new_switch !== undefined) {
            let final_data_copy = this.state.final_data;
            final_data_copy[index].use = new_switch ? 1 : 0;
            this.setState({final_data: final_data_copy});
        }
    }

    render() {
        return (
            <Grid container className="root">
                <Grid item xs={12}>
                    <Grid container className="main" justify="flex-start" spacing={Number(16)}>
                        <Grid item xs={12}>
                            <FileList final_data={this.state.final_data}
                                      current_index={this.state.current_index}/>
                        </Grid>
                        <Grid item xs={12}>
                            <ImageViewer final_data={this.state.final_data}
                                         current_index={this.state.current_index}
                                         handleLabelChange={this.labelChange}
                                         handleSwitchChange={this.switchChange}/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>)
    }
}

export default withStyles(styles)(MainView);