import { Router } from "express";
import { getAllPost,createPost,updatePost, deleteSinglePost, deleteAllPosts  } from "../controllers/blogController";
import {auth} from "../middlewares/authorization"
// import { upload } from "../middlewares/uploads";
const router = Router()
router.get("/posts", getAllPost)
router.post('/add',auth, createPost)
router.put('/update',auth,updatePost)
router.delete('/delete',auth,deleteSinglePost)
router.delete('/deleteAll',auth,deleteAllPosts)


export default router