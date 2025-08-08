import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: true,  // Always true for production cross-origin
    sameSite: 'None',
    maxAge: 7 * 24 * 60 * 60 * 1000, // Match JWT expiry (7 days)
    path: '/',
  });

  return token;
};

