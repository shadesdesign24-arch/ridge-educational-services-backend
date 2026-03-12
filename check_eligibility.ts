import { sequelize } from './src/config/db';
import { CutoffMarks } from './src/models/pg/CutoffMarks';
import { College } from './src/models/pg/College';
import { Op } from 'sequelize';

async function main() {
  await sequelize.authenticate();
  
  const cutoffs = await CutoffMarks.findAll({
    where: {
      courseName: 'B.E.Computer Science',
      category: 'General',
      minimumCutoff: { [Op.lte]: 200 },
    },
    include: [{ model: College, as: 'college' }],
  });

  const eligibleColleges = cutoffs.map(cutoff => ({
    cutoffDetails: cutoff,
    college: cutoff.college,
  }));

  console.log(JSON.stringify(eligibleColleges, null, 2));
  process.exit(0);
}
main().catch(e => { console.error(e.message); process.exit(1); });
