const createTableIfNotExisted = async (db, table) => {
  try {
    switch (table) {
      case 'MESSAGES':
        await db.run(`CREATE TABLE IF NOT EXISTS ${table} (ID INTEGER NOT NULL, USER VARCHAR (20) NOT NULL, CONTENT VARCHAR (200) NOT NULL, TIMESMAP INTEGER NOT NULL, PRIMARY KEY (ID))`);
        break;
      case 'USERS':
        await db.run(`CREATE TABLE ${table} (ID INT NOT NULL, NAME VARCHAR (20) NOT NULL, PASSWORD VARCHAR (20) NOT NULL, PRIMARY KEY (ID))`);
        break;
      default: return 'NEED CREATE DETAIL FOR TABLE';
    }
    return 'created';
  } catch (e) {
    console.log('created error', e);
    return 'created error';
  }
};
// drop table if exists TableName 删除
// SELECT name FROM sqlite_master WHERE type='table' AND name='table_name'; 检查

module.exports = { createTableIfNotExisted };
