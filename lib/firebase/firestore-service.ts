"use client"

import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  type Firestore,
  type DocumentData,
  type QueryConstraint,
} from "firebase/firestore"

// Generic CRUD operations for Firestore
export class FirestoreService {
  private db: Firestore
  private collectionName: string

  constructor(db: Firestore, collectionName: string) {
    this.db = db
    this.collectionName = collectionName
  }

  // Create a new document
  async create(data: DocumentData): Promise<string> {
    const docRef = await addDoc(collection(this.db, this.collectionName), {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    return docRef.id
  }

  // Get a document by ID
  async getById(id: string): Promise<DocumentData | null> {
    const docRef = doc(this.db, this.collectionName, id)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() }
    } else {
      return null
    }
  }

  // Get all documents in the collection
  async getAll(): Promise<DocumentData[]> {
    const querySnapshot = await getDocs(collection(this.db, this.collectionName))
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  }

  // Query documents with filters
  async query(constraints: QueryConstraint[]): Promise<DocumentData[]> {
    const q = query(collection(this.db, this.collectionName), ...constraints)
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  }

  // Update a document
  async update(id: string, data: DocumentData): Promise<void> {
    const docRef = doc(this.db, this.collectionName, id)
    await updateDoc(docRef, {
      ...data,
      updatedAt: new Date(),
    })
  }

  // Delete a document
  async delete(id: string): Promise<void> {
    const docRef = doc(this.db, this.collectionName, id)
    await deleteDoc(docRef)
  }
}

// Create specific services for different collections
export function createPageService(db: Firestore) {
  return new FirestoreService(db, "pages")
}

export function createEventService(db: Firestore) {
  return new FirestoreService(db, "events")
}

export function createTeamMemberService(db: Firestore) {
  return new FirestoreService(db, "teamMembers")
}

export function createProgramService(db: Firestore) {
  return new FirestoreService(db, "programs")
}
