import sharp from 'sharp';
import fs from 'fs';

async function run() {
  const filePath = 'C:/Users/akps1/OneDrive/Documents/Intern/Papiah/src/assets/fibre_step_1.webp';
  const buffer = fs.readFileSync(filePath);
  const image = sharp(buffer);
  const { width, height } = await image.metadata();
  
  const { data } = await image.raw().toBuffer({ resolveWithObject: true });
  
  console.log(`Analyzing bottom rows of fibre_step_1.webp (${width}x${height}):`);
  for (let y = height - 1; y >= height - 200; y -= 10) {
    let activeCount = 0;
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      if (data[idx + 3] > 10) {
        activeCount++;
      }
    }
    console.log(`Row y = ${y}: ${activeCount} active pixels`);
  }
}

run().catch(console.error);
