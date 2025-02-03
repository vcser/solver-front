import { db } from "./firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export const getResources = async () => {
    const q = query(collection(db, "recursos"), where("state", "==", true));

    const querySnapshot = await getDocs(q);

    // querySnapshot.forEach((doc) => {
    //     console.log(doc.id, " => ", doc.data());
    // });

    return querySnapshot.docs.map((doc) => doc.data());
}
