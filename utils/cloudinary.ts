import { Cloudinary } from '@cloudinary/url-gen';
import { CLOUDINARY_CLOUD_NAME } from '../config/env';

// Initialize Cloudinary
const cld = new Cloudinary({
  cloud: {
    cloudName: CLOUDINARY_CLOUD_NAME
  }
});

// Utility function to get optimized image URL
export const getCloudinaryImage = (publicId: string, width?: number, height?: number) => {
  try {
    let imageUrl = cld.image(publicId);
    
    // // Add transformations if width or height is provided
    // if (width || height) {
    //   imageUrl = imageUrl.resize(`w_${width},h_${height},c_fill`);
    // }
    
    // Add quality and format optimizations
    // imageUrl = imageUrl
    //   .quality('auto')
    //   .format('auto');
    
    return imageUrl.toURL();
  } catch (error) {
    console.error('Error generating Cloudinary URL:', error);
    return null;
  }
}; 