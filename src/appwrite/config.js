import conf from "../conf.js";
import { Client, ID , Databases , Query} from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectID);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }
    async createPost ({title,slug, content, featuredImage, status, userId}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                slug,
                {
                    title, 
                    content, 
                    featuredImage,
                    status,
                    userId

                }
            )
        } catch (error) {
            console.log("Appwrite Service :: createPost:: error", error);
        }
    }
    async updatePost(slug, {title, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                slug,
                {
                    title, 
                    content,
                    featuredImage, 
                    status
                }
            )
        } catch (error) {
            console.log("Appwrite Service :: updatePost:: error", error);
        }
    }
    async deletePost(slug){
        try {
           await this.databases.deleteDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                slug
            )
            return true
        } catch (error) {
            console.log("Appwrite Service :: deletePost:: error", error);
            return false
        }
    }
    async getPost(slug){
        try {
           await this.databases.getDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                slug
            )
            return true
        } catch (error) {
            console.log("Appwrite Service :: getPost:: error", error);
            return false
        }
    }
    async getPosts(queries = [Query.equal("status" , "active")]){
        try {
            await this.databases.listDocuments(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                queries
            )
        } catch (error) {
            console.log("Appwrite Service :: getPosts:: error", error);
            return false;
        }
    }
    //file upload file

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBuckteID,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite Service :: uploadFile:: error", error);
            return false
        }
    }
    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBuckteID,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite Service :: deleteFile :: error", error);
            return false
        }
    }
    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBuckteID,
            fileId
        )
    }
}

const service = new Service();

export default  service;