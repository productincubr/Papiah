import sharp from 'sharp';

async function run() {
  const filePath = 'C:/Users/akps1/OneDrive/Documents/Intern/Papiah/src/assets/fibre_step_1.webp';
  const image = sharp(filePath);
  const { width, height, hasAlpha } = await image.metadata();
  
  // Get raw pixel data with alpha channel
  const { data } = await image.raw().toBuffer({ resolveWithObject: true });
  const channels = hasAlpha ? 4 : 3;
  
  console.log(`Dimensions: ${width}x${height}`);
  console.log(`Has Alpha Channel: ${hasAlpha}`);

  // Sample alpha values from top to bottom at the horizontal center
  const x = Math.floor(width / 2);
  for (let y = 0; y < height; y += 30) {
    const idx = (y * width + x) * channels;
    const r = data[idx];
    const g = data[idx+1];
    const b = data[idx+2];
    const a = hasAlpha ? data[idx+3] : 255;
    console.log(`y = ${y}: RGB(${r},${g},${b}) Alpha:${a}`);
  }
}

run().catch(console.error);
