import openai from "./chatgpt"

const query = async (text: string, chatId: string, model: string) => {
    const res = openai.createCompletion({
        model,
        prompt: text,
        temperature: 0, //0.9 0.7 0
        top_p: 1,
        max_tokens: 4000, //1000 64 3000
        frequency_penalty: 0.5, // 0 0.5
        presence_penalty: 0
    })
        .then((res) => {
            // console.log(res.data.choices)
            // console.log(res.data.choices.length)
            return res.data.choices[0].text
        })
        // .then((res) => res.data.choices)
        .catch(err => {
            console.log(err)
            return `ChatGPT was unable to find an answer for that! (${err})`
        })

    return res

    // const res = openai.createModeration({
    //     model: 'text-moderation-playground',
    //     input: text,
    //     // temperature: 0.9,
    //     // top_p: 1,
    //     // max_tokens: 1000,
    //     // frequency_penalty: 0,
    //     // presence_penalty: 0
    // })
    //     .then((res) => {
    //         // console.log(res.data.choices)
    //         console.log(res.data.results)
    //         return 'Success'
    //     })
    //     // .then((res) => res.data.choices)
    //     .catch(err => {
    //         console.log(err)
    //         return `ChatGPT was unable to find an answer for that! (Error: ${err})`
    //     })

    // return res
}

export default query