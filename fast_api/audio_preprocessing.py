import os
from pydub import AudioSegment

def audio_preprocessing(audio_path):
  audio = AudioSegment.from_file(audio_path)
  audio = audio.set_frame_rate(16000)
  os.remove(audio_path)
  audio.export(os.getcwd()+"/"+"audio.wav", format="wav")

