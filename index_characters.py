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

    characters.append(character)

with open(output_file, "w+") as f:
    json.dump(characters, f)
