'use strict'

const util = require('util')
const mysql = require('mysql')
//const db = require('./../db')

module.exports = {
    get: (req,res) => {
        var query="SELECT count(*) as TotalCount from users";
        let sql = 'SELECT * FROM users';
        db.query(query, function(err, rows){
            if (err){
                return err;
            } else {
                let totalCount = rows[0].TotalCount
                if (req.body.start == ''|| req.body.limit ==''){
                    let startNum = 0;
                    let limitNum = 5;
                } else {
                    let startNum = parseInt(req.body.start);
                    let limitNum = parseInt(req.body.limit);
                }
            } 
            var query = "SELECT * from users ORDER BY id DESC limit ? OFFSET ?";
            var parameters = [limitNum,startNum];
            query = mysql.format(query, parameters);
            db.query(query, function(err,rest){
                if (err){
                    res.json(err);
                } else {
                    res.json(rest)
                }
            })
        })
        // db.query(sql,(err,response) =>{
        //     if (err) throw err
        //     res.json(response)
        // })
    },
    detail: (req,res) =>{
        let sql = 'SELECT * FROM users WHERE id = ?'
        db.query(sql,[req.params.userId],(err, response)=>{
            if (err) throw err
            res.json(response[0])
        })
    },
    update: (req,res) =>{
        let data = req.body;
        let userId = req.params.userId;
        let sql = 'UPDATE users SET ? WHERE id = ?'
        db.query(sql,[data,userId],(err,response) =>{
            if (err) throw err
            res.json({message:'Update user info success!'})
        })
    },
    store: (req,res)=>{
        let data = req.body;
        let sql = 'INSERT INTO users SET ?'
        db.query(sql,[data],(err,response)=>{
            if (err) throw err
            res.json({message:'Insert new user success!'})
        })
    },
    delete: (req,res) =>{
        let sql = 'DELETE FROM users WHERE id=?'
        db.query(sql,[req.params.userId],(err,response)=>{
            if (err) throw err
            res.json ({message:'Delete user success!'})
        })
    }
}