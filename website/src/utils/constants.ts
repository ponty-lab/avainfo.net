const size: Record<string, number> = {
  mobileS: 320,
  mobileM: 375,
  mobileL: 425,
  tablet: 768,
  laptop: 992,
};

export const device = Object.keys(size).reduce(
  (acc: Record<string, string>, cur) => {
    acc[cur] = `(min-width: ${size[cur]}px)`;
    return acc;
  },
  {}
);

export const contactEmail = "avainfo.net@gmail.com";
