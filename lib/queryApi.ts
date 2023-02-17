import openai from "./chatgpt"

const query = async (text: string, chatId: string, model: string) => {
    const res = openai.createCompletion({
        model,
        prompt: text,
        temperature: 0.9,
        top_p: 1,
        max_tokens: 1000,
        frequency_penalty: 0,
        presence_penalty: 0
    })
        .then((res) => res.data.choices[0].text)
        // .then((res) => res.data.choices)
        .catch(err => `ChatGPT was unable to find an answer for that! (Error: ${err})`)

    return res
}

export default query