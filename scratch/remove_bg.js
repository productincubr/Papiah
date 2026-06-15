import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

const assetsDir = 'C:/Users/akps1/OneDrive/Documents/Intern/Papiah/src/assets';

async function removeBackground(filename) {
  const filePath = path.join(assetsDir, filename);
  
  // Read file to buffer first to prevent sharp from locking the file
  const fileBuffer = await fs.promises.readFile(filePath);
  
  const image = sharp(fileBuffer);
  const { width, height, hasAlpha } = await image.metadata();
  
  // Get raw pixel buffer
  const { data } = await image.raw().toBuffer({ resolveWithObject: true });
  
  // Create a new Uint8ClampedArray with 4 channels (RGBA)
  const newData = new Uint8ClampedArray(width * height * 4);
  const srcChannels = hasAlpha ? 4 : 3;
  
  for (let i = 0; i < width * height; i++) {
    newData[i * 4] = data[i * srcChannels];
    newData[i * 4 + 1] = data[i * srcChannels + 1];
    newData[i * 4 + 2] = data[i * srcChannels + 2];
    newData[i * 4 + 3] = hasAlpha ? data[i * srcChannels + 3] : 255;
  }
  
  // Seed color is the top-left corner pixel (0, 0)
  const seedR = newData[0];
  const seedG = newData[1];
  const seedB = newData[2];
  
  const visited = new Uint8Array(width * height);
  const queue = [];
  
  // Helper to push to queue and visit
  function visit(x, y) {
    const idx = y * width + x;
    if (visited[idx]) return;
    visited[idx] = 1;
    queue.push([x, y]);
  }
  
  // Push all boundary pixels to queue
  for (let x = 0; x < width; x++) {
    visit(x, 0);
    visit(x, height - 1);
  }
  for (let y = 0; y < height; y++) {
    visit(0, y);
    visit(width - 1, y);
  }
  
  const threshold = 35; // Maximum color distance to be considered background
  
  let count = 0;
  while (queue.length > 0) {
    const [x, y] = queue.shift();
    const idx = (y * width + x) * 4;
    
    const r = newData[idx];
    const g = newData[idx + 1];
    const b = newData[idx + 2];
    
    // Calculate distance to seed color
    const dist = Math.sqrt((r - seedR) ** 2 + (g - seedG) ** 2 + (b - seedB) ** 2);
    
    if (dist < threshold) {
      newData[idx + 3] = 0; // Make transparent
      count++;
      
      // Check neighbors
      const neighbors = [
        [x + 1, y],
        [x - 1, y],
        [x, y + 1],
        [x, y - 1]
      ];
      for (const [nx, ny] of neighbors) {
        if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
          const nidx = ny * width + nx;
          if (!visited[nidx]) {
            visit(nx, ny);
          }
        }
      }
    }
  }
  
  console.log(`Processed ${filename}: Made ${count} pixels transparent.`);
  
  // Write the image back directly to filePath
  const outBuffer = await sharp(newData, {
    raw: {
      width,
      height,
      channels: 4
    }
  })
  .webp({ quality: 90 })
  .toBuffer();
  
  await fs.promises.writeFile(filePath, outBuffer);
  console.log(`Successfully updated ${filename}`);
}

async function run() {
  // Clean up any temp file if it was created
  try {
    const tempPath = path.join(assetsDir, 'temp_book_1.webp');
    if (fs.existsSync(tempPath)) {
      await fs.promises.unlink(tempPath);
    }
  } catch (err) {
    // ignore
  }

  for (let i = 1; i <= 5; i++) {
    await removeBackground(`book_${i}.webp`);
  }
  console.log("All backgrounds successfully removed and overwritten!");
}

run().catch(console.error);
