/**
 * This script provides instructions for resetting migrations.
 * Use with caution - this will result in data loss!
 */

console.log('To reset migrations, follow these steps:');
console.log('');
console.log('1. Delete all files in the src/migrations directory');
console.log('2. Reset your database:');
console.log('   For Docker setup:');
console.log('   - Stop containers: docker-compose down');
console.log('   - Remove volumes: docker-compose down -v');
console.log('   - Start containers: docker-compose up -d');
console.log('3. Run migrations: npm run migrate');
console.log('4. Seed data: npm run db:seed');