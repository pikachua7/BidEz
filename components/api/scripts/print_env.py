from api.settings import settings

print("------------------------- API SETTINGS -------------------------")
print(settings.model_dump_json(indent=2))
print("----------------------- END API SETTINGS -----------------------")
