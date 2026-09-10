import { db } from "../firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

const requestsCollection = collection(db, "requests");

export async function fetchRequests() {
  const snapshot = await getDocs(requestsCollection);
  return snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...docSnap.data(),
  }));
}

export async function createRequest(request) {
  const docRef = await addDoc(requestsCollection, request);
  return { id: docRef.id, ...request };
}

export async function updateRequestDoc(id, updates) {
  const requestRef = doc(db, "requests", id);
  await updateDoc(requestRef, updates);
}