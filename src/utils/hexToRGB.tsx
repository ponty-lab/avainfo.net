export const hexToRGB = (hex: string, alpha: string) => {
  try {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    } else {
      return `rgb(${r}, ${g}, ${b})`;
    }
  } catch (error) {
    //logger.error('Unable to convert hex to RGB', error)
    return `rgba(224,224,224,${alpha})`;
  }
};
