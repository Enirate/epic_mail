import bcrypt from 'bcryptjs';
import db from '../config/db';
import schema from '../model/schema';
import jwt from 'jsonwebtoken';
import Joi from 'joi';
import secret from '../config/secret'
import queries from '../config/queries';
import user from '../../usingObjects/data/user';

export default class LoginController {
    static async login(req, res) {
        try {
            const validateUser = schema.loginUser(req.body);
            if(validateUser.error===null){
                const userData = {};
                userData = req.body;
                userData.email = req.body.email;
                userData.password = req.body.password;
                let {rowCount,rows} = await db.query(queries.checkIfUserExist,[userData.email]);
                
                if(rowCount===0){
                    return res.status(404).json({'status':404,'message':'Email Does not Exist'})
                }else{
                   const validPassword = await bcrypt.compareSync(userData.password, rows[0].password)
                   if(!validPassword){
                    return res.status(401).json({'status':401,'message':'Invalid Password'})
                   }else{
                    const {id}= rows[0]
                    const token = jwt.sign({ id }, secret.secret, { expiresIn: '24h' });
                    return res.status(200).json({'status':200,token,'message':'Login Successful'})
                   }
         
                    
                }
            }else{
                res.status(401).json({'status':401,'message':'Invalid Input'});
            }
           
                        

            
          
         
        }catch(e){

        }
    }
}