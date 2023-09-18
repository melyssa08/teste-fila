import express from "express";
import cors from "cors";
import AWS from "aws-sdk";

const app = express();

AWS.config.update({ region: "us-east-1" });

const sqs = new AWS.SQS({ apiVersion: "2012-11-05" });

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.get("/", async (req, res) => {
  const queueUrl = "https://sqs.us-east-1.amazonaws.com/493571550585/filaFIFO.fifo";

  try {
    const sendMessageParams = {
      QueueUrl: queueUrl,
      MessageBody: "Mensagem para o grupo de id 1 parte 2",
      MessageGroupId: "1"
    };

    sqs.sendMessage(sendMessageParams, (err, sendMessageResult) => {
      if (err) {
        console.error("Erro ao enviar mensagem:", err);
      } else {
        console.log("Mensagem enviada com sucesso:", sendMessageResult.MessageId);

        // Receber mensagens
        const receiveMessageParams = {
          QueueUrl: queueUrl,
          MaxNumberOfMessages: 10,
        //   MessageGroupId: "1"
        };

        sqs.receiveMessage(receiveMessageParams, (err, receiveMessageResult) => {
          if (err) {
            console.error("Erro ao receber mensagens:", err);
          } else if (receiveMessageResult.Messages) {
            console.log("Mensagens recebidas:", receiveMessageResult.Messages);
            console.log(
              "Quantidade de mensagens recebidas:",
              receiveMessageResult.Messages.length
            );
          }
        });
      }
    });
  } catch (err) {
    console.error("Erro:", err);
  }

  res.send("Algo");
});

app.listen(3004, () => {
  console.log("http://localhost:3004");
});