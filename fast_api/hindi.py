import soundfile as sf
import torchaudio
import torch
from transformers import Wav2Vec2ForCTC, Wav2Vec2Processor
import argparse

def audio_2_text_hindi(wav_file_path):
    processor = Wav2Vec2Processor.from_pretrained("Harveenchadha/vakyansh-wav2vec2-hindi-him-4200")
    model = Wav2Vec2ForCTC.from_pretrained("Harveenchadha/vakyansh-wav2vec2-hindi-him-4200")

    audio_input, original_sample_rate = sf.read(wav_file_path)
    resampler = torchaudio.transforms.Resample(original_sample_rate, 16000)
    audio_input = resampler(torch.tensor(audio_input)).numpy()

    segment_duration = 2

    num_samples = len(audio_input)
    num_samples_per_segment = int(segment_duration * 16000)
    num_segments = num_samples // num_samples_per_segment

    transcriptions = []

    for i in range(num_segments):
        start_sample = i * num_samples_per_segment
        end_sample = (i + 1) * num_samples_per_segment
        segment = audio_input[start_sample:end_sample]
        input_values = processor(segment, sampling_rate=16000, return_tensors="pt").input_values
        logits = model(input_values).logits
        predicted_ids = torch.argmax(logits, dim=-1)
        transcription = processor.decode(predicted_ids[0], skip_special_tokens=True)
        transcriptions.append(transcription)

    final_transcription = " ".join(transcriptions)
    return final_transcription