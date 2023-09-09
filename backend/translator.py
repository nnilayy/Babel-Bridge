import googletrans
def translate(text, language):
  translator = googletrans.Translator()
  translation = translator.translate(text, dest=language)
  return translation