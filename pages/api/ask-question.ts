// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import query from '../../lib/queryApi'
import admin from 'firebase-admin'
import { adminDb } from '../../utils/firebaseAdmin'

type Data = {
    message: string | any
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    try {
        const { text, chatId, model, session, timestamp } = req.body

        if (!text) {
            return res.status(400).json({ message: 'Please provide a prompt!' })
        }

        if (!chatId) {
            return res.status(400).json({ message: 'Please provide a valid chat ID' })
        }

        console.log(req.body)

        // ChatGPT Query
        const response = await query(text, chatId, model)

        const message: Message = {
            text: response?.toString() || "ChatGPT was unable to find an answer for that!",
            createdAt: admin.firestore.Timestamp.now().seconds < timestamp.seconds ? timestamp : admin.firestore.Timestamp.now(),
            // createdAt: firestore.Timestamp.now(),
            user: {
                _id: 'ChatGPT',
                name: 'ChatGPT',
                // avatar: 'https://www.golocalprov.com/cache/images/remote/https_s3.amazonaws.com/media.golocalprov.com/ChatGPT_LOGO_Jan_2023.png'
                avatar: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg'
            }
        }

        // console.log(serverTimestamp(), timestamp, Timestamp.now(), admin.firestore.Timestamp.now())

        await adminDb
            .collection('users').doc(session.user.email)
            .collection('chats').doc(chatId)
            .collection('messages').add(message)

        admin.app().delete()
        return res.status(200).json({ message: message.text })
    } catch (error: any) {
        console.log(error)
        return res.status(500).json({ message: error.message })
    }
}
