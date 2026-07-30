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
            desc: taskData.desc || '',
            status: taskData.status || 'backlog',
            user: user.uid,
            createdAt: taskData.createdAt || Date.now(),
        }

        const docRef = await addDoc(collection(db, 'tasks'), newTask)

        return docRef.id
    }
    catch(error) {
        console.dir('Ошибка добавления задачи:', error)
        throw new Error(error)
    }
}

export async function getTasks() {
    try {
        const user = auth.currentUser;
        if (!user) {
            throw new Error('Пользователь не авторизован');
        }

        // Создаем запрос: все задачи пользователя, сортировка по order
        const q = query(
            collection(db, 'tasks'),
            where('userId', '==', user.uid)
        );

        const querySnapshot = await getDocs(q);
        const tasks = {};
        
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            tasks[doc.id] = {
                id: doc.id,
                ...data,
                // Конвертируем Timestamp в строку для удобства
                createdAt: data.createdAt?.toDate?.()?.toISOString() || data.createdAt,
            };
        });

        return tasks;
    } catch (error) {
        console.dir('Ошибка получения задач:', error);
        throw error
    }
}

export async function updateTask(id, title, desc) {
    try {
        const user = auth.currentUser;
        if (!user) {
            throw new Error('Пользователь не авторизован');
        }

        const docRef = doc(db, 'tasks', id);

        const taskData = {
            title: title,
            desc: desc
        }

        await updateDoc(docRef, taskData);
        
        // Возвращаем обновленные данные
        return {
            ...taskData
        };
    } catch (error) {
        console.dir('Ошибка обновления задачи:', error);
        throw error
    }
}

export async function moveTask(taskId, newStatus) {
    try {
        const user = auth.currentUser;
        if (!user) {
            throw new Error('Пользователь не авторизован');
        }

        const docRef = doc(db, 'tasks', taskId);
        const updateData = {
            status: newStatus,
        };

        await updateDoc(docRef, updateData);
        
        return {
            id: taskId,
            ...updateData,
        };
    } catch (error) {
        console.dir('Ошибка перемещения задачи:', error);
        throw error
    }
}

export async function deleteTask(id) {
    try {
        const user = auth.currentUser;
        if (!user) {
            throw new Error('Пользователь не авторизован');
        }

        const docRef = doc(db, 'tasks', id);
        await deleteDoc(docRef);
        
        return { id: id, deleted: true };
    } catch (error) {
        console.dir('Ошибка удаления задачи:', error);
        throw error
    }
}

// export async function deleteAllTasks() {
//     try {
//         const user = auth.currentUser;
//         if (!user) {
//             throw new Error('Пользователь не авторизован');
//         }

//         const q = query(
//             collection(db, 'tasks'),
//             where('userId', '==', user.uid)
//         );
//         const querySnapshot = await getDocs(q);
        
//         const deletePromises = [];
//         querySnapshot.forEach((doc) => {
//             deletePromises.push(deleteDoc(doc.ref));
//         });
        
//         await Promise.all(deletePromises);
        
//         return { deleted: deletePromises.length };
//     } catch (error) {
//         console.dir('Ошибка удаления всех задач:', error);
//         throw error;
//     }
// }