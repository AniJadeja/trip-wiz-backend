exports.verifyAccessToken = (req, res, next) => {
    const { accessToken } = req.body;
  
    // Check if the accessToken is "xyz" or any other valid token.
    if (accessToken === "xyz") {
      next(); // Proceed to the controller.
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
  };
  