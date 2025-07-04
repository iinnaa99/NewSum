import requests
import urllib.parse
from bs4 import BeautifulSoup
import openpyxl
import re

# 🔧 네이버 API 인증 정보
client_id = 'xwzSkWzFRiKC95QRT3ef'
client_secret = '09fiBTkwUc'

# 🔍 검색어 설정 및 URL 인코딩
query = 'AI 뉴스'
enc_query = urllib.parse.quote(query)
url = f"https://openapi.naver.com/v1/search/news.json?query={enc_query}&display=10&start=1&sort=date"

# 📡 요청 헤더
headers = {
    "X-Naver-Client-Id": client_id,
    "X-Naver-Client-Secret": client_secret
}

# 📚 SID → 카테고리 매핑
sid_map = {
    '100': '정치',
    '101': '경제',
    '102': '사회',
    '103': '생활/문화',
    '104': '세계',
    '105': 'IT/과학'
}

# 📰 뉴스 본문 및 이미지 크롤링 함수 (본문 + 대표 이미지 주소 추출)
def get_news_content_and_image(link):
    headers = {
        'User-Agent': 'Mozilla/5.0'
    }
    try:
        res = requests.get(link, headers=headers, timeout=5)
        if res.status_code != 200:
            return f"[{res.status_code}] 접근 실패", ""

        soup = BeautifulSoup(res.text, 'html.parser')

        # 본문 추출
        article = soup.select_one('#dic_area') or soup.select_one('.newsct_article')
        text = article.get_text(strip=True) if article else "[본문 없음]"

        # 대표 이미지 추출: 1. 본문 내 이미지 → 2. og:image 메타태그
        image_url = ""
        if article:
            img_tag = article.find('img')
            if img_tag and img_tag.get('src'):
                image_url = img_tag['src']

        if not image_url:
            og_img = soup.find("meta", property="og:image")
            if og_img and og_img.get("content"):
                image_url = og_img["content"]

        return text, image_url
    except Exception as e:
        return f"[에러] {e}", ""

# 🏷️ SID 추출 함수
def extract_sid(link):
    match = re.search(r'[?&]sid=([0-9]{3})', link)
    if match:
        sid = match.group(1)
        return sid_map.get(sid, f"SID:{sid}")
    else:
        return "SID 없음"

# 📘 엑셀 워크북 생성
wb = openpyxl.Workbook()
ws = wb.active
ws.title = "뉴스 목록"
ws.append(['번호', '제목', '링크', '카테고리', '본문', '이미지 링크'])

# 🚀 API 요청
response = requests.get(url, headers=headers)

# 📦 결과 처리
if response.status_code == 200:
    news_items = response.json()['items']
    count = 1
    for item in news_items:
        title = item['title']
        link = item['link']

 
        body, image_url = get_news_content_and_image(link)
        category = extract_sid(link)

        print(f"\n[{count}] 제목: {title}")
        print(f"     링크: {link}")
        print(f"     카테고리: {category}")
        print(f"     이미지: {image_url}")
        print("     📄 본문:")
        print(body)
        print("-" * 80)

        # 엑셀 저장
        ws.append([count, title, link, category, body, image_url])
        count += 1
else:
    print(f"❌ 에러 발생: {response.status_code} - {response.text}")

# 💾 엑셀 저장
wb.save("news_with_image.xlsx")
print("\n✅ 엑셀 저장 완료: news_with_image.xlsx")
