import os
from typing import Annotated, Union

import certifi
import pymongo
from fastapi import APIRouter, Form, HTTPException, Header
from langchain.chains import RetrievalQA
from langchain.chat_models import ChatOpenAI
from langchain.prompts import PromptTemplate
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import MongoDBAtlasVectorSearch


from settings.config import Config

openai_llm_chat = Config.get_openai_chat_connection
router = APIRouter()

model_name = "gpt-3.5-turbo"
llm = ChatOpenAI(model_name=model_name)

client = pymongo.MongoClient(os.environ.get('MONGO_URI'), ssl=True, tlsCAFile=certifi.where())
db = client["KNN"]
collection = db["embeddings"]

def read_from_embeddings(email: str, query: str) -> str:
    try:
        embeddings = OpenAIEmbeddings()
        vectorstore = MongoDBAtlasVectorSearch(collection, embeddings)

        qa_retriever = vectorstore.as_retriever(
            search_type="similarity",
            search_kwargs={"k": 100, "post_filter_pipeline": [{"$limit": 25}]},
        )

        prompt_template = """Use the following pieces of context to answer the question at the end. If you don't know the answer,do not return anything, don't try to make up an answer.

        {context}

        Question: {question}
        """
        PROMPT = PromptTemplate(
            template=prompt_template, input_variables=["context", "question"]
        )

        qa = RetrievalQA.from_chain_type(
            llm=llm,
            chain_type="stuff",
            retriever=qa_retriever,
            return_source_documents=True,
            chain_type_kwargs={"prompt": PROMPT},
        )

        docs = qa({"query": "gpt-4 compute requirements"})
        return docs["result"]





    except Exception as e:
        raise HTTPException(status_code=404, detail=f"Error in reading from chroma db --> {e}")


def read_from_mongo(email: str) -> str:
    try:
        client = pymongo.MongoClient(os.environ.get('MONGO_URI'), ssl=True, tlsCAFile=certifi.where())
        db = client["mindful_ai"]
        collection = db["user_health_data"]
        data = collection.find_one({"email_id": email})
        return data
    except Exception as e:
        raise HTTPException(status_code=404, detail=f"Error in reading from mongo db --> {e}")


@router.post("/chat", tags=["ai"])
async def chat(email_id: Annotated[Union[str, None], Header()], message: str = Form(...), history: list = Form(...)):
    """
    Chat with the AI to know about personality
    :header: user_email
    :param: message
    :param: history
    :return: message, reply
    """

    if history is None:
        history = []

    if "STOP" in message or "Stop" in message or "stop" in message:
        return {"response": "STOPPING CHAT ", "history": history, "stop": True}

    inference = read_from_embeddings(email_id, message)

    template = """
    CONTEXT: You are an AI Insurance Agent, and you are chatting with a customer who wants to know more 
    about their insurance coverage. A user with name {name} will be chatting with you 
    to know more about their insurance, and may ask related questions. Politely answer them. Here is the history of 
    chat {history}, now the customer is saying {message}. In case there is no history of chat, just respond to the 
    customer's current message. 
    
    DATA FROM DOCUMENTS: {inference} is the data relevant to message Query fetched from Insurance Documents uploaded by the user,  Your answers should be based on it. 
    
    ANSWER: Keep Answers short and simple, preferable in bullets.
     
    RESPONSE CONSTRAINT: DO NOT OUTPUT HISTORY OF CHAT, JUST OUTPUT RESPONSE TO THE CUSTOMER IN BULLET POINTS.
    """

    prompt = PromptTemplate.from_template(template)
    chain = prompt | openai_llm_chat

    response = chain.invoke(
        {"inference": inference, "message": message, "history": history, "name": email_id[0:email_id.index('@')]})

    if "STOP" in response or "Stop" in response or "stop" in response or "STOPPING CHAT" in response or "Stopping Chat" in response or "stopping chat" in response:
        return {"response": response, "history": history, "stop": True}
    else:
        history.append({"message": message, "response": response})
        return {"response": response, "history": history, "stop": False}
