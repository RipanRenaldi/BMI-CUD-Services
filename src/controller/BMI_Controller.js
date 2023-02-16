import BMI from '../model/bmi_calculation.js';
import { Publisher } from '../messager/Publisher.js';
import { calculateBmi, generateUniqId } from '../utils/util.js';
const publisher = new Publisher();
const calculateBMI = async (req,res) => {
    try{
        const {logType} = req.body;
        const tb = parseFloat(req.body.tinggi_badan);
        const bb = parseFloat(req.body.berat_badan);
        if (!tb || !bb || !logType) {
            throw new Error('Field must not empty');
        }
        const resultBMI = calculateBmi(tb,bb);
        const { _id } = req.user;
        const bmiCreated = await BMI.create({id: generateUniqId(), tinggi_badan: tb, berat_badan: bb, bmi: resultBMI});
        if( !bmiCreated ) {
            throw new Error('Cannot Create User');
        }
        const messageToSend = {_id, result: bmiCreated};
        publisher.publishMessage(logType, messageToSend);
        res.status(200).json({message: 'Berhasil Menghitung BMI', status: 'ok', bmi_data:bmiCreated});
    }catch(e){
        res.status(400).json({message: e.message, try: {
            1: '[1] Field Must not Be Empty',
        }})
    }
}

const updateBMI = async(req,res) => {
    try{
        const {id} = req.params;
        const {tinggi_badan, berat_badan, logType} = req.body;
        const tb = parseFloat(tinggi_badan);
        const bb = parseFloat(berat_badan);
        
        if( !tinggi_badan || !berat_badan || !logType ){
            throw new Error('Form Input is Not Field');
        }
        if( !id ){
            throw new Error('Cannot FInd ID');
        }
        const resultBMI = calculateBmi(tb, bb)
        const isUserUpdated = await BMI.update({tinggi_badan: tb, berat_badan: bb, bmi: resultBMI}, {where: {id}});
        if ( !isUserUpdated ) {
            throw new Error('Cannot Updated Data');
        } 
        const updatedUser = await BMI.findOne({where: {id: `${id}`}});
        if( !updatedUser ) {
            throw new Error('Cannot Update Data');
        }
        const {_id} = req.user;
        const messageToSend = {result: updatedUser, _id, logType};
        publisher.publishMessage(logType, messageToSend);
        res.status(200).json({message: 'Data Changed', status:'ok', bmi_data:updatedUser});
    }catch(e){
        res.status(400).json({
            message: e.message,
            try: {
                1: '[1] Tinggi_badan, Berat_badan, and Logtype must be filled',
                2: '[2] Check Req Params ID',
                3: '[3] Make Sure ID/User is exist'
            }
        })
    }
}

const deleteBMI = async(req, res)=>{
    try{
        const { id } = req.params;
        const { logType } = req.body;
        if( !id ){
            throw new Error('Req Params ID is Not Exist');
        }
        const isUserUpdate = await BMI.destroy({where: {id}});    
        if( !isUserUpdate ){
            throw new Error('User Not Found');
        }
        const {_id} = req.user;
        const messageToSend = {_id, result: {id: id}};
        publisher.publishMessage(logType, messageToSend);

        res.status(200).json({message: 'BMI Deleted', status: 'ok'});
    }catch(e){
        res.status(400).json({message: e.message, try: {
            1: '[1] Make Sure params ID',
            2: '[2] Make Sure User Exists'
        }})
    }
}

export {
    calculateBMI,
    updateBMI,
    deleteBMI
}