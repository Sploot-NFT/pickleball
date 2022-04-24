# This program generates an index file for all the characters. It contains a list (in ID order) of each character.
# Each character has a name, and their attributes/traits, but not DNA.
# This file is then served to the client for filtering/sorting purposes.

import json

# Config
num_chars = 10000
characters_dir = "static/characters/"
output_file = "static/character_index.json"

characters = []

for i in range(num_chars):
    with open(f"{characters_dir}{i}.json") as f:
        character_json = json.load(f)

    character = {"name": character_json["name"], "id": i}
    for trait in character_json["attributes"]:
        character[trait["trait_type"].lower()] = trait["value"]

    dna_list = character_json["dna"]

    avgs = {}

    avgs['body'] = int(round((dna_list[0]['code'] % 1 + dna_list[1]
                       ['code'] % 1 + dna_list[2]['code'] % 1)/3, 2) * 100)
    avgs['soul'] = int(round((dna_list[3]['code'] % 1 + dna_list[4]
                       ['code'] % 1 + dna_list[5]['code'] % 1)/3, 2) * 100)
    avgs['mind'] = int(round((dna_list[6]['code'] % 1 + dna_list[7]
                       ['code'] % 1 + dna_list[8]['code'] % 1)/3, 2) * 100)
    avgs['ovr'] = int(round((avgs['body'] + avgs['soul'] + avgs['mind'])/3, 2))

    character = {**character, **avgs}

    characters.append(character)

with open(output_file, "w+") as f:
    json.dump(characters, f)
