def zad4():
    with open('sygnaly.txt', 'r') as f:
        lines = f.readlines()

    result_4_1 = ""
    for i in range(39, len(lines), 40):
        result_4_1 += lines[i][9]

    print("4.1")
    print(result_4_1)

    result_4_2_word = ""
    result_4_2_count = 0
    for line in lines:
        word = line.strip()
        unique_letters = len(set(word))
        if unique_letters > result_4_2_count:
            result_4_2_word = word
            result_4_2_count = unique_letters

    print("4.2")
    print(result_4_2_word, result_4_2_count)

    print("4.3")
    for line in lines:
        word = line.strip()
        is_valid = True
        for i in range(len(word)):
            for j in range(i+1, len(word)):
                if abs(ord(word[i]) - ord(word[j])) > 10:
                    is_valid = False
                    break
            if not is_valid:
                break
        if is_valid:
            print(word)

zad4()