import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from 'src/application/ApplicationService/firebase';

export const studentLogin = async (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password)
    .then(() => true)
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // eslint-disable-next-line no-console
      console.error(errorCode, errorMessage);

      return false;
    });

export const studentLogout = async () => {};

export const studentOnAuthStateChanged = () => {
  let isLogin = false;

  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLogin = true;
      return;
    }
    isLogin = false;
  });

  return isLogin;
};
