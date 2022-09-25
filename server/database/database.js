import mongoose from 'mongoose';

// mongoose.connect(process.env.MONGO_DB).then(()=>{
//   console.log('Database Connected');
// }).catch(()=>{
//   console.log('Error: Database connection failed');
// });

async function connect(){
  await mongoose.connect(process.env.MONGO_DB);
  console.log('Database connected');
}

export default connect;