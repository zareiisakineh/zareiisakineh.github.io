import {
    collection,
    getDocs
}
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

import { db } from "./firebase.js";

export async function hentAnsatte() {

    const snapshot = await getDocs(
        collection(db, "ansatte")
    );

    return snapshot.docs.map(doc => doc.data());
}