"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { initializeApp, getApps, type FirebaseApp } from "firebase/app"
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  type User,
} from "firebase/auth"
import { getFirestore, type Firestore } from "firebase/firestore"
import { getStorage, type FirebaseStorage } from "firebase/storage"
import firebaseConfig from "./firebase-config"

interface FirebaseContextType {
  app: FirebaseApp | null
  auth: any
  db: Firestore | null
  storage: FirebaseStorage | null
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

const FirebaseContext = createContext<FirebaseContextType>({
  app: null,
  auth: null,
  db: null,
  storage: null,
  user: null,
  loading: true,
  signIn: async () => {},
  signOut: async () => {},
})

export const useFirebase = () => useContext(FirebaseContext)

export function FirebaseProvider({ children }: { children: ReactNode }) {
  const [app, setApp] = useState<FirebaseApp | null>(null)
  const [auth, setAuth] = useState<any>(null)
  const [db, setDb] = useState<Firestore | null>(null)
  const [storage, setStorage] = useState<FirebaseStorage | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") {
      setLoading(false)
      return
    }

    const initializeFirebase = async () => {
      try {
        // Check if Firebase is already initialized
        if (getApps().length > 0) {
          const app = getApps()[0]
          const auth = getAuth(app)
          const db = getFirestore(app)
          const storage = getStorage(app)

          setApp(app)
          setAuth(auth)
          setDb(db)
          setStorage(storage)

          const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user)
            setLoading(false)
          })

          return () => unsubscribe()
        }

        // Check if Firebase config is valid
        if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
          // console.error("Firebase configuration is missing or incomplete. Check your environment variables.")
          setLoading(false)
          return
        }

        // Initialize Firebase
        const app = initializeApp(firebaseConfig)
        const auth = getAuth(app)
        const db = getFirestore(app)
        const storage = getStorage(app)

        setApp(app)
        setAuth(auth)
        setDb(db)
        setStorage(storage)

        const unsubscribe = onAuthStateChanged(auth, (user) => {
          setUser(user)
          setLoading(false)
        })

        return () => unsubscribe()
      } catch (error) {
        console.error("Error initializing Firebase:", error)
        setLoading(false)
      }
    }

    initializeFirebase()
  }, [])

  const signIn = async (email: string, password: string) => {
    if (!auth) {
      throw new Error("Authentication is not initialized")
    }

    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error: any) {
      console.error("Sign in error:", error)
      throw new Error(error.message || "Failed to sign in")
    }
  }

  const signOut = async () => {
    if (!auth) {
      throw new Error("Authentication is not initialized")
    }

    try {
      await firebaseSignOut(auth)
    } catch (error: any) {
      console.error("Sign out error:", error)
      throw new Error(error.message || "Failed to sign out")
    }
  }

  return (
    <FirebaseContext.Provider
      value={{
        app,
        auth,
        db,
        storage,
        user,
        loading,
        signIn,
        signOut,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  )
}
