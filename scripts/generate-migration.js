const { execSync } = require('child_process');

const timestamp = Date.now();
const dataSource = 'src/data-source.ts';

try {
  execSync(`npm run typeorm migration:generate -- src/migrations/migration --dataSource ${dataSource}`, { stdio: 'inherit' });
} catch (error) {
  console.error('Failed to generate migration:', error);
  process.exit(1);
}
