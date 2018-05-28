import mysql from 'promise-mysql';

const aggregateKPI = async () => {
  const sql = await mysql.createConnection({
    host: 'monooq-prod.cfscers6catt.ap-northeast-1.rds.amazonaws.com',
    port: 3306,
    database: 'monooq',
    user: 'monooq',
    password: '5Fb9N7Vu',
  });

  const rows = await sql.query('SELECT id, name FROM users');
  console.log(rows.length);

  // TODO デイリーの新規登録ユーザー数
  // TODO デイリーの新規登録スペース数
  // TODO デイリーの新規成約数
  // TODO デイリーの新規リクエスト数
  // TODO デイリーの初回メッセージ返信率

  sql.end();
  console.log('aggregate KPI Success!');
};

aggregateKPI();
