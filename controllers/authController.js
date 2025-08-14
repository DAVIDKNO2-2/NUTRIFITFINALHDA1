// src/controllers/authController.js

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const bcrypt = require("bcrypt");
const crypto = require("crypto");

const {
  enviarTokenPorCorreo,
  enviarUsuarioPorCorreo,
} = require("../utils/emailSender");

// -----------------------------
// REGISTRO DE USUARIO
// -----------------------------

const register = async (req, res) => {
  const { name, email, password } = req.body;
  

  try {
    if (!name || !email || !password) {
      return res.status(400).send("Llene los campos requeridos.");
    }

    const existingUsuario = await prisma.usuario.findUnique({
      where: { email },
    });
    if (existingUsuario) {
      return res.status(400).send("ya es+xiste el usuario");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.usuario.create({
      data: {
        name: name.trim(),
        email: email.trim(),
        password: hashedPassword,
        rol: "CLIENTE",
      },
    });

    console.log("Usuario registrado:", user);

    return res.status(201).send(user);
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    return "ERROR";
  }
};

// -----------------------------
// INICIO DE SESIÓN
// -----------------------------
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).send("Correo y contraseña son requeridos.");
    }

    const usuario = await prisma.usuario.findUnique({ where: { email } });

    if (!usuario) {
      return res.status(404).send("Usuario no encontrado");
    }

    const match = await bcrypt.compare(password, usuario.password);
    if (!match) {
      return res.status(401).send("Contraseña incorrecta");
    }

    req.session.userId = usuario.id;
    req.session.userName = usuario.name;
    req.session.userEmail = usuario.email;

    res.send("dashboard");
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).send("Error interno en el servidor");
  }
};

// -----------------------------
// CIERRE DE SESIÓN
// -----------------------------
const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error al cerrar sesión:", err);
      return res.status(500).send("Error al cerrar sesión");
    }
    res.clearCookie("connect.sid");
    res.redirect("/login.html");
  });
};

// -----------------------------
// RECUPERAR USUARIO POR CORREO
// -----------------------------
const recuperarUsuario = async (req, res) => {
  const { email } = req.body;

  try {
    if (!email) {
      return res.redirect(
        "/recuperar-usuario.html?error=El correo es obligatorio."
      );
    }

    const usuario = await prisma.usuario.findUnique({ where: { email } });

    if (!usuario) {
      return res.redirect(
        "/recuperar-usuario.html?error=No se encontró un usuario con ese correo."
      );
    }

    await enviarUsuarioPorCorreo(usuario.email, usuario.name);

    return res.redirect(
      "/recuperar-usuario.html?success=Te enviamos tu nombre de usuario al correo"
    );
  } catch (error) {
    console.error("Error al recuperar el usuario:", error);
    return res.redirect(
      "/recuperar-usuario.html?error=Error interno al recuperar el usuario"
    );
  }
};

// -----------------------------
// ENVÍO DE TOKEN POR CORREO
// -----------------------------
const enviarTokenRecuperacion = async (req, res) => {
  const { email } = req.body;

  try {
    if (!email) {
      return res.redirect(
        "/recuperar-contrasena.html?error=El correo es obligatorio."
      );
    }

    const usuario = await prisma.usuario.findUnique({ where: { email } });

    if (!usuario) {
      return res.redirect(
        "/recuperar-contrasena.html?error=Correo no encontrado."
      );
    }

    const token = crypto.randomBytes(20).toString("hex");

    await prisma.usuario.update({
      where: { email },
      data: {
        resetToken: token,
        resetTokenExpiry: new Date(Date.now() + 15 * 60 * 1000), // 15 minutos
      },
    });

    await enviarTokenPorCorreo(email, token);

    res.redirect(
      "/recuperar-contrasena.html?success=Se ha enviado un enlace de recuperación a tu correo."
    );
  } catch (error) {
    console.error("Error al generar token:", error);
    res.redirect(
      "/recuperar-contrasena.html?error=Error al generar el token de recuperación."
    );
  }
};

// -----------------------------
// CAMBIO DE CONTRASEÑA USANDO TOKEN
// -----------------------------
const cambiarContrasena = async (req, res) => {
  const { token, nuevaContrasena } = req.body;

  try {
    if (!token || !nuevaContrasena) {
      return res.status(400).send("Token y nueva contraseña son requeridos.");
    }

    const usuario = await prisma.usuario.findFirst({
      where: {
        resetToken: token,
        resetTokenExpiry: {
          gte: new Date(),
        },
      },
    });

    if (!usuario) {
      return res.status(400).send("Token inválido o expirado");
    }

    const hashedPassword = await bcrypt.hash(nuevaContrasena, 10);

    await prisma.usuario.update({
      where: { id: usuario.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null,
      },
    });

    res.redirect("/confirmacion-exitosa.html");
  } catch (error) {
    console.error("Error al cambiar la contraseña:", error);
    res.status(500).send("Error al cambiar la contraseña");
  }
};

// Exportaciones
module.exports = {
  register,
  login,
  logout,
  recuperarUsuario,
  enviarTokenRecuperacion,
  cambiarContrasena,
};
