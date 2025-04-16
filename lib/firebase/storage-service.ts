"use client"

import { ref, uploadBytesResumable, getDownloadURL, deleteObject, type FirebaseStorage } from "firebase/storage"

export class StorageService {
  private storage: FirebaseStorage

  constructor(storage: FirebaseStorage) {
    this.storage = storage
  }

  // Upload a file and get the download URL
  async uploadFile(file: File, path: string): Promise<string> {
    const storageRef = ref(this.storage, path)
    const uploadTask = uploadBytesResumable(storageRef, file)

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Progress monitoring if needed
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log(`Upload is ${progress}% done`)
        },
        (error) => {
          // Error handling
          reject(error)
        },
        async () => {
          // Upload completed successfully, get the download URL
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
          resolve(downloadURL)
        },
      )
    })
  }

  // Delete a file by its path
  async deleteFile(path: string): Promise<void> {
    const storageRef = ref(this.storage, path)
    await deleteObject(storageRef)
  }

  // Generate a unique file path
  generateFilePath(folder: string, fileName: string): string {
    const timestamp = new Date().getTime()
    const cleanFileName = fileName.replace(/[^a-zA-Z0-9.]/g, "-")
    return `${folder}/${timestamp}-${cleanFileName}`
  }
}

export function createStorageService(storage: FirebaseStorage) {
  return new StorageService(storage)
}
