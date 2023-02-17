import type { NextApiRequest, NextApiResponse } from 'next'
import openai from '../../lib/chatgpt'

type Option = {
    value: string
    label: string
}

type Data = {
    modelOptions: Option[]
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const models = await openai.listModels().then(res => res.data.data)

    const modelOptions = models.map(item => ({
        value: item.id,
        label: item.id
    }))

    return res.status(200).json({ modelOptions })
}
