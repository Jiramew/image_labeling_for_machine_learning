exports.appMenuTemplate = [
    {
        label: 'File',
        submenu: []
    },
    {
        label: 'Edit',
        submenu: [
        ]
    },
    {
        label: 'View',
        submenu: [
            {
                role: 'reload'
            },
            {
                role: 'forcereload'
            },
            {
                role: 'toggledevtools'
            },
            {
                type: 'separator'
            },
            {
                role: 'togglefullscreen'
            }
        ]
    },
    {
        role: 'help',
        submenu: [
            {
                label: 'Home Page',
                click() {
                    require('electron').shell.openExternal('https://github.com/Jiramew');
                }
            }
        ]
    }
];