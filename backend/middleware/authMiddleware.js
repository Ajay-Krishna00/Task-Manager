import { supabase } from "../utils/supabaseClient.js";

const authMiddleware = async (req, res, next) => {
  try {
    // Get the authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        error: "Authorization header must be provided with Bearer scheme",
      });
    }

    // Extract the token
    const token = authHeader.split(" ")[1];

    if (!token.trim()) {
      return res.status(401).json({
        error: "Token cannot be empty",
      });
    }
    // Verify the token using Supabase
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token);

    if (error) {
      if (error.message.includes("token is expired")) {
        await supabase.auth.signOut();
        console.error("Token expired, user signed out");
        return res.status(401).json({
          error: "Token expired, please log in again",
        });
      } else {
        console.error(
          `Authentication error type: ${error.name}, Error message: ${error.message}`,
        );
        return res.status(401).json({
          error: "Invalid or expired token",
        });
      }
    }

    if (!user) {
      return res.status(401).json({
        error: "User not found",
      });
    }

    // Attach user to request object
    req.user = user;

    next();
  } catch (error) {
    console.error("Internal error in authentication middleware:", error);
    return res.status(500).json({
      error: "Authentication service unavailable",
    });
  }
};

export default authMiddleware;
