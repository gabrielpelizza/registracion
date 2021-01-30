const fs = require('fs');
const path = require('path');
const usuarios = path.join('data','usuarios.json');

module.exports = {
    getUsers : () => {
        return JSON.parse(fs.readFileSync(usuarios,'utf-8'));
    },
    setUsers : (data) => {
        fs.writeFileSync(usuarios,JSON.stringify(data,null,2),'utf-8');
    }
}
