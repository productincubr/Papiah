import sharp from 'sharp';

async function checkImage() {
  const meta1 = await sharp('C:/Users/akps1/OneDrive/Documents/Intern/Papiah/src/assets/fibre_step_1.webp').metadata();
  const meta2 = await sharp('C:/Users/akps1/OneDrive/Documents/Intern/Papiah/src/assets/fibre_step_2.webp').metadata();
  const meta3 = await sharp('C:/Users/akps1/OneDrive/Documents/Intern/Papiah/src/assets/fibre_step_3.webp').metadata();
  const meta4 = await sharp('C:/Users/akps1/OneDrive/Documents/Intern/Papiah/src/assets/fibre_step_4.webp').metadata();

  console.log('Step 1:', meta1.width, 'x', meta1.height);
  console.log('Step 2:', meta2.width, 'x', meta2.height);
  console.log('Step 3:', meta3.width, 'x', meta3.height);
  console.log('Step 4:', meta4.width, 'x', meta4.height);
}

checkImage().catch(console.error);
