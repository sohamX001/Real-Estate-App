import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";


// Get all users

export const getUsers = async (req, res) => {
    // console.log("it works");
    try {
        const users = await prisma.user.findMany();
        res.status(200).json(users);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to get users!" });
    }
}


// Get single user

export const getUser = async (req, res) => {
    const id = req.params.id;

    try {
        const user = await prisma.user.findUnique({
            where: { id },
        });
        res.status(200).json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to get user!" });
    }
}


// Update user

export const updateUser = async (req, res) => {
    const id = req.params.id;
    const tokenUserId = req.userId;
    const { password, avatar, ...inputs } = req.body;

    // to check if a user tries to update another user
    if (id !== tokenUserId) {
        // console.log('Request body:', body);
        // console.log('ID from params:', id);
        // console.log('Token user ID:', tokenUserId);
        return res.status(403).json({ message: "Not authorized!" });
    }

    let updatedPassword = null;
    try {

        if (password) {
            updatedPassword = await bcrypt.hash(password, 10);
        }

        const updatedUser = await prisma.user.update({
            where: { id },
            data: {
                ...inputs,
                ...(updatedPassword && { password: updatedPassword }),
                ...(avatar && { avatar }),
            },
        })

        const { password: userPassword, ...rest } = updatedUser;

        res.status(200).json(rest);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to update user!" });
    }
}


// Delete user

export const deleteUsers = async (req, res) => {
    const id = req.params.id;
    const tokenUserId = req.userId;

    // to check if a user tries to update another user
    if (id !== tokenUserId) {
        return res.status(403).json({ message: "Not authorized!" });
    }

    try {
        await prisma.user.delete({
            where: { id },
        });
        res.status(200).json({ message: "User deleted successfully!" });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to delete users!" });
    }
}


// Save post

export const savePost = async (req, res) => {
    const postId = req.body.postId;
    const tokenUserId = req.userId;

    try {
        const savedPost = await prisma.savedPost.findUnique({
            where: {
                userId_postId: {
                    userId: tokenUserId,
                    postId,
                },
            },
        });

        if (savedPost) {
            await prisma.savedPost.delete({
                where: {
                    id: savedPost.id,
                },
            })
            res.status(200).json({ message: "Post unsaved successfully!", isSaved: false });
        }
        else {
            await prisma.savedPost.create({
                data: {
                    userId: tokenUserId,
                    postId,
                },
            })
            res.status(200).json({ message: "Post saved successfully!", isSaved: true });
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Something went wrong!" });
    }
}


// Get profile posts

export const profilePosts = async (req, res) => {
    const tokenUserId = req.userId;

    try {
        const userPosts = await prisma.post.findMany({
            where: { userId: tokenUserId },
        });
        const saved = await prisma.savedPost.findMany({
            where: { userId: tokenUserId },
            include: {
                post: true,
            },
        });

        const savedPosts = saved.map((item) => item.post);        
        res.status(200).json({ userPosts, savedPosts });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to get profile posts!" });
    }
}



// Get notification number

export const getNotificationNumber = async (req, res) => {
    const tokenUserId = req.userId;

    try {
       const number = await prisma.chat.count({
           where: {
               userIDs: {
                   hasSome: [tokenUserId],
               },
               NOT: {
                   seenBy: {
                       hasSome: [tokenUserId],
                   },
               },
           },
       });
       res.status(200).json(number);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to get Notification number!" });
    }
}