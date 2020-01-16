-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 19-12-2019 a las 13:34:12
-- Versión del servidor: 10.4.6-MariaDB
-- Versión de PHP: 7.3.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bbdd_grupo4`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `spAllCategorias` ()  NO SQL
SELECT * FROM categoria$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spAllConsultas` ()  NO SQL
SELECT * FROM consulta$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spAllEntrenadores` ()  NO SQL
SELECT * FROM entrenador$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spAllEquipos` ()  NO SQL
SELECT * FROM equipo$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spAllJugadores` ()  NO SQL
SELECT * FROM jugador$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spAllUsuarios` ()  NO SQL
SELECT * FROM usuario$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spAniadirUsuario` (IN `pUsuario` VARCHAR(50), IN `pContrasena` VARCHAR(255), IN `pNombre` VARCHAR(50), IN `pCorreo` VARCHAR(50), IN `pTipo` INT)  NO SQL
BEGIN INSERT INTO usuario (usuario.usuario, usuario.contrasena, usuario.nombre, usuario.correo,usuario.tipo) VALUES (pUsuario, pContrasena, pNombre, pCorreo,pTipo); END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spBorrarCategoria` (IN `pId` INT)  NO SQL
DELETE FROM categoria
WHERE categoria.idCategoria = pId$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spBorrarConsulta` (IN `pId` INT)  NO SQL
DELETE FROM consulta
WHERE consulta.idConsulta = pId$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spBorrarEntrenador` (IN `pId` INT)  NO SQL
DELETE FROM entrenador
WHERE entrenador.idEntrenador = pId$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spBorrarEquipo` (IN `pId` INT)  NO SQL
DELETE FROM equipo
WHERE equipo.idEquipo = pId$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spBorrarJugador` (IN `pId` INT)  NO SQL
DELETE FROM jugador
WHERE jugador.idJugador = pId$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spBorrarUsuario` (IN `pId` INT)  NO SQL
DELETE FROM usuario
WHERE usuario.idUsuario = pId$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spBuscarCategoriaId` (IN `pNombre` VARCHAR(42))  NO SQL
select * from categoria where categoria.nombre=pNombre$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spBuscarEquipoId` (IN `pNombre` VARCHAR(42))  NO SQL
select * from equipo where equipo.nombre=pNombre$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spBuscarUsuarioId` (IN `pUsuario` VARCHAR(42))  NO SQL
select * from usuario where usuario.usuario=pUsuario$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spEntrenadoresPorEquipo` (IN `pId` INT)  NO SQL
SELECT * FROM entrenador WHERE entrenador.idEquipo = pId$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spEquiposPorCategoria` (IN `p_idCategoria` INT)  NO SQL
SELECT * FROM equipo WHERE equipo.idCategoria=p_idCategoria$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spInsertarCategoria` (IN `pNombre` VARCHAR(50), IN `pImagen` VARCHAR(200))  NO SQL
INSERT INTO `categoria`(`nombre`, `imagen`) VALUES (pNombre,pImagen)$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spInsertarConsulta` (IN `pConsulta` VARCHAR(300), IN `pIdUsuario` INT(200))  NO SQL
INSERT INTO `consulta`(`consulta`, `idUsuario`) VALUES (pConsulta,pIdUsuario)$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spInsertarEntrenador` (IN `pNombre` VARCHAR(50), IN `pImagen` VARCHAR(200), IN `pTelefono` VARCHAR(42), IN `pIdEquipo` INT)  NO SQL
INSERT INTO `entrenador`(`nombre`, `imagen`, `telefono`, `idEquipo`) VALUES (pNombre,pImagen,pTelefono,pIdEquipo)$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spInsertarEquipo` (IN `pNombre` VARCHAR(50), IN `pLogo` VARCHAR(200), IN `pIdCategoria` INT)  NO SQL
INSERT INTO `equipo`(`nombre`, `logo`, `idCategoria`) VALUES (pNombre,pLogo,pIdCategoria)$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spInsertarJugador` (IN `pNombre` VARCHAR(50), IN `pImagen` VARCHAR(200), IN `pRol` VARCHAR(50), IN `pTelefono` VARCHAR(42), IN `pIdEquipo` INT)  NO SQL
INSERT INTO `jugador`(`nombre`, `imagen`, `rol`, `telefono`, `idEquipo`) VALUES (pNombre,pImagen,pRol,pTelefono,pIdEquipo)$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spInsertarUsuario` (IN `pUsuario` VARCHAR(50), IN `pContrasena` VARCHAR(255), IN `pNombre` VARCHAR(50), IN `pCorreo` VARCHAR(50))  NO SQL
BEGIN
INSERT INTO usuario (usuario.usuario, usuario.contrasena, usuario.nombre, usuario.correo)
VALUES (pUsuario, pContrasena, pNombre, pCorreo);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spJugadoresPorEquipo` (IN `pIdEquipo` INT)  NO SQL
SELECT * FROM jugador WHERE jugador.idEquipo=pIdEquipo ORDER BY jugador.rol$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spModificarCategoria` (IN `pId` INT, IN `pNombre` VARCHAR(50))  NO SQL
UPDATE categoria
SET categoria.nombre = pNombre
WHERE categoria.idCategoria = pId$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spModificarConsulta` (IN `pIdConsulta` INT, IN `pNombre` VARCHAR(50), IN `pIdUsuario` INT)  NO SQL
UPDATE consulta
SET consulta.consulta = pConsulta, consulta.idUsuario = pIdUsuario
WHERE consulta.idConsulta = pIdConsulta$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spModificarEntrenador` (IN `pIdEntrenador` INT, IN `pNombre` VARCHAR(50), IN `pImagen` VARCHAR(200), IN `pTelefono` VARCHAR(9), IN `pIdEquipo` INT)  NO SQL
UPDATE entrenador
SET entrenador.nombre = pNombre, entrenador.imagen = pImagen, entrenador.telefono = pTelefono, entrenador.idEquipo = pIdEquipo
WHERE entrenador.idEntrenador = pIdEntrenador$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spModificarEquipo` (IN `pIdEquipo` INT, IN `pNombre` VARCHAR(50), IN `pIdCategoria` INT, IN `pLogo` VARCHAR(200))  NO SQL
UPDATE equipo
SET equipo.nombre = pNombre, equipo.idCategoria = pIdCategoria, equipo.logo = pLogo
WHERE equipo.idEquipo = pIdEquipo$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spModificarJugador` (IN `pIdJugador` INT, IN `pIdEquipo` INT, IN `pNombre` VARCHAR(50), IN `pRol` VARCHAR(50), IN `pImagen` VARCHAR(200), IN `pTelefono` VARCHAR(9))  NO SQL
UPDATE jugador
SET jugador.idEquipo = pIdEquipo, jugador.nombre = pNombre, jugador.rol = pRol, jugador.imagen = pImagen, jugador.telefono = pTelefono
WHERE jugador.idJugador = pIdJugador$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spModificarUsuario` (IN `pId` INT, IN `pUsuario` VARCHAR(50), IN `pContrasena` VARCHAR(50), IN `pNombre` VARCHAR(50), IN `pCorreo` VARCHAR(50), IN `pTipo` TINYINT(1))  NO SQL
UPDATE usuario
SET usuario.usuario = pUsuario, usuario.contrasena = pContrasena, usuario.nombre = pNombre, usuario.correo = pCorreo, usuario.tipo = pTipo
WHERE usuario.idUsuario = pId$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spSeleccionarCategoriaPorId` (IN `pIdCategoria` INT)  NO SQL
select * from categoria where categoria.idCategoria=pIdCategoria$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spSeleccionarEquipoPorId` (IN `pIdEquipo` INT)  NO SQL
select * from equipo where equipo.idEquipo=pIdEquipo$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spSeleccionarUsuarioPorCorreo` (IN `pCorreo` VARCHAR(50))  NO SQL
SELECT * FROM `usuario` WHERE usuario.correo = pCorreo$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spSeleccionarUsuarioPorId` (IN `pIdUsuario` INT)  NO SQL
select * from usuario where usuario.idUsuario=pIdUsuario$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spSeleccionarUsuarioPorUsername` (IN `pUsuario` VARCHAR(50))  NO SQL
SELECT * FROM `usuario` WHERE usuario.usuario = pUsuario$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `idCategoria` int(11) NOT NULL,
  `nombre` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `imagen` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`idCategoria`, `nombre`, `imagen`) VALUES
