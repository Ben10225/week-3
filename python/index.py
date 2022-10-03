import urllib.request as req
import json
import ssl
import csv

url = "https://padax.github.io/taipei-day-trip-resources/taipei-attractions-assignment.json"
request = req.Request(url ,headers = {
  "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36"
})

context = ssl._create_unverified_context()
dataAfter15 = []

with req.urlopen(request, context=context) as res:
  data = json.load(res)["result"]["results"]
  for i in data:
    if int(i["xpostDate"].split("/")[0]) >= 2015:
      dataAfter15.append(i)
  # print(dataAfter15[0])
  # for i in dataAfter15:
    # print(i["stitle"], i["address"].split("  ")[1][:3], i["xpostDate"], i["longitude"], i["latitude"], "https{}".format(i["file"][5:].split("https")[0]))

file = open("data.csv", mode="w", newline="")
writer = csv.writer(file)

for i in dataAfter15:
  writer.writerow([i["stitle"], i["address"].split("  ")[1][:3], i["longitude"], i["latitude"], "https{}".format(i["file"][5:].split("https")[0])])

file.close()
print("寫入完成！")
