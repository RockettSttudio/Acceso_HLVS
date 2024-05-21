export const loginUser = async (username, password) => {
    try {
      // Simula un delay como si fuera una llamada a una API real
      await new Promise(resolve => setTimeout(resolve, 1000));
  
      // Datos simulados para el usuario
      const fakeUserDatabase = {
        'ROQUE': { password: 'Admin123*', name: 'Cesar Roque', token: 'abcd1234' }
      };

      if (fakeUserDatabase[username] && fakeUserDatabase[username].password === password) {
        // Si las credenciales coinciden, retorna datos del usuario
        return {
          message: 'Login successful',
          user: { name: fakeUserDatabase[username].name, token: fakeUserDatabase[username].token }
        };
      } else {
        // Si las credenciales no coinciden, lanza un error
        throw new Error('Invalid username or password');
      }
    } catch (error) {
      // Captura y maneja errores
      throw new Error(error.message || 'Unable to login');
    }
  };
  