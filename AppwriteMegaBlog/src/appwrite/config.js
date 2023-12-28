import conf from '../conf/conf.js'
import { Client, ID, Databases, Storage, Query } from 'appwrite'
//bucket services means--> storage services 
export class Service{   //storage ke liye Services banayi hai
    client = new Client();
    databases;
    bucket;  //storage

    constructor(){  //account tab banna chahiye jab constructor call ho
        this.client                                       // from documentation
            .setEndpoint(conf.appwriteUrl)                // from documentation
            .setProject(conf.appwriteProjectId);          // from documentation
            this.databases = new Databases(this.client);  // from documentation
            this.bucket = new Storage(this.client)        // from documentation
    }
                    //YE SAB VALUES PASS KARNA HAI JAB BHI YE METHOD USE KARENGE
    async createPost({title, slug, content, featuredImage, status, userId}) {
        try{
            return await this.databases.createDocument(             // from documentation
                conf.appwriteDatabaseId, //[Database_ID]           
                conf.appwriteCollectionId, //[Collection_ID]      
                slug, // [Document_ID]
                {
                    //jo create karna tha unhe {} mai diya
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        } catch(error){
            console.log("Appwrite service :: createPost :: error", error); //COMMON AMONG ALL METHODS
        }

    }

    async updatePost(slug, {title,  content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,  // [Document_ID]
                { //jo update karna hai vo diya in {} mai
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error",error);
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug //[Document_ID]
            )
            return true //ha bhai ye delete hogaya hai ye batane ke liye
            
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error", error)
            return false
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            
        } catch (error) {
            console.log("Appwrite service :: getPost :: error",error)
            return false
        }
    }

    async getPosts(queries = [Query.equal("status","active")]){
         try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
            )
         } catch (error) {
            console.log("Appwrite service :: getPosts :: error", error);
            return false //ek bhi value nhi mil rhi ho to false return kardenge
         }
    }


    //file upload service
    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId ,
                ID.unique(),
                file 
            )
            
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error", error);
            return false
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
            
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error", error);
            return false
        }
    }

     getFilePreview(fileId){ //promise etc nhi hai to instantly chal jata hai 
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
     }
}


const service = new Service(); 
export default service;
//object banake export kardiya to external files mai jab object ko use karenge tab hi method banke use hoga 