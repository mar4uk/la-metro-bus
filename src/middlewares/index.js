const prepareState = (req, res, next) => {
  req.state = {
    lines: {}
  }

  next();
};

export {
  prepareState
};
