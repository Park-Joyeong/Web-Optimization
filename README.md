## 프로젝트 실행방법
1. 프로젝트를 내려 받는다.
2. 루트폴더 `npm i`
3. client 폴더로 이동 `npm i`
4. 자신의 PC에 ffmpeg라는 프로그램을 설치한다.(윈도우즈 컴퓨터는 환경변수에 경로추가)(ffmpeg는 동영상파일이 주어졌을때 동영상 파일을 추출해 썸네일 사진을 만들어주는 프로그램임. 비디오 업로드 할때 쓸것임.)
5. 루트폴더에 uploads 폴더를 추가 한다.
6. server 폴더에 config.js를 만든다. 내용: `module.exports = { mongoURI: '여기에 내 몽고DB 주소' }` (몽고DB홈피 SECURITY>Network Access 에서 내 아이피 열어줄것.)
7. `REACT_APP_WITCH_SERVER=local npm start` (로컬기동이 아닐시 `NODE_ENV=production REACT_APP_WITCH_SERVER=dev npm start`)


## BeforePorject
- 기간: ~2022.1.8
- 배포까지 완료하기
- 웹 성능 측정


## OptimizingProject
- 기간: 2022.1.9 ~ 2022.1.22
- 배포까지 완료하기(새로운 WebSite로)
- 웹 성능 최적화 일지 작성(일주일 1개 작성)
- 책 내용 3가지 이상 적용


### Project 경험 공유
- 2022.02.05 오후 8시
- Before Project와 비교했을 때 개선된 정도, 계획달성 정도 등 5분 내외의 발표