(1, 'junior', 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/quidditch-1551273794.jpg?crop=1.00xw:1.00xh;0,0&resize=480:*'),
(2, 'senior', 'https://cflvdg.avoz.es/default/2017/07/23/00121500825122873578225/Foto/SL24C6F1_17512.jpg'),
(3, 'master', 'https://media.quincemil.com/imagenes/2019/05/10165227/Formaci%C3%B3n1887-1440x1080.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `consulta`
--

CREATE TABLE `consulta` (
  `idConsulta` int(11) NOT NULL,
  `consulta` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `idUsuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `consulta`
--

INSERT INTO `consulta` (`idConsulta`, `consulta`, `idUsuario`) VALUES
(1, 'Prueba anónimo index.', 100),
(2, 'Prueba Markel index.', 100),
(3, 'Prueba 2 Markel index.', 2),
(4, 'Prueba Iker equipos.', 100),
(5, 'Prueba 2 Iker equipos.', 1),
(6, 'Prueba Eder equipos.', 4),
(7, 'Prueba 2 Eder equipos.', 4),
(8, 'Prueba anónimo equipos.', 100),
(9, 'Prueba 2 anónimo index.', 100);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `entrenador`
--

CREATE TABLE `entrenador` (
  `idEntrenador` int(11) NOT NULL,
  `nombre` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `imagen` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `telefono` varchar(9) COLLATE utf8mb4_unicode_ci NOT NULL,
  `idEquipo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `entrenador`
--

INSERT INTO `entrenador` (`idEntrenador`, `nombre`, `imagen`, `telefono`, `idEquipo`) VALUES
(1, 'Pepe', 'https://www.stickpng.com/assets/thumbs/585e4bf3cb11b227491c339a.png', '694958592', 1),
(2, 'Ana', 'https://www.stickpng.com/assets/thumbs/585e4bf3cb11b227491c339a.png', '638475935', 2),
(3, 'Ekaitz', 'https://www.stickpng.com/assets/thumbs/585e4bf3cb11b227491c339a.png', '695868949', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `equipo`
--

CREATE TABLE `equipo` (
  `idEquipo` int(11) NOT NULL,
  `nombre` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logo` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `idCategoria` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `equipo`
--

INSERT INTO `equipo` (`idEquipo`, `nombre`, `logo`, `idCategoria`) VALUES
(1, 'Zornotza Quidditch Junior', 'https://i.pinimg.com/originals/b8/a4/64/b8a464738b1b367f75ad4c240050a73b.jpg', 1),
(2, 'Zornotza Quidditch Senior', 'https://i.pinimg.com/originals/b8/a4/64/b8a464738b1b367f75ad4c240050a73b.jpg', 2),
(3, 'Zornotza Quidditch Master', 'https://i.pinimg.com/originals/b8/a4/64/b8a464738b1b367f75ad4c240050a73b.jpg', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `jugador`
--

CREATE TABLE `jugador` (
  `idJugador` int(11) NOT NULL,
  `nombre` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `imagen` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `rol` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `telefono` varchar(9) COLLATE utf8mb4_unicode_ci NOT NULL,
  `idEquipo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `jugador`
--

INSERT INTO `jugador` (`idJugador`, `nombre`, `imagen`, `rol`, `telefono`, `idEquipo`) VALUES
(1, 'Eukene', 'https://www.stickpng.com/assets/thumbs/585e4bf3cb11b227491c339a.png', 'cazador', '629304384', 1),
(2, 'Iker', 'https://www.stickpng.com/assets/thumbs/585e4bf3cb11b227491c339a.png', 'cazador', '603059303', 1),
(3, 'Eder', 'https://www.stickpng.com/assets/thumbs/585e4bf3cb11b227491c339a.png', 'cazador', '610395839', 1),
(4, 'Markel', 'https://www.stickpng.com/assets/thumbs/585e4bf3cb11b227491c339a.png', 'cazador', '693043294', 1),
(5, 'Eider', 'https://www.stickpng.com/assets/thumbs/585e4bf3cb11b227491c339a.png', 'cazador', '620394829', 1),
(6, 'Maite', 'https://www.stickpng.com/assets/thumbs/585e4bf3cb11b227491c339a.png', 'golpeador', '698394053', 1),
(7, 'Ander', 'https://www.stickpng.com/assets/thumbs/585e4bf3cb11b227491c339a.png', 'golpeador', '667859405', 1),
(8, 'Maitane', 'https://www.stickpng.com/assets/thumbs/585e4bf3cb11b227491c339a.png', 'golpeador', '684930495', 1),
(9, 'Mikel', 'https://www.stickpng.com/assets/thumbs/585e4bf3cb11b227491c339a.png', 'guardian', '619203923', 1),
(10, 'Sara', 'https://www.stickpng.com/assets/thumbs/585e4bf3cb11b227491c339a.png', 'guardian', '657463827', 1),
(11, 'Ibai', 'https://www.stickpng.com/assets/thumbs/585e4bf3cb11b227491c339a.png', 'buscador', '609839481', 1),
(12, 'Ane', 'https://www.stickpng.com/assets/thumbs/585e4bf3cb11b227491c339a.png', 'buscador', '668490392', 1),
(13, 'Oihane', 'https://www.stickpng.com/assets/thumbs/585e4bf3cb11b227491c339a.png', 'cazador', '693029491', 2),
(14, 'Nerea', 'https://www.stickpng.com/assets/thumbs/585e4bf3cb11b227491c339a.png', 'cazador', '666392834', 2),
(15, 'Jon', 'https://www.stickpng.com/assets/thumbs/585e4bf3cb11b227491c339a.png', 'cazador', '672839438', 2),
(16, 'Iñaki', 'https://www.stickpng.com/assets/thumbs/585e4bf3cb11b227491c339a.png', 'cazador', '637483942', 2),
(17, 'Olatz', 'https://www.stickpng.com/assets/thumbs/585e4bf3cb11b227491c339a.png', 'cazador', '658493059', 2),
(18, 'Irene', 'https://www.stickpng.com/assets/thumbs/585e4bf3cb11b227491c339a.png', 'golpeador', '689504943', 2),
(19, 'Kimetz', 'https://www.stickpng.com/assets/thumbs/585e4bf3cb11b227491c339a.png', 'golpeador', '695847336', 2),
(20, 'Kenar', 'https://www.stickpng.com/assets/thumbs/585e4bf3cb11b227491c339a.png', 'golpeador', '605949380', 2),
(21, 'Irati', 'https://www.stickpng.com/assets/thumbs/585e4bf3cb11b227491c339a.png', 'guardian', '643454322', 2),
(22, 'Iratxe', 'https://www.stickpng.com/assets/thumbs/585e4bf3cb11b227491c339a.png', 'guardian', '685948574', 2),
(23, 'Julen', 'https://www.stickpng.com/assets/thumbs/585e4bf3cb11b227491c339a.png', 'buscador', '695847586', 2),
(24, 'Asier', 'https://www.stickpng.com/assets/thumbs/585e4bf3cb11b227491c339a.png', 'buscador', '648395057', 2),
(25, 'Paula', 'https://www.stickpng.com/assets/thumbs/585e4bf3cb11b227491c339a.png', 'cazador', '698495839', 3),
(26, 'Yaiza', 'https://www.stickpng.com/assets/thumbs/585e4bf3cb11b227491c339a.png', 'cazador', '629394830', 3),
(27, 'Jorge', 'https://www.stickpng.com/assets/thumbs/585e4bf3cb11b227491c339a.png', 'cazador', '694203948', 3),
(28, 'Andrea', 'https://www.stickpng.com/assets/thumbs/585e4bf3cb11b227491c339a.png', 'cazador', '639485744', 3),
(29, 'Adrian', 'https://www.stickpng.com/assets/thumbs/585e4bf3cb11b227491c339a.png', 'cazador', '684953940', 3),
(30, 'Carlos', 'https://www.stickpng.com/assets/thumbs/585e4bf3cb11b227491c339a.png', 'golpeador', '645865839', 3),
(31, 'Maider', 'https://www.stickpng.com/assets/thumbs/585e4bf3cb11b227491c339a.png', 'golpeador', '666059403', 3),
(32, 'Gotzon', 'https://www.stickpng.com/assets/thumbs/585e4bf3cb11b227491c339a.png', 'golpeador', '602345789', 3),
(33, 'Jaime', 'https://www.stickpng.com/assets/thumbs/585e4bf3cb11b227491c339a.png', 'guardian', '698484934', 3),
(34, 'Ainara', 'https://www.stickpng.com/assets/thumbs/585e4bf3cb11b227491c339a.png', 'guardian', '648593958', 3),
(35, 'Maialen', 'https://www.stickpng.com/assets/thumbs/585e4bf3cb11b227491c339a.png', 'buscador', '684736274', 3),
(36, 'Iñigo', 'https://www.stickpng.com/assets/thumbs/585e4bf3cb11b227491c339a.png', 'buscador', '612467092', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `idUsuario` int(11) NOT NULL,
  `usuario` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `contrasena` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nombre` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `correo` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tipo` int(1) NOT NULL DEFAULT 2
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`idUsuario`, `usuario`, `contrasena`, `nombre`, `correo`, `tipo`) VALUES
(1, 'iker', '$2y$10$e980GZZcaWQJ8Bn6CVX/qOl9NkI30hERzfHq9PnGkv2oD.VnHuega', 'Iker', 'iker@gmail.com', 1),
(2, 'markel', '$2y$10$G.yW1YVh/QQDVy51VtroAO3AWTxLvZ/tSjSwxfmkuYzkMJWVWkhw6', 'Markel', 'markel@gmail.com', 2),
(3, 'eukene', '$2y$10$cjtSb9ZH5XYwYLYNIXDvgO5C/Q3rEJDkGpt.lwDruruQ1vIQyBXfy', 'Eukene', 'eukene@gmail.com', 0),
(4, 'eder', '$2y$10$OdU/6Ab4wVmnRWAoWhdyjunWMdEuNCXvD3BE5B8bfU/T.HfjBhgOu', 'Eder', 'eder@gmail.com', 2),
(100, 'anonimo', '$2y$10$rSaeNyz4m29fP/lyqAcEjOvzkDZnsIoQQEwU/wD.A7ALvwhcyofTW', 'anonimo', 'anonimo@gmail.com', 3);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`idCategoria`);

--
-- Indices de la tabla `consulta`
--
ALTER TABLE `consulta`
  ADD PRIMARY KEY (`idConsulta`),
  ADD KEY `idUsuario` (`idUsuario`);

--
-- Indices de la tabla `entrenador`
--
ALTER TABLE `entrenador`
  ADD PRIMARY KEY (`idEntrenador`),
  ADD KEY `idEquipo` (`idEquipo`);

--
-- Indices de la tabla `equipo`
--
ALTER TABLE `equipo`
  ADD PRIMARY KEY (`idEquipo`),
  ADD KEY `idCategoria` (`idCategoria`);

--
-- Indices de la tabla `jugador`
--
ALTER TABLE `jugador`
  ADD PRIMARY KEY (`idJugador`),
  ADD KEY `idEquipo` (`idEquipo`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`idUsuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `idCategoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `consulta`
--
ALTER TABLE `consulta`
  MODIFY `idConsulta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `entrenador`
--
ALTER TABLE `entrenador`
  MODIFY `idEntrenador` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `equipo`
--
ALTER TABLE `equipo`
  MODIFY `idEquipo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `jugador`
--
ALTER TABLE `jugador`
  MODIFY `idJugador` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `idUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=110;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `consulta`
--
ALTER TABLE `consulta`
  ADD CONSTRAINT `consulta_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `entrenador`
--
ALTER TABLE `entrenador`
  ADD CONSTRAINT `entrenador_ibfk_1` FOREIGN KEY (`idEquipo`) REFERENCES `equipo` (`idEquipo`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `equipo`
--
ALTER TABLE `equipo`
  ADD CONSTRAINT `equipo_ibfk_1` FOREIGN KEY (`idCategoria`) REFERENCES `categoria` (`idCategoria`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `jugador`
--
ALTER TABLE `jugador`
  ADD CONSTRAINT `jugador_ibfk_1` FOREIGN KEY (`idEquipo`) REFERENCES `equipo` (`idEquipo`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
