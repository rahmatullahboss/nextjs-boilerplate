#!/usr/bin/env ts-node

/**
 * This script deletes all migrations and resets the database schema.
 * Use with caution - this will result in data loss!
 */

import { exec } from 'child_process'
import { promisify } from 'util'
import path from 'path'

const execPromise = promisify(exec)

async function resetMigrations() {
  try {
    console.log('Resetting migrations...')
    
    // Delete all migration files
    const migrationsDir = path.join(__dirname, '..', 'src', 'migrations')
    await execPromise(`rm -rf ${migrationsDir}/*`)
    console.log('Deleted all migration files')
    
    // Reset database (this would depend on your database setup)
    console.log('Manual step required: Reset your database manually')
    console.log('For local development with Docker:')
    console.log('1. Stop containers: docker-compose down')
    console.log('2. Remove volumes: docker-compose down -v')
    console.log('3. Start containers: docker-compose up -d')
    console.log('4. Run migrations: npm run migrate')
    
  } catch (error) {
    console.error('Error resetting migrations:', error)
  }
}

resetMigrations()