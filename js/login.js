// FUNCION AL CARGAR ELEMENTOS DE LA PAGINA
document.addEventListener('DOMContentLoaded', () => {
  // DATOS DE USUARIO
  const NOMBRE_USUARIO = 'admin123';
  const CONTRASENA = '12345';

  // VERIFICACION SI ESTA LOGEADO O NO Y RENDERIZACION
  const loginForm = document.getElementById('loginForm');
  const loginModal = document.getElementById('loginModal');

  const botonCerrarSesion = document.getElementById('botonCerrarSesion');

  const usuarioLogin = localStorage.getItem('usuarioLogin');

  if (usuarioLogin !== 'true') {
    const modal = new bootstrap.Modal(loginModal, {
      backdrop: 'static',
      keyboard: false,
    });
    botonCerrarSesion.classList.add('d-none');
    modal.show();
  } else {
    botonCerrarSesion.classList.remove('d-none');
  }

  // VARIFICACION DE USUARIO Y CONTRASEÑA
  if (loginForm) {
    const loginUsuario = document.getElementById('loginUsuario');
    const loginContrasena = document.getElementById('loginContrasena');

    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const usuario = loginUsuario.value.trim();
      const contra = loginContrasena.value.trim();

      if (usuario === NOMBRE_USUARIO && contra === CONTRASENA) {
        console.log('Login exitoso');
        localStorage.setItem('usuarioLogin', 'true');

        const modal = bootstrap.Modal.getInstance(loginModal);
        if (modal) {
          modal.hide();
        }

        render.mostrarToast('Sesion iniciada exitosamente.', 'succes');
        window.location.reload();
      } else {
        const loginErrorContenedor = document.getElementById(
          'loginErrorContenedor'
        );
        loginErrorContenedor.innerHTML = `<div class="alert alert-danger">Usuario o contraseña incorrectos.</div>`;
      }
    });
  }

  // INICIALIZACION LISTENER DE CERRAR SESION
  botonCerrarSesion.addEventListener('click', () => {
    localStorage.removeItem('usuarioLogin');

    alert('Sesión cerrada');
    window.location.reload();
  });
});
