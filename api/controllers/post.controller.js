import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";


// Get all posts

export const getPosts = async (req, res) => {
    const query = req.query;
    // console.log(req);

    try {
        const posts = await prisma.post.findMany({
            where: {
                city: query.city || undefined,
                type: query.type || undefined,
                property: query.property || undefined,
                property: query.property || undefined,
                bedroom: parseInt(query.bedroom) || undefined,
                price: {
                    gte: parseInt(query.minPrice) || 0,
                    lte: parseInt(query.maxPrice) || 10000000,
                }
            }
        });

        // setTimeout(() => {
        res.status(200).json(posts);
        // }, 3000);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to get posts!" });
    }
}



// Get one single post

export const getPost = async (req, res) => {
    const id = req.params.id;
    try {

        const post = await prisma.post.findUnique({
            where: { id },
            include: {
                postDetail: true,
                user: {
                    select: {
                        username: true,
                        avatar: true,
                    }
                },
            },
        });


        // Check if the post is saved while logged in
        const token = req.cookies?.token;
        // if (token) {
        //     jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
        //       if (!err) {
        //         const saved = await prisma.savedPost.findUnique({
        //           where: {
        //             userId_postId: {
        //               postId: id,
        //               userId: payload.id,
        //             },
        //           },
        //         });
        //         res.status(200).json({ ...post, isSaved: saved ? true : false });
        //       }
        //     });
        //   }

        //   res.status(200).json({ ...post, isSaved: false });

        // CORRECTION 1: Early return if no token
        if (!token) {
            return res.status(200).json({ ...post, isSaved: false });
        }

        // CORRECTION 2: Use synchronous jwt verification
        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
            const saved = await prisma.savedPost.findUnique({
                where: {
                    userId_postId: {
                        postId: id,
                        userId: payload.id,
                    },
                },
            });

            // CORRECTION 3: Consistent response with isSaved boolean
            res.status(200).json({ ...post, isSaved: saved !== null });
        } catch (err) {
            // CORRECTION 4: Handle token verification errors
            res.status(200).json({ ...post, isSaved: false });
        }


        // res.status(200).json({...post, isSaved: true});
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to get post!" });
    }
}


// Create/Add post

export const addPost = async (req, res) => {
    const body = req.body;
    const tokenUserId = req.userId;

    try {
        const newPost = await prisma.post.create({
            data: {
                ...body.postData,
                userId: tokenUserId,
                postDetail: {
                    create: body.postDetail,
                },
            },
        })
        res.status(200).json(newPost);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to create post!" });
    }
}


// Upadate post

export const updatePost = async (req, res) => {
    try {

        res.status(200).json();
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to update posts!" });
    }
}


// Delete post

export const deletePost = async (req, res) => {
    const id = req.params.id;
    const tokenUserId = req.userId;

    try {

        const post = await prisma.post.findUnique({
            where: { id },
        });

        if (post.userId !== tokenUserId) {
            return res.status(403).json({ message: "Not authorized!" });
        }

        await prisma.post.delete({
            where: { id },
        });


        res.status(200).json({ message: "Post deleted successfully!" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to delete post!" });
    }
}