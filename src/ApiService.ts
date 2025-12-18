import axios from "axios";

const token = import.meta.env.VITE_OPENAI_API_KEY;
const api = axios.create({
  baseURL: "https://api.openai.com/v1",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer `+ token,
  },
});

export async function compareMice(mouse1: string, mouse2: string) {
  const prompt = `
You are a gaming peripherals expert.

Compare the gaming mouse:
Mouse A: ${mouse1}
Mouse B: ${mouse2}

Evaluate:
- Overall review sentiment
- Price to performance
- Reactivity / latency
- Sensor quality
- Build quality and ergonomics

Rules:
- Do not invent numbers
- Mention uncertainty if info is unavailable
- FPS-focused verdict

Return:
1. Comparison summary
2. Pros & Cons
3. Final verdict
`;
  const response = await api.post("/chat/completions", {
    model: "gpt-5-nano",
    messages: [{ role: "user", content: prompt }],
    temperature: 1,
  });
  return response.data.choices[0].message.content;
}

const apiService = { compareMice };

export default apiService;
