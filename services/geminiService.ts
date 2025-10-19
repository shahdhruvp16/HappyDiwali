import { GoogleGenerativeAI, GenerationConfig } from "@google/genai";

// An array of different styles to guide the AI
const wishStyles = [
  "poetic and full of light",
  "modern, cheerful, and vibrant",
  "traditional and respectful",
  "warm, personal, and heartfelt",
  "short, sweet, and celebratory",
  "focused on prosperity and success",
  "emphasizing the victory of light over darkness",
];

export const generateWish = async (fromName: string, toName: string): Promise<string> => {
  try {
    if (!process.env.API_KEY) {
      throw new Error("API_KEY environment variable not set");
    }
    // Correctly initialize the client - it seems there was a small typo in your original code.
    // It should be GoogleGenerativeAI, and you need to get a model from it.
    const genAI = new GoogleGenerativeAI(process.env.API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // 1. Randomly select a style for the wish
    const selectedStyle = wishStyles[Math.floor(Math.random() * wishStyles.length)];

    // 2. Create a dynamic prompt using the selected style
    const prompt = `
      You are a festive AI that writes beautiful and unique Diwali wishes.
      The wish is from "${fromName}" to "${toName}".
      
      Please generate a short and beautiful Diwali wish (about 2-3 sentences).
      The wish should have a **${selectedStyle}** tone.
      
      IMPORTANT: Do not include any greetings like 'Dear ${toName},' or sign-offs like 'From ${fromName},'. These will be added automatically. Just provide the body of the wish.
    `;

    // 3. (Optional but Recommended) Adjust generation config for more creativity
    const generationConfig: GenerationConfig = {
      temperature: 0.9, // Higher value means more creative/random
      topK: 1,
      topP: 1,
      maxOutputTokens: 2048,
    };
    
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig,
    });

    const response = result.response;
    return response.text().trim();

  } catch (error) {
    console.error("Error generating wish:", error);
    // Your fallback message is great for error handling!
    return "Wishing you a Diwali that's as bright and beautiful as you are. May the festival of lights bring endless joy to your life.";
  }
};
