const path = require('path');
const bcrypt = require('bcrypt');
const fs = require('fs');


const {getUsers, setUsers} = require(path.join('..','data','usuarios'));

const users = getUsers();

module.exports = {

    index : (req,res) =>{
        res.render('index',{
            title : "inicio",
            mensaje: "Bienvenido a mi Sitio"
        });
    },
    login : function(req,res){
        res.render('login');
    },

    loginProcess : (req,res)=>{
        const {email, pass} = req.body;

        let result = users.find(user => user.email.toLowerCase() === email.toLowerCase().trim());

        if(result){
            if(bcrypt.compareSync(pass.trim(),result.pass)){
                return res.redirect('profile/' + result.id)
            }else{
                res.render('login',{
                    error : "Credenciales inválidas!"
                })
            }
        }else{
            res.render('login',{
                error : "Credenciales inválidas!"
            })
        }
    },
    register : (req,res)=>{
        res.render('register');
    },

    registerProcess : (req,res,next)=>{
        const {email, nombre, apellido, pass} = req.body;
        
        if(!email || !pass){
            return res.redirect('register');
        }

        let result = users.find(user => user.email.toLowerCase() === email.toLowerCase().trim());

        if(result){
            return res.render('register',{
                error : "El nombre de usuario ya esta en Uso"
            })
        }

        let lastID = 0;
        users.forEach(user => {
            if (user.id > lastID) {
                lastID = user.id
            }
        });

        let passHash = bcrypt.hashSync(pass.trim(),12)

        const newUser = {
            id : +lastID + 1,
            nombre : nombre.trim(),
            pass : passHash,
            email : email,
            apellido : apellido,
            img : req.files[0].filename

        }


        users.push(newUser);

        setUsers(users);

        res.redirect('login');
    },
    profile:(req,res)=>{
        const id = Number(req.params.id);

        const resultado = [users.find(a => a.id === id)]
        
        res.render('profile',{
            resultado
        })
    }
}