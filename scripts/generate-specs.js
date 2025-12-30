const { exec } = require('child_process');
const fs = require('fs-extra');
const path = require('path');

async function generateSpecs() {
  console.log('🚀 Starting Speckit documentation generation...');

  // Create specs directory if it doesn't exist
  await fs.ensureDir('./specs');
  console.log('📁 Specs directory prepared');

  // Run JSDoc to generate specs from code comments
  const jsdocConfig = path.join(__dirname, '../speckit.config.js');

  exec(`npx jsdoc -c ${jsdocConfig}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`❌ Error generating specs: ${error.message}`);
      process.exit(1);
    }

    if (stderr) {
      console.warn(`⚠️  Warnings during generation: ${stderr}`);
    }

    console.log(`✅ Specs generated successfully!`);
    console.log(`📄 Output location: ./specs/`);

    if (stdout) {
      console.log(`📝 Generation log: ${stdout}`);
    }
  });
}

// Run the generation
generateSpecs().catch(error => {
  console.error('❌ Failed to run generation:', error);
  process.exit(1);
});