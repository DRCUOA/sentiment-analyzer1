import Joi from 'joi';

function toaster(req, res, next) {
  res.locals.toastMessage = req.cookies.toastMessage;
  res.clearCookie('toastMessage');
  res.setToastMessage = (message) => {
    res.cookie("toastMessage", message);
  };
  next();
};

export { toaster };
