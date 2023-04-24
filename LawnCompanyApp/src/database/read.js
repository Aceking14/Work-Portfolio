import { collection, getDocs, doc , getDoc ,query, where } from "firebase/firestore"; 
import { db } from './config';

/**
 * Loads all documents from the Posts collection
 * @returns 
 * Array with the posts
 */
export async function load() {
    try{
        const querySnapshot = await getDocs(collection(db, "posts"));

        return processQuerySnapshot(querySnapshot);
    }
    catch (error) {
        throw new Error('failed to load database.');
    }
}

/**
 * Loads all promoted documents from the Posts collection
 * @returns 
 * Array with Posts
 */
export async function loadPromoted() {
    try{
    const q = query(collection(db, "posts"), where("paid", "==", true));
    const querySnapshot = await getDocs(q);

    return processQuerySnapshot(querySnapshot);
    }
    catch (error) {
        throw new Error('failed to query database.');
    }
}

/**
 * Converts a Firebase query snapshot into an array
 * @param {object} querySnapshot 
 * The query snapshot returned by firebase
 * @returns 
 * Array with the data.
 */
function processQuerySnapshot(querySnapshot) {
    const data = [];
    
        querySnapshot.forEach((doc) => {
            data.push({
                ...doc.data(),
                id: doc.id
            });
        });
    return data;
}


export async function loadById(id) {
    try{
        const docRef = doc(db, "posts", id);
        const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data();
    }}
    catch{}
    return null;
}

