from langchain_google_genai import (
    ChatGoogleGenerativeAI,
    GoogleGenerativeAI,
    HarmBlockThreshold,
    HarmCategory,
)

from api.settings import settings

safety_settings = {
    HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT: HarmBlockThreshold.BLOCK_NONE,
}

# TODO: add postgres LLM chat history
# ref: https://api.python.langchain.com/en/latest/chat_message_histories/langchain_community.chat_message_histories.postgres.PostgresChatMessageHistory.html

llm = ChatGoogleGenerativeAI(
    model="gemini-pro",
    google_api_key=settings.google_api_key,
    safety_settings=safety_settings,
    temperature=0,
)

# llm = GoogleGenerativeAI(
#     model="gemini-pro",
#     google_api_key=settings.google_api_key,
#     safety_settings=safety_settings,
# )
