import sharp from 'sharp';
import path from 'path';

const assetsDir = 'C:/Users/akps1/OneDrive/Documents/Intern/Papiah/src/assets';

async function analyze() {
  for (let i = 1; i <= 5; i++) {
    const filename = `book_${i}.webp`;
    const filePath = path.join(assetsDir, filename);
    const image = sharp(filePath);
    const { width, height, hasAlpha } = await image.metadata();
    
    // Let's get corner pixels
    const { data } = await image.raw().toBuffer({ resolveWithObject: true });
    const channels = hasAlpha ? 4 : 3;
    
    // Check pixel at (0, 0)
    const idx = 0;
    const r = data[idx];
    const g = data[idx+1];
    const b = data[idx+2];
    const a = hasAlpha ? data[idx+3] : 255;
    
    console.log(`${filename}: size ${width}x${height}, hasAlpha: ${hasAlpha}, corner pixel: RGB(${r},${g},${b}) Alpha:${a}`);
  }
}

analyze().catch(console.error);
