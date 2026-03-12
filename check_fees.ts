import { sequelize } from './src/config/db';

async function main() {
  await sequelize.authenticate();
  const [rows] = await sequelize.query(`SELECT id, name, "yearWiseFees", "admissionFee", "healthCardFee", "applicationFee" FROM colleges`);
  console.log(JSON.stringify(rows, null, 2));
  process.exit(0);
}
main().catch(e => { console.error(e.message); process.exit(1); });
