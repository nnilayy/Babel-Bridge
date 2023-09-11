from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from pydub import AudioSegment
from io import BytesIO
from scipy.io import wavfile
import numpy as np
import librosa
import os
from translator import translate
from hindi import audio_2_text_hindi
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
        translated_text = audio_2_text_punjabi(audio_file_name)
    elif native_language=="mr":
        translated_text = audio_2_text_marathi(audio_file_name)
    elif native_language=="ur":
        translated_text = audio_2_text_urdu(audio_file_name)
    elif native_language=="te":
        translated_text = audio_2_text_telugu(audio_file_name)

    translated_text = translate(native_language,desired_language,translated_text)
    return translated_text

# @app.post("/recordaudio/")
# async def record_audio_file(NativeLanguage: str = Form(...), DesiredLanguage: str = Form(...), audio: UploadFile = File(...)):
#     native_language = NativeLanguage
#     desired_language = DesiredLanguage
#     audio_file = audio
#     audio_file_name=audio_file.filename

#     with open(audio_file_name, 'wb') as f:
#         f.write(audio_file.file.read())

#     audio_preprocessing(audio_file_name)
#     return os.getcwd()
