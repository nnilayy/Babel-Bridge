from deep_translator import GoogleTranslator
def translate(source_lanuage, target_language, text):
  translated_text = GoogleTranslator(source=source_lanuage, target=target_language).translate(text)
  return translated_text