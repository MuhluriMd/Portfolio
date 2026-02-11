# Word counting program
text = input("Enter a sentence: ")

clean_text = ""
for char in text:
    if char.isalnum() or char.isspace():
        clean_text += char

clean_text = clean_text.lower()
words = clean_text.split()

total_words = len(words)
word_count = {}
for word in words:
    if word in word_count:
        word_count[word] += 1
    else:
        word_count[word] = 1

print("Clean text:", clean_text)
print("Total words:", total_words)
print("Word occurrences:")
for word, count in word_count.items():
    print(f"{word}: {count}")
 