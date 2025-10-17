import { GoogleGenAI } from "@google/genai";

export const generateWish = async (fromName: string, toName: string): Promise<string> => {
  try {
    if (!process.env.API_KEY) {
      throw new Error("API_KEY environment variable not set");
    }
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const prompt = `
      You are a festive AI that writes beautiful Diwali wishes.
      The wish is from "${fromName}" to "${toName}".
      
      Please generate a short, warm, and heartfelt Diwali wish (about 2-3 sentences).
      The wish should be celebratory and full of light and joy.
      
      IMPORTANT: Do not include any greetings like 'Dear ${toName},' or sign-offs like 'From ${fromName},'. These will be added automatically to the greeting card. Just provide the body of the wish.
      Example: "May the divine light of Diwali spread peace, prosperity, and happiness into your life. Wishing you and your family a sparkling festival of lights!"
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text.trim();
  } catch (error) {
    console.error("Error generating wish:", error);
    return "Wishing you a Diwali that's as bright and beautiful as you are. May the festival of lights bring endless joy to your life.";
  }
};