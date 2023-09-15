import os
import numpy as np
from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from pydantic import BaseModel
from pydub import AudioSegment
from translator import translate
from hindi import audio_2_text_hindi
from telugu import audio_2_text_telugu
from marathi import audio_2_text_marathi
from punjabi import audio_2_text_punjabi
from audio_preprocessing import audio_preprocessing


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/text/") 
def root():
    return {"message": "Hello World"}

class TextInput(BaseModel):
    NativeLanguage: str
    DesiredLanguage: str
    textInput: str


@app.post("/text/")
def text_data(input_data: TextInput):
    native_language = input_data.NativeLanguage
    desired_language = input_data.DesiredLanguage
    text_input = input_data.textInput
    translated_text = translate(native_language,desired_language,text_input)

    # return FileResponse("tts.wav", media_type="audio/wav")
    return translated_text

@app.post("/audio/")
async def create_upload_file(NativeLanguage: str = Form(...), DesiredLanguage: str = Form(...),audio: UploadFile = File(...)):
    native_language = NativeLanguage
    desired_language = DesiredLanguage
    audio_file = audio
    audio_file_name=audio_file.filename
    
    with open(audio_file_name, 'wb') as f:
        f.write(audio_file.file.read())

    # Audio Preprocessing
    audio_preprocessing(audio_file_name)

    if native_language=="hi":
        translated_text = audio_2_text_hindi("audio.wav")
    elif native_language=="pa":
        translated_text = audio_2_text_punjabi("audio.wav")
    elif native_language=="mr":
        translated_text = audio_2_text_marathi("audio.wav")
    # elif native_language=="ur":
    #     translated_text = audio_2_text_hindi("audio.wav")
    elif native_language=="te":
        translated_text = audio_2_text_telugu("audio.wav")

    translated_text = translate(native_language,desired_language,translated_text)
    return translated_text