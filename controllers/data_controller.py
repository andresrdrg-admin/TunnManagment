import json
import os
import sys

app_dir = os.path.dirname(sys.executable)

class DataController():
    def __init__(self) -> None:
        jsonpath = os.path.join(app_dir, "data.json")
        
        with open(jsonpath, "r") as archivo:
            data = json.load(archivo)
            
        self.data = data