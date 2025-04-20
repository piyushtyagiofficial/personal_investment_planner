import mongoose from 'mongoose';

const connectToDB = () => {
    mongoose.connect(process.env.DB_STRING)
    .then(() => {
        console.log('Connected to DB');
    })
    .catch(err => console.log(err));
};

export default connectToDB;
