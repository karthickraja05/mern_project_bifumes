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



export default router;