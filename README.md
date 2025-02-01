# 🎥 인턴하샤 🎥

- 🧇[**인턴하샤**](https://www.survey-josha.site/) 는 1조의 기획 프로젝트입니다!
- 인턴하샤는 스타트업과, 스타트업 인턴십을 구하는 학생들을 매칭시켜주는 역할을 합니다.
- 많이 부족하지만 열과 성을 다해 제작한 저희 인턴하샤 서비스를 만족스럽게 사용하실 수 있기를 바랍니다🙏🙏

- 개발 기간 : TODO

- 본 레포는 **TEAM1-WEB REPO** 이므로 FRONTEND 개발에 관한 내용을 위주로 설명합니다.

- BACKEND 개발에 관해 궁금하시다면? [TEAM1-SERVER REPO](https://github.com/wafflestudio22-5/team1-server)
  <br/><br/>

## 🏷️ 목차

#### 0. [기획 📈](#📈-기획)

#### 1. [배포 💻](#💻-배포)

#### 2. [개발팀 & 역할 분담 🙋‍♂️](#🙋‍♂️-개발팀--역할-분담)

#### 3. [Stacks 🔧](#🔧-stacks)

#### 4. [주요 PAGE & MODAL 소개📃](#📃-주요-page--modal-소개)

#### 5. [모바일 반응형 📱](#📱-모바일-반응형)

#### 6. [특별 기능 🎨](#🎨-특별-기능)

## 📈 기획

### 니즈 확인

- https://eng.snu.ac.kr/snu/bbs/BMSR00004/view.do?boardId=1875&menuNo=200176
- https://slashpage.com/match-snucba?lang=ko
- SNAAC에서도 자체적으로 진행 결과 있음

니즈가 존재하는 부분. 이에 따라 우리가 기능을 확실하게 구현해 그 니즈에서의 주된 플레이어가 되는 것을 목표.

### 페인 포인트

- 스타트업: 우리가 좋은 초기 스타트업인데, 직원 구하기가 어렵다
    - 분산된 창구(경력개발원, 단톡방, 에타)
    - 인맥과 수고가 필요
- 구직자: 인턴하고 싶은데 좋은 스타트업 찾기가 어렵다
    - 일단 기본적으로 좋은 스타트업이 많지 않음
    - 스타트업 구직 창구가 분산되어 있어 비교도 쉽지 않음
    - 좋은 정보에 대한 접근도 많은 수고가 들며, 내부 정보(IR 자료 등) 등은 아예 확인 불가

### 기획 의도

- 분산된 창구를 모은다
    - 스타트업의 수고를 줄이며, 구직자에게도 정보를 한눈에 모아볼 수 있게
- 좋은 스타트업을 고른다
    - SNAAC, SNUSV, VC, 교내 경력개발원 등 단체와의 협업을 통해, 그들이 한정된 수의 추천 티켓을 가지고 믿을만한 스타트업을 추천하도록 한다.
- 좋은 정보를 제공한다
    - IR 자료는 투자심의 때의 자료로, 스타트업의 방향성, 내부 정보등 가치 있는 정보들을 담고 있음
    - 온라인에 그냥 올려두면 최신이 아닌 자료가 올라가 있을 수 있다는 문제 때문에, 공개적이지 않음
    - 폐쇄형 커뮤니티에는 걱정 없이 업로드 가능할 것 같다는 것이 현재 SNAAC과의 컨택에서 얻은 답변
    - 추가적인 정보에 대해서는 논의 필요.
- 최대한 구직자 친화적으로 제공한다
    - 어차피 구직자의 수가 많고, 질 높은 사람들을 모을 수 있다면 좋은 스타트업들은 알아서 들어온다
    - 구직 기능을 제외하더라도 학생 트래픽을 최대한 높일 수 있는 기능이라면 도입이 필요하다

### 확장 가능성

- 커뮤니티 / 아티클  기능 추가
    - 아티클 기능의 예시
        - [https://eopla.net](https://eopla.net/)
        - https://www.tokyodev.com/articles
        - 아티클 기능에서는 eo플래닛이 강점이 있어, 차별화 포인트를 모색해보아야 할듯
            - 대표의 모교를 다니는 학생에게만 글이 보인다든가?
    - 학생 트래픽을 통한 선순환을 목표로 함
- SKP/KY/SSH까지 확대
    - 충분한 트래픽을 얻어내는 것과, 구직자풀 QC의 균형
        - 학벌을 통한 QC가 근원적인 해결책이라고는 생각하지 않음. 유저의 니즈 조사 통한 방안 확인해야 할 것.
    - 다만 학벌을 통한 일차적인 스크리닝을 통해, 희소성 효과를 만들어낼 수 있음
        - 희소성 효과: 아무나 얻는 기회가 아니니 좋을 것이다
- 디스코드 서버/단톡방 등 유저에게 노출될 창구 늘리기
    - 구직자를 모으는 것이 서비스의 성패를 결정함
- 이외 유저가 바라는 것이라면 무엇이든

## 💻 배포

프론트엔드 서버 도메인(Web server) : <https://www.survey-josha.site/>

백엔드 서버 도메인(Api server) : <https://api.survey-josha.site/>

웹서버의 경우 AWS S3 + CLOUDFRONT를 이용하여 배포하였습니다. TODO 이거 맞나요?
<br/><br/>

## 🙋‍♂️ 개발팀 & 역할 분담 // TODO

|                                                                                             |                                                                                    |
| :-----------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------: |
|                                           김연우                                            |                                       최장혁                                       |
|                     [@ohsuhyeon0119](https://github.com/ohsuhyeon0119)                      |                    [@ComPhyPark](https://github.com/ComPhyPark)                    |
| 팀장 역할 수행 및 일정 관리, 유저 페이지 및 유저 하위 페이지 디자인&기능 / 인증 서비스 구현 | 랜딩 페이지와 레이아웃의 디자인 & 기능 구현, 웹서비스의 전체적인 버그 관리 및 수정 |
</div>

## 🔧 Stacks // TODO

#### 기술 스택

<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white"> &nbsp; &nbsp; &nbsp; <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"> &nbsp; &nbsp; &nbsp;
<img src="https://img.shields.io/badge/cssmodules-000000?style=for-the-badge&logo=cssmodules&logoColor=white"> &nbsp; &nbsp; &nbsp;
<img src="https://img.shields.io/badge/SCSS-CC6699?style=for-the-badge&logo=sass&logoColor=white">
<br/><br/>

#### 협업

<img src="https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=Slack&logoColor=white"> &nbsp; &nbsp; &nbsp;
<img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=Notion&logoColor=white"> &nbsp; &nbsp; &nbsp;
<img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=Figma&logoColor=white">
<br/><br/>

## 📃 주요 PAGE & MODAL 소개

|                                                                                               |                                                                                               |
| :-------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------: |
| ![placeholder](https://via.placeholder.com/150)                                               | ![placeholder](https://via.placeholder.com/150)                                               |
| **로그인**                                                                                    | **로컬 회원가입-1**                                                                           |
| 로컬, 소셜 로그인이 가능해요                                                                   | 이름, 아이디, 비밀번호를 유효성 검증을 거쳐 받아요                                            |
| ![placeholder](https://via.placeholder.com/150)                                               | ![placeholder](https://via.placeholder.com/150)                                               |
| **로컬 회원가입-2**                                                                            | **소셜 회원가입**                                                                             |
| 서울대 메일에 대한 인증을 거쳐요                                                              | 소셜 계정이 서울대 메일이 아닐 경우 추가적인 이메일 인증을 거쳐요. 이미 가입된 로컬 계정이 있다면 그 계정으로 소셜 계정을 합쳐요.  |
| ![placeholder](https://via.placeholder.com/150)                                               | ![placeholder](https://via.placeholder.com/150)                                               |
| **공고 페이지**                                                                                | **마이페이지-신청한커피챗**                                                                    |
| 모집 여부, 스타트업의 투자 단계, 투자 금액, 직군을 바탕으로 공고들을 필터링해 보여줘요          | 내가 신청한 커피챗을 모아 보여줘요                                                             |
| ![placeholder](https://via.placeholder.com/150)                                               | ![placeholder](https://via.placeholder.com/150)                                               |
| **마이페이지-신청한커피챗-상세내역**                                                           | **마이페이지-관심공고**                                                                       |
| 내가 신청한 커피챗을 선택해 확인해요                                                           | 내가 북마크한 기업들을 확인해요                                                                |
| ![placeholder](https://via.placeholder.com/150)                                               | ![placeholder](https://via.placeholder.com/150)                                               |
| **공고 상세 페이지**                                                                           | **커피챗 신청서 작성**                                                                        |
| 기업을 선택해 확인해요                                                                         | 전화번호와 자기소개를 적어 커피챗을 신청하면 메일이 기업으로 발송돼요                          |
| ![placeholder](https://via.placeholder.com/150)                                               | ![placeholder](https://via.placeholder.com/150)                                               |
| **회사 정보 작성**                                                                             | **인턴 공고 작성**                                                                            |
| 회사 큐레이터가 회사의 정보를 작성하는 페이지에요                                              | 회사 큐레이터가 회사의 정보를 불러와 직군을 선택해 공고를 작성해요                             |

## 📱 모바일 반응형

와플피디아는 반응형 웹(Responsive Web)입니다. 여러 종류의 화면 크기에도 자연스럽게 서비스를 이용할 수 있습니다. 모바일 용 디자인이 왓챠피디아의 모바일 웹과 완전히 동일하지는 않습니다. 그러나 저희 프론트엔드 팀원들은 개발 과정에서 최대한 반응형을 고려하여 제작하였습니다. 와플피디아의 주요 반응형 페이지들을 모아 봤습니다.
||||
|:-----:|:-----:|:----:|
|![image](https://github.com/wafflestudio21-5/team6-web/assets/141830897/1df1212c-c8be-4262-8fde-55f05faf2bd8)|![responsive_content](https://github.com/wafflestudio21-5/team6-web/assets/141830897/87114f59-204c-4184-b534-19933e6f07e5)|![responsive_comment](https://github.com/wafflestudio21-5/team6-web/assets/141830897/25c4eb1e-1be7-4231-916a-04485d211666)|
|메인|영화 개별|코멘트 개별|
|![responsive_user](https://github.com/wafflestudio21-5/team6-web/assets/141830897/11cc25e3-a1bd-438c-9e29-71ccfc06beb2)|![responsive_storage](https://github.com/wafflestudio21-5/team6-web/assets/141830897/9487b0a8-3b4f-4502-a324-9c65017d4de2)|![responsive_login](https://github.com/wafflestudio21-5/team6-web/assets/141830897/52193973-0683-4a20-8565-0429595f22d9)|
|유저|보관함|로그인 모달|

<br></br>

## 🚀 기능 정리

- 🎥 다양한 기준으로 **영화 캐러셀** 제공 : 일일 박스 오피스 순위와 최신 영화, 그리고 TEAM6 팀원이 직접 선정한 Team6's pick 캐러셀이 있습니다. 메인 페이지에 한해 **스켈레톤 UI**가 구현되어 있습니다!

- 👑 동적 타이틀 변경 : 각 페이지로 이동할때마다 페이지의 맥락에 맞게 웹페이지 타이틀을 수정하는 기능을 구현하였습니다. 커스텀 훅을 만들었습니다.

- 📊 **영화 별 정보** 제공 : 기본정보, 줄거리, 포스터, 출연진 등
- ⭐ **별점 매기기(Rating) 및 코멘트** 작성
- ✅ 코멘트 작성 시 **스포일러 체크** 기능 : 체크 시에는 코멘트 목록과 코멘트 개별 페이지에서 "이 코멘트에는 스포일러가 포함되어 있습니다." 문구를 대신 보여줍니다.
- 📚 영화 별 **코멘트 목록** : 좋아요 / 최신 / 높은 별점 / 낮은 별점 순으로 정렬이 가능합니다. 와플피디아 내의 코멘트 목록은 모두 infinite-scroll로 구현하였습니다.
- 👍 개별 코멘트에 대한 **댓글 및 좋아요 반응** 기능 : 댓글 좋아요 기능도 있습니다!
- 🙋‍♂️ 유저별로 **다양한 하위 페이지** 기능 제공

  - 유저의 팔로잉, 팔로워 목록
  - 유저가 별점을 매긴 영화 목록
  - 유저가 작성한 코멘트 목록(infinite-scroll)
  - 유저의 영화 보관함

    - 보는 중 영화 목록
    - 보고싶어요 영화 목록

  - 유저가 좋아요한 코멘트 목록(로그인한 유저 자신의 계정 페이지에서만 확인 가능합니다.)

- 🧑 유저 Profile 편집 : 닉네임, 소개글, 대표 이미지와 배경 이미지 편집이 가능합니다.

- 🔎 영화 및 유저 **검색** : 헤더에서 직접 검색할 수 있고 모바일의 경우 검색 페이지로 이동하여 검색 가능합니다. 로컬 스토리지를 이용해 최근 검색어를 확인할 수 있습니다!

- 🤝 유저에 대한 **팔로잉 및 팔로워** 기능 : 로그인한 유저는 다른 유저를 팔로잉 할 수 있고, 팔로잉, 팔로워 목록은 유저페이지에서 확인할 수 있습니다.

- 🌐 소셜로그인 : 카카오톡 소셜로그인이 가능합니다.
  <br></br>

## 🎨 특별 기능

### 최근 구경한 영화 보관함

![page_main_hover](https://github.com/wafflestudio21-5/team6-web/assets/141830897/ce809183-50d5-433d-aa76-845818026ec9)
