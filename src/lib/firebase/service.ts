import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import app from "./init";
import bcrypt from "bcrypt";

const firestore = getFirestore(app);

export async function retieveData(collectionName: string) {
  const snapshot = await getDocs(collection(firestore, collectionName));
  const data = snapshot.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    };
  });

  return data;
}

export async function retieveDataById(collectionName: string, id: string) {
  const snapshot = await getDoc(doc(firestore, collectionName, id));
  const data = snapshot.data();

  return data;
}

export async function signIn(userData: { email: string }) {
  const q = query(
    collection(firestore, "users"),
    where("email", "==", userData.email)
  );

  const snapshot = await getDocs(q);
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  if (data) {
    return data[0];
  } else {
    return null;
  }
}

export async function signUp(
  userData: {
    email: string;
    password: string;
    fullname: string;
    role?: string;
  },
  callbacks: Function
) {
  const q = query(
    collection(firestore, "users"),
    where("email", "==", userData.email)
  );
  const snapshot = await getDocs(q);
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  if (data.length > 0) {
    callbacks({ status: false, message: "Email sudah terdaftar" });
  } else {
    userData.password = await bcrypt.hash(userData.password, 10);
    userData.role = "member";
    await addDoc(collection(firestore, "users"), userData)
      .then(() => {
        callbacks({ status: 200, message: "Registarsi Berhasil" });
      })
      .catch((error) => {
        callbacks({ status: 400, message: error });
      });
    callbacks({ status: true, message: "Registrasi Berhasil" });
  }
}

export async function signInWithGoogle(userData: any, callbacks: any) {
  const q = query(
    collection(firestore, "users"),
    where("email", "==", userData.email)
  );
  const snapshot = await getDocs(q);
  const data: any = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  if (data.length > 0) {
    userData.role = data[0].role;
    await updateDoc(doc(firestore, "users", data[0].id), userData)
      .then(() => {
        callbacks({ status: true, message: "Login Berhasil", data: userData });
      })
      .catch(() => {
        callbacks({ status: false, message: "Login Gagal" });
      });
  } else {
    userData.role = "member";
    await addDoc(collection(firestore, "users"), userData)
      .then(() => {
        callbacks({ status: true, message: "Login Berhasil", data: userData });
      })
      .catch(() => {
        callbacks({ status: false, message: "Login Gagal" });
      });
  }
}
