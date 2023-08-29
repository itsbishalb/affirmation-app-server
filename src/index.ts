import express, { Application } from "express";

const PORT = 8000;

const app: Application = express();

app.get("/quotes", async (_req, res) => {
  res.send({[
    {
      "quote": "The best is yet to come!",
      "author": "Unknown",
      "category": "Optimism"
    },
    {
      "quote": "We must accept finite disappointment, but never lose infinite hope.",
      "author": "Martin Luther King Jr.",
      "category": "Hope"
    },
    {
      "quote": "Believe you can and you're halfway there.",
      "author": "Theodore Roosevelt",
      "category": "Belief"
    },
    {
      "quote": "In the middle of every difficulty lies opportunity.",
      "author": "Albert Einstein",
      "category": "Opportunity"
    },
    {
      "quote": "The future belongs to those who believe in the beauty of their dreams.",
      "author": "Eleanor Roosevelt",
      "category": "Dreams"
    },
    {
      "quote": "Success is not final, failure is not fatal: It is the courage to continue that counts.",
      "author": "Winston Churchill",
      "category": "Perseverance"
    },
    {
      "quote": "It does not matter how slowly you go as long as you do not stop.",
      "author": "Confucius",
      "category": "Progress"
    },
    {
      "quote": "The only way to do great work is to love what you do.",
      "author": "Steve Jobs",
      "category": "Passion"
    },
    {
      "quote": "The harder the conflict, the greater the triumph.",
      "author": "George Washington",
      "category": "Challenge"
    },
    {
      "quote": "The journey of a thousand miles begins with one step.",
      "author": "Lao Tzu",
      "category": "Start"
    }
  ]
  });
});

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
