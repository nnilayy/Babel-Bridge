import soundfile as sf
import torchaudio
import torch
from transformers import Wav2Vec2ForCTC, Wav2Vec2Processor
import argparse

def audio_2_text_marathi(wav_file_path):
    # Load pretrained model
    processor = Wav2Vec2Processor.from_pretrained("sumedh/wav2vec2-large-xlsr-marathi") 
    model = Wav2Vec2ForCTC.from_pretrained("sumedh/wav2vec2-large-xlsr-marathi") 

    # Load audio and resample to 16,000Hz
    audio_input, original_sample_rate = sf.read(wav_file_path)
    resampler = torchaudio.transforms.Resample(original_sample_rate, 16000)
    audio_input = resampler(torch.tensor(audio_input)).numpy()

    # Set the segment duration (e.g., 2 seconds)
    segment_duration = 2  # Adjust as needed

    # Calculate the number of segments
    num_samples = len(audio_input)
    num_samples_per_segment = int(segment_duration * 16000)
    num_segments = num_samples // num_samples_per_segment

    # Transcribe each segment
    transcriptions = []

    for i in range(num_segments):
        start_sample = i * num_samples_per_segment
        end_sample = (i + 1) * num_samples_per_segment

        # Extract the segment
        segment = audio_input[start_sample:end_sample]

        # Pad input values and return pt tensor
        input_values = processor(segment, sampling_rate=16000, return_tensors="pt").input_values

        # INFERENCE
        # Retrieve logits & take argmax
        logits = model(input_values).logits
        predicted_ids = torch.argmax(logits, dim=-1)

        # Transcribe the segment
        transcription = processor.decode(predicted_ids[0], skip_special_tokens=True)
        transcriptions.append(transcription)

    # Combine the transcriptions from all segments
    final_transcription = " ".join(transcriptions)
    return final_transcription