const connection = require('../Config/db');

const getSubscriptedUsers = callback => {
  try {
    const query = `SELECT * FROM subscriptions`;
    connection.query(query, callback);
  } catch (error) {
    console.log('Error getting subscriptions:', error);
  }
};

const getSubscription = async (user_id, membership_id, start_date = new Date(), callback) => {
  try {
    if (membership_id > 10 && membership_id < 0) {
      console.err('Invalid membership id');
      return;
    }

    const query = `INSERT INTO ` + `subscriptions (user_id, membership_id, start_date)` + ` values (?, ?, ?)`;

    connection.query(query, [user_id, membership_id, start_date], callback);
  } catch (error) {
    console.error('Error getting subscription:', error);
  }
};

module.exports = {
  getSubscription,
  getSubscriptedUsers,
};
