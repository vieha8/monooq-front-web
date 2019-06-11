export const isImageDefault = imageUrl => {
  if (!imageUrl) return false;
  return !!imageUrl.includes('data:image/png;base64,');
};

export default isImageDefault;
