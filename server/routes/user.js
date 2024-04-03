const express = require('express')
const { query } = require('../helpers/db.js')


const userRouter = express.Router()

userRouter.post("/login",async(req,res) => {
 
    try{
        const sql ="select * from account where email=$1"
        const result = await query(sql,[req.body.email])
        if(result.rowCount === 1){
           
            if (result. rows[0].password === req.body.password) {
                res. status (200).json (result. rows [0])
                } else {
                res.statusMessage = 'Invalidnlogin'
                res.status(401). json({error:'Invalid login'})
                }
             }else{
                res.statusMessage = 'Invalid login'
                res.status(401).json({error:'Invalid login'})
                }             
            }catch (error) {
                res.statusMessage = error
                res.status(500).json({error: error})}
        })
 



module.exports = {
    userRouter
  }