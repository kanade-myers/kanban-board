import { collection, addDoc, getDocs, getDoc, doc, updateDoc,
     deleteDoc, query, where, orderBy, serverTimestamp} from 'firebase/firestore'

import { db, auth } from './config.js'

export async function addTask(taskData) {
    try {
        const user = auth.currentUser
        if (!user) {
            throw new Error('Пользователь не авторизован')
        }

        const newTask = {
            title: taskData.title || 'Без названия',
            desc: taskData.desc,
            status: taskData.status | 'backlog',
            user: user.uid,
            createdAt: serverTimestamp(),
        }

        const docRef = await addDoc(collection(db, 'tasks'), newTask)

        return {
            id: docRef.id,
            ...newTask,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }
    }
    catch(error) {
        console.dir('Ошибка добавления задачи:', error)
    }
}