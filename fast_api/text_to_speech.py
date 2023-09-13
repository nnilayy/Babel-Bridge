from bark import SAMPLE_RATE, generate_audio, preload_models
from scipy.io.wavfile import write as write_wav
from IPython.display import Audio

def text_to_speech(text):
    # preload_models()
    audio_array = generate_audio(text)
    write_wav("tts.wav", SAMPLE_RATE, audio_array)
    Audio(audio_array, rate=SAMPLE_RATE)