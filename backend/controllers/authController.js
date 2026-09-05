import bcrypt from "bcryptjs";
import {
  countUsers,
  createUser,
  findUserByEmail,
} from "../module/authModules.js";
import { isDashboardRole, signAuthToken } from "../middleware/auth.js";

function publicUser(user) {
  return {
    id: user.id,
    name: user.full_name,
    email: user.email,
    role: user.role,
  };
}

export async function register(req, res) {
  try {
    const fullName = String(req.body.name || req.body.fullName || "").trim();
    const email = String(req.body.email || "").trim().toLowerCase();
    const password = String(req.body.password || "");

    if (!fullName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and password are required.",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters.",
      });
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address.",
      });
    }

    const existing = await findUserByEmail(email);
    if (existing) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists.",
      });
    }

    const totalUsers = await countUsers();
    // Bootstrap admin only on a completely empty user table.
    // After seed/init creates accounts, public registration cannot self-promote.
    const role = totalUsers === 0 ? "admin" : "user";
    const passwordHash = await bcrypt.hash(password, 10);

    const user = await createUser({
      fullName,
      email,
      passwordHash,
      role,
    });

    const token = signAuthToken(user);

    return res.status(201).json({
      success: true,
      message:
        role === "admin"
          ? "Admin account created. You can now access the dashboard."
          : "Account created. Only the first registered admin can access the dashboard.",
      data: {
        token,
        user: publicUser(user),
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to create account right now. Please try again.",
    });
  }
}

export async function login(req, res) {
  try {
    const email = String(req.body.email || "").trim().toLowerCase();
    const password = String(req.body.password || "");

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const matched = await bcrypt.compare(password, user.password_hash);
    if (!matched) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    if (!isDashboardRole(user.role)) {
      return res.status(403).json({
        success: false,
        message: "This account cannot access the admin dashboard.",
      });
    }

    const token = signAuthToken(user);

    return res.status(200).json({
      success: true,
      message: "Logged in successfully.",
      data: {
        token,
        user: publicUser(user),
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to log in right now. Please try again.",
    });
  }
}

export async function me(req, res) {
  return res.status(200).json({
    success: true,
    data: {
      user: {
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
      },
    },
  });
}
