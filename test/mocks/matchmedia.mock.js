import cssMediaQuery from 'css-mediaquery';

export default config => {
  return {
    matchMedia: media => {
      return {
        matches: cssMediaQuery.match(media, config),
        media,
      };
    },
  };
};
