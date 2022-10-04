import { Router } from "express";
import Transaction from "../models/TransactionModel.js";

const router = Router();

router.get('/',async (req,res)=>{
  let transactionsData = await Transaction.find({}).sort({createdAt: -1});
  return res.json({
    status_code: '1',
    message: 'Success',
    data: transactionsData
  });
});

router.post('/',async (req,res)=>{
  const {amount,description,date} = req.body;
  let transaction = new Transaction({amount,description,date});
  await transaction.save();
  return res.json({
    status_code: '1',
    message: 'Success'
  });
});

router.patch('/',async (req,res)=>{
  const {_id,amount,description,date} = req.body;
  await Transaction.findOneAndUpdate({_id},{amount,description,date});
  return res.json({
    status_code: '1',
    message: 'Success'
  });
});

router.delete('/:id',async (req,res)=>{
  await Transaction.findByIdAndDelete({_id:req.params.id});
  return res.json({
    status_code: '1',
    message: 'Success'
  });
});



export default router;