import { createUserWithEmailAndPassword } from 'firebase/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { signOut } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase.js';

async function registerUser(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    return user;
  } catch (error) {
    console.error('Ошибка регистрации:', error.code, error.message);
  }
}

async function loginUser(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    return user;
  } catch (error) {
    console.error('Ошибка входа:', error.code, error.message);
  }
}

async function logoutUser() {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Ошибка выхода:', error);
  }
}

// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     console.dir('Текущий пользователь:', user.uid);
//   } else {
//     console.dir('Пользователь не авторизован');
//   }
// });