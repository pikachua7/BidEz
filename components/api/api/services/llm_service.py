from langchain.memory import ChatMessageHistory
from langchain_core.messages import HumanMessage
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder

from api.llm import llm

promptTemplate: ChatPromptTemplate = ChatPromptTemplate.from_messages(
    [
        MessagesPlaceholder(variable_name="messages"),
    ]
)

chain = promptTemplate | llm

demo_ephemeral_chat_history = ChatMessageHistory()


def invoke_llm_with_initial_history(prompt):
    messages = demo_ephemeral_chat_history.messages[:4]
    messages.append(HumanMessage(content=prompt))
    response = chain.invoke(
        {
            "messages": messages,
        }
    )
    return response.content


def invoke_llm(prompt):
    if demo_ephemeral_chat_history.messages:
        last_message = demo_ephemeral_chat_history.messages[-1]
        if isinstance(last_message, HumanMessage):
            raise ValueError("Last message in history is not a HumanMessage")

    demo_ephemeral_chat_history.add_user_message(prompt)
    response = chain.invoke(
        {
            "messages": demo_ephemeral_chat_history.messages,
        }
    )
    demo_ephemeral_chat_history.add_ai_message(response)
    return response.content
