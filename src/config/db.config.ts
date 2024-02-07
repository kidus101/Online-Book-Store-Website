import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('bookstore', 'mikiyas', '1q2w3r4e', {
    host: 'localhost',
    dialect: 'postgres',
    logging: console.log,
});

// Test the connection
export async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

export default sequelize;