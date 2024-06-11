const { NlpManager } = require("node-nlp");
const express = require("express");
const cors = require("cors");
const { processInput, trainModel } = require("./service/Training/response");
const app = express();
const port = 3001;

const corsOptions = {
  origin: [
    "https://bot-d-c4nk.vercel.app",
    "http://localhost:5173",
    "http://localhost:3000",
    "http://medifly.site",
    "https://medifly.site",
  ],

  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
};

trainModel();
app.use(express.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
const manager = new NlpManager({ languages: ["en"], forceNER: true });

// Handle user input
app.get("/ask", async (req, res) => {
  const { text } = req.query;
  const response = await manager.process("en", text);
  res.send(response.answers[0]);
});

const defaultAnswer = "Sorry, I didn't understand that.";

app.post("/ask", async (req, res) => {
    const { text } = req.body;
    const response = await processInput(text);
  res.json(response?.answer ?? "Sorry, I didn't get that.");
});

app.get('/',(req,res)=>{
  res.send('server is started')
})
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
