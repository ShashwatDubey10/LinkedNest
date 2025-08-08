import jwt from 'jsonwebtoken';

// Generate JWT token and set it in an HTTP-only cookie with proper settings
export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '7d',  // Token valid for 7 days
  });

  // Set cookie with secure flags
  res.cookie('jwt', token, {
    httpOnly: true,          // JavaScript cannot access the cookie
    secure: true,            // Send cookie only over HTTPS (set true in production)
    sameSite: 'None',        // To allow cross-origin cookie sending
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    path: '/',               // Cookie available site-wide
  });

  return token;
};
