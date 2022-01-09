# 📑 성능 분석 Before Project

📌 `홈페이지 주소`        
http://54.180.2.148:3000  
💻 `github 주소`  
https://github.com/Park-Joyeong/Web-Optimization

<br />

## 1. 성능 분석표
#### 1) WebPageTest 결과
>  한줄 요약  
  Security score 낙제, Cache static content 낙제.
1. 
- 환경 세팅  
  서울, 크롬
- 캡처 사진  
  ![](/readme_images/before/web_page_test/seoul_chrome.JPG)
2. 
- 환경 세팅  
  캘리포니아, 크롬
- 캡처 사진  
  ![](/readme_images/before/web_page_test/california_chrome.JPG)

3. 
- 환경 세팅  
  서울, 갤럭시S5
- 캡처 사진  
  ![](/readme_images/before/web_page_test/seoul_galaxy.JPG)

4. 
- 환경 세팅  
  캘리포니아, 아이폰5C
- 캡처 사진  
  ![](/readme_images/before/web_page_test/california_iPhone.JPG)


##### 2) PageSpeed 결과
> 한줄 요약  
  모바일15점, 데스크탑33점(100점 만점)
- 캡처 사진  
  ![](/readme_images/before/page_speed/mobile.JPG)
  ![](/readme_images/before/page_speed/desktop.JPG)

##### 3) 기타(크롬 개발자 도구 등) -> 자유 작성
> 한줄 요약  
  콘솔창 주의사항이 많이 뜸.  
- 발견된 취약점  
  불필요 소스코드가 많음.  
  ![](/readme_images/before/dev_tools/warning_log.JPG)


<br />

## 2. 개선 계획(최소 2개 이상 작성)
##### 1) 취약점: 이미지 로딩이 오래걸림.
  - 환경: PageSpeed(Mobile,Desktop)
  - 개선 계획:   
    1.이미지 확장자를 png에서 next generation인 WebP 또는 AVIF로 바꾸겠다.  
    2. 지연 로딩을 통하여 보이지 않는 화면은 나중에 렌더링 시키겠다.

##### 2) 취약점: 캐시 사용을 하지않음
  - 환경: WebPageTest(전지역,전기기 공통)
  - 개선 계획: 캐시 사용을 도입하여 더 빠르게 화면을 렌더링 시키겠다.

##### 3) 취약점: 소스코드 경량화
- 환경:개발자 도구
- 개선 계획: 불필요한, 사용하지 않는 소스코드를 제거하여 가볍게 만든다.