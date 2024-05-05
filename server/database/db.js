import mongoose from 'mongoose';

const Connection = async () => {
    const DB_URI = `mongodb://avantika:cookie123@ac-am73qej-shard-00-00.rfl9cit.mongodb.net:27017,ac-am73qej-shard-00-01.rfl9cit.mongodb.net:27017,ac-am73qej-shard-00-02.rfl9cit.mongodb.net:27017/?ssl=true&replicaSet=atlas-xau59b-shard-0&authSource=admin&retryWrites=true&w=majority&appName=GmailClone`;
    try {
        await mongoose.connect(DB_URI, { useNewUrlParser: true });
        console.log('Database connected successfully');
    } catch (error) {
        console.log('Error while connecting with the database ', error.message);
    }
}

export default Connection;
