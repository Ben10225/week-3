import urllib.request as req
import ssl
import bs4

url = "https://www.ptt.cc/bbs/movie/index.html"

request = req.Request(url ,headers = {
  "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36"
})

context = ssl._create_unverified_context()

with req.urlopen(request, context=context) as res:
  data = res.read().decode("utf-8")
# print(data)

html = bs4.BeautifulSoup(data, "html.parser")

pageIndex = html.find("div", class_="btn-group btn-group-paging").find_all("a")
pageIndex = int((str(pageIndex[1]).split("index")[1][:4]))

ct = 0
lst =[]
goods = 0
normal = 0

for i in range(pageIndex+1, pageIndex-9, -1):
  ct += 1
  # print("第"+ str(ct) +"頁")
  if ct > 1:
    url = "https://www.ptt.cc/bbs/movie/index{}.html".format(i) 
  request = req.Request(url ,headers = {
    "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36"
  })
  with req.urlopen(request, context=context) as res:
    data = res.read().decode("utf-8")
  html = bs4.BeautifulSoup(data, "html.parser")
  titles = html.find_all("div", class_="title")
  for i in titles:

    evaluation = i.a.string.split("]")[0].replace(" ", "")
    if len(evaluation) == 3:
      evaluation = evaluation[1:]
      if evaluation == "好雷":
        lst.insert(goods,i.a.string.split("]")[0].replace(" ", "")+"] "+i.a.string.split("]")[1].strip())
        goods += 1
      elif evaluation == "普雷":
        lst.insert(goods+normal,i.a.string.split("]")[0].replace(" ", "")+"] "+i.a.string.split("]")[1].strip())
        normal += 1
      elif evaluation == "負雷":
        lst.append(i.a.string.split("]")[0].replace(" ", "")+"] "+i.a.string.split("]")[1].strip())


with open("movie.txt", mode="w", encoding="utf8") as file:
  for i in lst:
    file.write(i+"\n")

print("檔案建立完成！")


