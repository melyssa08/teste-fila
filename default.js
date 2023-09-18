import express from "express";
import cors from "cors";
import { SQSClient, SendMessageCommand, ReceiveMessageCommand } from "@aws-sdk/client-sqs";

const app = express();
const sqs = new SQSClient({ region: "us-east-1" });

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.get("/", async (req, res) => {
  const queueUrl = "https://sqs.us-east-1.amazonaws.com/493571550585/MinhaFila";

  try {

    const sendMessageParams = {
      QueueUrl: queueUrl,
      MessageBody: "Mais um",
    };

    const sendMessageCommand = new SendMessageCommand(sendMessageParams);
    const sendMessageResult = await sqs.send(sendMessageCommand);

    console.log("Mensagem enviada com sucesso:", sendMessageResult.MessageId);

    // Receber mensagens
    const receiveMessageParams = {
      QueueUrl: queueUrl,
      MaxNumberOfMessages: 10,
    };

    const receiveMessageCommand = new ReceiveMessageCommand(receiveMessageParams);
    const receiveMessageResult = await sqs.send(receiveMessageCommand);

    if (receiveMessageResult.Messages) {
      console.log("Mensagens recebidas:", receiveMessageResult.Messages);
      console.log("Quantidade de mensagens recebidas:", receiveMessageResult.Messages.length);
    }
  } catch (err) {
    console.error("Erro:", err);
  }

  res.send("Algo");
});

app.listen(3003, () => {
  console.log('http://localhost:3003');
});