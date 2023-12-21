import { OpenAI } from "openai";
import fs from "fs";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const baseHandler = async (event, responseStream) => {
  // responseStream.setContentType("text/event-stream");

  const payload = {
    model: "gpt-3.5-turbo-1106",
    messages: [
      {
        "role": "user",
        // "content": "请分100行输出100个英文字符"
        "content": "请100字介绍你自己"
      }
    ],
    temperature: 0,
    max_tokens: 1500,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0.6,
    stream: true
  }

  const openAIResp = await openai.chat.completions.create(payload);

  for await (const chunk of openAIResp) {
    console.log("[Chunk]", chunk.choices[0]?.delta?.content);
    const content = chunk.choices[0]?.delta?.content
    if (content) {
      const isOk = responseStream.write(content);
      if (!isOk) {
        console.log("[StreamedPlanParseLambda] responseStream write failed.");
      }
    } else {
      responseStream.close();
    }
  }

  return responseStream;
}

// const handler = awslambda.streamifyResponse(baseHandler);
// export default handler;

if (process.env.SJDEAK) {
  baseHandler({}, fs.createWriteStream('file.txt')).then((stream) => {
    console.log(stream);
  });
}
