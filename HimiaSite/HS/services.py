

def number_to_words(amount):
    ones = [
        "нуль", "одна", "дві", "три", "чотири",
        "п'ять", "шість", "сім", "вісім", "дев'ять"
    ]
    teens = [
        "десять", "одинадцять", "дванадцять", "тринадцять", "чотирнадцять",
        "п'ятнадцять", "шістнадцять", "сімнадцять", "вісімнадцять", "дев'ятнадцять"
    ]
    tens = ["", "", "двадцять", "тридцять", "сорок", "п'ятдесят", "шістдесят", "сімдесят", "вісімдесят", "дев'яносто"]
    hundreds = ["", "сто", "двісті", "триста", "чотириста", "п'ятсот", "шістсот", "сімсот", "вісімсот", "дев'ятсот"]

    if amount == 0:
        return "нуль гривень, нуль копійок"

    words = []

    dollars, cents = str(amount).split('.')
    dollars = int(dollars)
    cents = int(cents) if len(str(cents)) == 2 else int(cents) * 10

    if dollars:
        if dollars // 100:
            words.append(hundreds[dollars // 100])
            dollars %= 100
        if dollars // 10:
            if dollars // 10 == 1:
                words.append(teens[dollars % 10])
                dollars = 0
            else:
                words.append(tens[dollars // 10])
                dollars %= 10
        if dollars:
            words.append(ones[dollars])

        if dollars % 10 == 1 and dollars != 11:
            words.append("гривня")
        elif 2 <= dollars % 10 <= 4 and (dollars < 10 or dollars > 20):
            words.append("гривні")
        else:
            words.append("гривень")

    if cents:
        if cents // 10:
            words.append(tens[cents // 10])
            cents %= 10
        if cents:
            words.append(ones[cents])

        if cents % 10 == 1 and cents != 11:
            words.append("копійка")
        elif 2 <= cents % 10 <= 4 and (cents < 10 or cents > 20):
            words.append("копійки")
        else:
            words.append("копійок")

    return ' '.join(words).capitalize()