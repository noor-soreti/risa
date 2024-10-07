import { storage } from "@/firebase";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const upload = async (file: any) => {
    const storageRef = ref(storage, file);   
    const uploadTask = uploadBytesResumable(storageRef, file);
    return new Promise((resolve, reject) => {
        uploadTask.on('state_changed', 
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
        }, 
        (error) => {            
            reject(`Something went wrong!: ${error.code}`)
        }, 
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log('getDownloadURL');
                resolve(downloadURL)
            }).catch(e => {
                console.log('getDownloadURL error: ${e');
            });
        }
        );
    })
}

export default upload