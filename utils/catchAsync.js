module.exports = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next); // instead of catch(err=> next(err))
  };
};

