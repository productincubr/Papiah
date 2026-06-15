import sharp from 'sharp';
import fs from 'fs';

sharp.cache(false);

async function cropImage(filename) {
  const filePath = `C:/Users/akps1/OneDrive/Documents/Intern/Papiah/src/assets/${filename}`;
  
  const buffer = fs.readFileSync(filePath);
  const image = sharp(buffer);
  const metadata = await image.metadata();
  const { width, height, hasAlpha } = metadata;
  
  if (!hasAlpha) {
    console.log(`${filename} does not have alpha channel, skipping.`);
    return;
  }
  
  const { data } = await image.raw().toBuffer({ resolveWithObject: true });
  const channels = 4;
  
  // Find first row from top with active pixels (threshold: > 20 active pixels)
  let topOffset = 0;
  for (let y = 0; y < height; y++) {
    let activeCount = 0;
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * channels;
      if (data[idx + 3] > 10) {
        activeCount++;
      }
    }
    if (activeCount > 20) {
      topOffset = y;
      break;
    }
  }

  // Find first row from bottom with active pixels (threshold: > 20 active pixels)
  let bottomOffset = height - 1;
  for (let y = height - 1; y >= 0; y--) {
    let activeCount = 0;
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * channels;
      if (data[idx + 3] > 10) {
        activeCount++;
      }
    }
    if (activeCount > 20) {
      bottomOffset = y;
      break;
    }
  }

  // Add 1px padding to be safe
  const cropTop = Math.max(0, topOffset - 1);
  const cropBottom = Math.min(height - 1, bottomOffset + 1);
  const croppedHeight = cropBottom - cropTop + 1;
  console.log(`${filename}: original: ${width}x${height}, cropped: top:${cropTop} bottom:${cropBottom} height:${croppedHeight}`);

  if (croppedHeight < height || cropTop > 0) {
    const tempBuffer = await sharp(buffer)
      .extract({ left: 0, top: cropTop, width, height: croppedHeight })
      .toBuffer();
      
    fs.writeFileSync(filePath, tempBuffer);
    console.log(`Successfully cropped and saved ${filename}`);
  } else {
    console.log(`No cropping needed for ${filename}`);
  }
}

async function run() {
  await cropImage('fibre_step_1.webp');
  await cropImage('fibre_step_2.webp');
  await cropImage('fibre_step_3.webp');
  await cropImage('fibre_step_4.webp');
}

run().catch(console.error);
