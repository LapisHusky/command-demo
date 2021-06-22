const fs = require('fs');
const commands = [];

fs.readdir(process.cwd() + '/mcCommands', function(err, res) {
    var files = res.filter(filename => filename.startsWith('command'));
    files.forEach(filename => {
        commands.push(require('./' + filename));
    });
});

module.exports = commands;