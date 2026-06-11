import { v2 as cloudinary } from "cloudinary";

// STEP 3.1: Configure Cloudinary with inline credentials
cloudinary.config({
  cloud_name: "dfbmahjk8",
  api_key: "392469622373722",
  api_secret: "34tXojUfTDjbC3PvbNiZqOhbdYU",
  secure: true
});

async function runOnboarding() {
  try {
    console.log("Uploading sample image to Cloudinary...");
    
    // STEP 3.2: Upload a sample image URL from Cloudinary's demo domains
    const uploadResult = await cloudinary.uploader.upload(
      "https://res.cloudinary.com/demo/image/upload/v1570975827/sample.jpg"
    );

    console.log("\n--- Upload Successful ---");
    console.log(`Secure URL: ${uploadResult.secure_url}`);
    console.log(`Public ID: ${uploadResult.public_id}`);

    // STEP 3.3: Fetch and print image details (width, height, format, file size)
    console.log("\nFetching image details from Cloudinary API...");
    const details = await cloudinary.api.resource(uploadResult.public_id);

    console.log("\n--- Image Metadata ---");
    console.log(`Width: ${details.width}px`);
    console.log(`Height: ${details.height}px`);
    console.log(`Format: ${details.format}`);
    console.log(`File Size: ${details.bytes} bytes`);

    // STEP 3.4: Generate a transformed URL using f_auto and q_auto
    // fetch_format: 'auto' (f_auto) -> Automatically selects the best image format for the requesting browser (WebP, AVIF, etc.)
    // quality: 'auto' (q_auto) -> Optimizes the image quality and file size automatically without visible visual loss
    const transformedUrl = cloudinary.url(uploadResult.public_id, {
      fetch_format: "auto",
      quality: "auto",
      secure: true
    });

    console.log("\nDone! Click link below to see optimized version of the image. Check the size and the format.");
    console.log(transformedUrl);

  } catch (error) {
    console.error("Error during Cloudinary operations:", error);
    process.exit(1);
  }
}

runOnboarding();
